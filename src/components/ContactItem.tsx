interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactItemProps {
    contact: Contact;
    onDelete: (id: number) => void;
}

function ContactItem({ contact, onDelete }: ContactItemProps) {
    return (
        <li className="group flex justify-between items-center p-4 mb-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 hover:border-blue-100">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {contact.phone}
                    </p>
                </div>
            </div>
            <button
                onClick={() => onDelete(contact.id)}
                className="opacity-100 md:opacity-50 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                title="Eliminar contacto"
            >
                Eliminar
            </button>
        </li>
    );
}

export default ContactItem;
