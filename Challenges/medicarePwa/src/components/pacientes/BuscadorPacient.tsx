import type { Paciente } from './FormularioPaciente';

interface BuscadorPacientesProps {
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
}

export const filtrarPacientes = (pacientes: Paciente[], busqueda: string): Paciente[] => {
  const term = busqueda.toLowerCase();
  return pacientes.filter(p => {
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.apellido.toLowerCase().includes(term) ||
      p.dni.includes(term)
    );
  });
};

export const BuscadorPacientes = ({ busqueda, setBusqueda }: BuscadorPacientesProps) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o DNI..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 shadow-sm transition-all"
      />
    </div>
  );
};