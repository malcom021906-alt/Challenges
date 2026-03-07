import { useState, useEffect } from 'react';

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

interface FormularioPacienteProps {
  pacienteAEditar: Paciente | null;
  onGuardar: (paciente: Omit<Paciente, 'id'> | Paciente) => void;
  onCancelar: () => void;
}

export const procesarGuardadoPaciente = (
  pacientesActuales: Paciente[],
  pacienteData: Paciente | Omit<Paciente, 'id'>
): Paciente[] => {
  if ('id' in pacienteData) {
    return pacientesActuales.map(p => p.id === pacienteData.id ? (pacienteData as Paciente) : p);
  } else {
    const nuevoPaciente: Paciente = {
      ...pacienteData,
      id: crypto.randomUUID()
    };
    return [...pacientesActuales, nuevoPaciente];
  }
};

export const FormularioPaciente = ({ pacienteAEditar, onGuardar, onCancelar }: FormularioPacienteProps) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre);
      setApellido(pacienteAEditar.apellido);
      setDni(pacienteAEditar.dni);
      setTelefono(pacienteAEditar.telefono);
    } else {
      setNombre('');
      setApellido('');
      setDni('');
      setTelefono('');
    }
  }, [pacienteAEditar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !apellido.trim() || !dni.trim()) {
      setError('Nombre, Apellido y DNI son obligatorios.');
      return;
    }

    if (!/^\d{7,8}$/.test(dni)) {
      setError('El DNI debe tener entre 7 y 8 caracteres numéricos.');
      return;
    }

    const pacienteData = {
      nombre,
      apellido,
      dni,
      telefono
    };

    if (pacienteAEditar) {
      onGuardar({ ...pacienteData, id: pacienteAEditar.id });
    } else {
      onGuardar(pacienteData);
    }
    
    if (!pacienteAEditar) {
      setNombre('');
      setApellido('');
      setDni('');
      setTelefono('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">DNI *</label>
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 mt-2">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-4">
        {pacienteAEditar && (
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {pacienteAEditar ? 'Guardar Cambios' : 'Registrar Paciente'}
        </button>
      </div>
    </form>
  );
};
