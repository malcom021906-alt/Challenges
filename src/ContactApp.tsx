import { useState, useEffect } from 'react';
import Loader from './components/Loader.tsx';
import ContactForm from './components/ContactForm.tsx';
import ContactList from './components/ContactList.tsx';

interface Contact {
    id: number;
    name: string;
    phone: string;
}

const ContactApp = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setContacts([
                { id: 1, name: 'John Doe', phone: '123-456-7890' },
                { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
            ]);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const addContact = (name: string, phone: string) => {
        const newContact: Contact = {
            id: Date.now(),
            name,
            phone,
        };
        setContacts([...contacts, newContact]);
    };

    const deleteContact = (id: number) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
            <div className="bg-blue-600 text-white p-6 shadow-lg mb-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold">Gestión de Contactos</h1>
                    <p className="opacity-90 mt-1">Directorio telefónico</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Nuevo Contacto
                                </h2>
                                <ContactForm onAdd={addContact} />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <div className="bg-white rounded-xl shadow-md p-6 min-h-[400px]">
                                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Lista de Contactos
                                </h2>
                                <ContactList contacts={contacts} onDelete={deleteContact} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContactApp;
