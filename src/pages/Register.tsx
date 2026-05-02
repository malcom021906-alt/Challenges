import React, { useState } from 'react';
import { UserPlus, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useHistory } from 'react-router-dom';
  import { useAuthContext } from '../contexts/AuthContext';
  
  const Register: React.FC = () => {
    const { register, error, clearError } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const history = useHistory();
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError('');
      
      if (password !== confirmPassword) {
        setLocalError('Las contraseñas no coinciden');
        return;
      }
  
      if (password.length < 6) {
        setLocalError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
  
      setLoading(true);
      try {
        await register(email, password);
        history.replace('/tasks');
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
      return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="bg-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 transform rotate-12 transition-transform hover:rotate-0">
              <UserPlus size={40} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Regístrate</h1>
            <p className="text-slate-500 mt-2 font-medium">Únete para empezar a organizar tus tareas</p>
          </div>

          <div className="rounded-3xl shadow-xl border border-slate-100 overflow-hidden bg-white">
            <div className="p-8">
              <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={20} className="text-slate-400" />
                    </div>
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={20} className="text-slate-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={20} className="text-slate-400" />
                    </div>
                    <input
                      type="password"
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {(error || localError) && (
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                    <p className="text-red-600 text-sm font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                      {localError || error}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl mt-2 transition-colors disabled:opacity-70 flex justify-center items-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'Crear Cuenta'}
                </button>

                <div className="text-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      history.goBack();
                    }}
                    className="flex items-center justify-center w-full gap-2 text-slate-500 font-semibold hover:text-slate-700 transition-colors py-2"
                  >
                    <ArrowLeft size={20} />
                    Ya tengo cuenta, iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Register;
