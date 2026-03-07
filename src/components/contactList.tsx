import ContactItem from './ContactItem';

interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactListProps {
    contacts: Contact[];
    onDelete: (id: number) => void;
}

export const ContactList = ({ contacts, onDelete }: ContactListProps) => {
    return (
        <ul className="w-full">
            {contacts.length === 0 ? (
                <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p>No hay contactos todavía.</p>
                </div>
            ) : (
                contacts.map((contact) => (
                    <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
                ))
            )}
        </ul>
    );
};

export default ContactList;
