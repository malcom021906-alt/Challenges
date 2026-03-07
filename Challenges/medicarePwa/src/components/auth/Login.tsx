import { useState } from 'react';

interface User {
  email: string;
  rol: 'admin' | 'recepcionista' | 'medico';
  nombre: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    let user: User | null = null;

    if (password === '123') {
      if (email === 'admin@mail.com') {
        user = { email, rol: 'admin', nombre: 'Admin' };
      } else if (email === 'medico@mail.com') {
        user = { email, rol: 'medico', nombre: 'Dr.Malcom' };
      } else if (email === 'recepcionista@mail.com') {
        user = { email, rol: 'recepcionista', nombre: 'Malcom' };
      }
    }

    if (user) {
      localStorage.setItem('sesion', JSON.stringify({ user, token: 'jwt-token' }));
      onLogin(user);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:border-blue-100">
        
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="h-12 w-12 mb-3 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
            M
          </div>
          <h1 className="text-xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-sm text-gray-500 mt-1">medicare</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electronico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"

              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
          >
            Iniciar Sesión
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
