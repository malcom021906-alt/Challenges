import React from 'react';
import { Phone, Trash2 } from 'lucide-react';

interface Contact {
    id: string; // Changed to string to match Firestore/RTDB IDs
    name: string;
    phone: string;
}

interface ContactItemProps {
    contact: Contact;
    onDelete: (id: string) => void;
    onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onDelete, onClick }) => {
    return (
        <li
            onClick={onClick}
            className="group flex justify-between items-center p-4 mb-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 hover:border-blue-100 cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone size={12} />
                        {contact.phone}
                    </p>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(contact.id);
                }}
                className="opacity-100 md:opacity-50 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Eliminar contacto"
            >
                <Trash2 size={18} />
            </button>
        </li>
    );
}

export default ContactItem;
