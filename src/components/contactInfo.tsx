import React from 'react';
import { User, Phone } from 'lucide-react';

interface ContactInfoProps {
    name: string;
    phone: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ name, phone }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / Avatar Section */}
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-2xl mb-6">
                <div className="w-24 h-24 mb-4 border-2 border-white shadow-lg rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white">
                    <User size={48} />
                </div>
            </div>

            {/* Details List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-100">
                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-4">
                        <User size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Nombre Completo</p>
                        <h3 className="text-lg font-medium text-slate-900 m-0">{name}</h3>
                    </div>
                </div>

                <div className="flex items-center p-4">
                    <div className="w-10 flex justify-center text-blue-600 mr-4">
                        <Phone size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Célular / Teléfono</p>
                        <h3 className="text-lg font-medium text-slate-900 m-0">{phone}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
