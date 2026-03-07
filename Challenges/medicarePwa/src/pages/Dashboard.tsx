import { useState, useEffect } from 'react';
import { PerfilUsuario } from '../components/auth/PerfilUsuario';
import { FormularioPaciente, procesarGuardadoPaciente } from '../components/pacientes/FormularioPaciente';
import type { Paciente } from '../components/pacientes/FormularioPaciente';
import { TablaPacientes, procesarEliminacionPaciente } from '../components/pacientes/TablaPacientes';
import { BuscadorPacientes, filtrarPacientes } from '../components/pacientes/BuscadorPacient';

interface User {
  email: string;
  rol: 'admin' | 'recepcionista' | 'medico';
  nombre: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteAEditar, setPacienteAEditar] = useState<Paciente | null>(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('medicare_pacientes');
    if (data) {
      try {
        setPacientes(JSON.parse(data));
      } catch (e) {
        setPacientes([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('medicare_pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const handleGuardarPaciente = (pacienteData: Paciente | Omit<Paciente, 'id'>) => {
    setPacientes(prev => procesarGuardadoPaciente(prev, pacienteData));
    setPacienteAEditar(null);
  };

  const handleEliminarPaciente = (id: string) => {
    setPacientes(prev => procesarEliminacionPaciente(prev, id));
  };

  const pacientesFiltrados = filtrarPacientes(pacientes, busqueda);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              M
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">medicare</span>
          </div>
          
          <div className="flex items-center gap-6">
            <PerfilUsuario nombre={user.nombre} />
            <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
            <button 
              onClick={onLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-500 mt-1">
            Rol activo: <span className="font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-sm uppercase">{user.rol}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {user.rol !== 'medico' && (
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  {pacienteAEditar ? 'Editar Paciente' : 'Alta de Paciente'}
                </h2>
                <FormularioPaciente
                  pacienteAEditar={pacienteAEditar}
                  onGuardar={handleGuardarPaciente}
                  onCancelar={() => setPacienteAEditar(null)}
                />
              </div>
            )}

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
               <h2 className="text-lg font-bold text-gray-900 mb-4">Lista de Pacientes</h2>
               
               <BuscadorPacientes busqueda={busqueda} setBusqueda={setBusqueda} />
               
               <TablaPacientes 
                 pacientes={pacientesFiltrados} 
                 onEditar={setPacienteAEditar} 
                 onEliminar={handleEliminarPaciente} 
               />
            </div>
          </div>

          {/* Sidebar (Estadísticas) */}
          <div className="lg:col-span-1 space-y-8">
            {user.rol !== 'recepcionista' && (
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Estadísticas</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-600 font-medium">Pacientes Registrados</p>
                    <p className="text-3xl font-bold text-blue-900 mt-1">{pacientes.length}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">Buscando actualmente</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {busqueda ? `"${busqueda}"` : 'Ninguna búsqueda'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


