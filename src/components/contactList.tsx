import { useHistory } from 'react-router-dom';
import { Users } from 'lucide-react';
import ContactItem from './contactItem';

interface Contact {
    id: string;
    name: string;
    phone: string;
}

interface ContactListProps {
    contacts: Contact[];
    onDelete: (id: string) => void;
}

export const ContactList = ({ contacts, onDelete }: ContactListProps) => {
    const history = useHistory();
    return (
        <ul className="w-full">
            {contacts.length === 0 ? (
                <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                    <Users className="h-12 w-12 mb-2 text-slate-300" />
                    <p>No hay contactos todavía.</p>
                </div>
            ) : (
                contacts.map((contact) => (
                    <ContactItem key={contact.id} contact={contact} onClick={() => { history.push(`/userDetail`) }} onDelete={onDelete} />
                ))
            )}
        </ul>
    );
};

export default ContactList;
