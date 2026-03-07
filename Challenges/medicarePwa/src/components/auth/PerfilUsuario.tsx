interface PerfilUsuarioProps {
  nombre: string;
  avatarUrl?: string;
}

export const PerfilUsuario = ({ nombre, avatarUrl }: PerfilUsuarioProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-end hidden sm:flex">
        <span className="text-sm font-semibold text-gray-900">{nombre}</span>
      </div>
      
      {avatarUrl ? (
        <img 
          src={avatarUrl} 
          alt={`Avatar de ${nombre}`} 
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm ring-2 ring-transparent transition-all hover:ring-blue-200 cursor-pointer">
          {getInitials(nombre)}
        </div>
      )}
    </div>
  );
};
