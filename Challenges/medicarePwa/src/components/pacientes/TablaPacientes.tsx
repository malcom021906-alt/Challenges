import type { Paciente } from './FormularioPaciente';

interface TablaPacientesProps {
  pacientes: Paciente[];
  onEditar: (paciente: Paciente) => void;
  onEliminar: (id: string) => void;
}

export const procesarEliminacionPaciente = (
  pacientesActuales: Paciente[],
  id: string
): Paciente[] => {
  return pacientesActuales.filter(p => p.id !== id);
};

export const TablaPacientes = ({ pacientes, onEditar, onEliminar }: TablaPacientesProps) => {
  if (pacientes.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-gray-200 rounded-lg text-center text-gray-500">
        No se encontraron pacientes.
      </div>
    );
  }

  const handleEliminar = (id: string, nombre: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar al paciente ${nombre}?`)) {
      onEliminar(id);
    }
  };
  


  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-sm font-semibold text-gray-600">
            <th className="pb-3 px-4">Nombre Completo</th>
            <th className="pb-3 px-4">DNI</th>
            <th className="pb-3 px-4">Teléfono</th>
            <th className="pb-3 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">
                {paciente.apellido}, {paciente.nombre}
              </td>
              <td className="py-3 px-4 text-gray-600">{paciente.dni}</td>
              <td className="py-3 px-4 text-gray-600">{paciente.telefono || '-'}</td>
              <td className="py-3 px-4 text-right space-x-2">
                <button
                  onClick={() => onEditar(paciente)}
                  className="px-3 py-1 font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(paciente.id, `${paciente.nombre} ${paciente.apellido}`)}
                  className="px-3 py-1 font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
