import React, { useState } from 'react';
import { LogOut, Plus, Trash2, WifiOff, Apple, X } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useFruitsContext } from '../contexts/FruitsContext';

const FruitsPage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { fruits, addFruit, deleteFruit, isOnline } = useFruitsContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !qty.trim()) return;
    addFruit(name, parseInt(qty, 10));
    setName('');
    setQty('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-green-600 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold tracking-wide">Mis Frutas (Cloud)</h1>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <WifiOff className="text-red-300 w-5 h-5 mr-1" />
            )}
            <button 
              onClick={logout} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-green-700 font-semibold transition-colors text-sm"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
           <div className="bg-white rounded-2xl shadow-sm border border-green-200 p-6 mb-6">
            <p className="text-sm text-slate-500 mb-3">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            {!isOnline && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                Sin conexión - Modo Solo Lectura
              </div>
            )}
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Mis Frutas ({fruits.length})</h2>
              <button 
                onClick={() => setShowForm(!showForm)} 
                disabled={!isOnline}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 ${
                  showForm 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {showForm ? <X size={18} /> : <Plus size={18} />}
                {showForm ? 'Cancelar' : 'Nueva'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleAdd} className="mb-6 p-5 border border-slate-200 rounded-2xl bg-slate-50 space-y-4">
                <div className="space-y-1">
                  <label htmlFor="fruit-name" className="block text-sm font-medium text-slate-700">Nombre</label>
                  <input
                    id="fruit-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="fruit-qty" className="block text-sm font-medium text-slate-700">Cantidad</label>
                  <input
                    id="fruit-qty"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full h-12 mt-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex justify-center items-center"
                >
                  Guardar
                </button>
              </form>
            )}
          </div>

          {fruits.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
              <Apple className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h2 className="text-xl font-bold text-slate-600 mb-2">No hay frutas</h2>
              <p className="text-slate-400 text-sm">Agrega frutas para sincronizarlas en la nube</p>
            </div>
          ) : (
            <ul className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white divide-y divide-slate-100">
              {fruits.map((f) => (
                <li key={f.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                      {f.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-slate-800 leading-tight">{f.name}</h2>
                      <p className="text-sm text-slate-500">Cantidad: <strong className="text-green-600">{f.quantity}</strong></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteFruit(f.id)}
                    disabled={!isOnline}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 focus:outline-none"
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default FruitsPage;
