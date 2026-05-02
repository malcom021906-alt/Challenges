import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ContactFormProps {
    onAdd: (name: string, phone: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAdd }) => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        onAdd(name, phone);
        setName('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm mb-6">
            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Nombre Completo</label>
                <input
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 text-slate-900"
                    required
                />
            </div>

            <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Teléfono</label>
                <input
                    type="tel"
                    placeholder="Ej. 300 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 text-slate-900"
                    required
                />
            </div>
            
            <button
                type="submit"
                className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
            >
                <Plus size={20} />
                Agregar Contacto
            </button>
        </form>
    );
}

export default ContactForm;
