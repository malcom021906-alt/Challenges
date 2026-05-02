import React, { useState } from 'react';
import { LogOut, Plus, WifiOff, X } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useContactsContext } from '../contexts/ContactsContext';
import ContactForm from '../components/contactForm';
import ContactList from '../components/contactList';

const ContactsPage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { contacts, deleteContact, addContact, isOnline } = useContactsContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-blue-600 text-white shadow-md z-10 sticky top-0">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-xl font-bold tracking-wide">Mis Contactos</h1>
          <div className="flex items-center gap-2">
            {!isOnline && (
              <WifiOff className="text-red-300 w-5 h-5 mr-1" />
            )}
            <button 
              onClick={logout} 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-700 font-semibold transition-colors text-sm"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
            <p className="text-sm text-slate-500 mb-3">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            {!isOnline && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold mb-4">
                Sin conexión - Modo Solo Lectura
              </div>
            )}
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Mis Contactos ({contacts.length})</h2>
              <button 
                onClick={() => setShowForm(!showForm)} 
                disabled={!isOnline}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors disabled:opacity-50 ${
                  showForm 
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {showForm ? <X size={18} /> : <Plus size={18} />}
                {showForm ? 'Cancelar' : 'Nuevo'}
              </button>
            </div>

            {showForm && isOnline && (
              <div className="mb-6 p-4 border border-slate-100 rounded-xl bg-slate-50">
                <ContactForm 
                  onAdd={(name, phone) => {
                    addContact(name, phone);
                    setShowForm(false);
                  }} 
                />
              </div>
            )}
          </div>

          <ContactList contacts={contacts} onDelete={deleteContact} />
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;
