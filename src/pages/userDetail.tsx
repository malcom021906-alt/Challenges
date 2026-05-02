import { Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';

import ContactInfo from '../components/contactInfo';

const UserDetail: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { user, logout } = useAuthContext();
    const [contact, setContact] = useState<{ name: string; phone: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContact = async () => {
            if (!user || !id) return;
            try {
                const docRef = doc(db, `users/${user.uid}/contacts`, id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setContact(docSnap.data() as { name: string; phone: string });
                }
            } catch (error) {
                console.error("Error fetching contact:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [user, id]);

    const handleLogout = async () => {
        await logout();
        history.replace('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 p-4">
            <div className="max-w-2xl mx-auto w-full mt-4">
                <div className="shadow-lg rounded-2xl overflow-hidden border-0 bg-white">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                <Users className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold m-0">Detalle del Contacto</h2>
                                <p className="opacity-80 m-0 mt-1">Vista de Usuario</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {loading ? (
                            <p className="text-center py-4 text-slate-500">Cargando...</p>
                        ) : contact ? (
                            <ContactInfo
                                name={contact.name}
                                phone={contact.phone}
                            />
                        ) : (
                            <p className="text-center py-4 text-red-500 font-medium">Contacto no encontrado</p>
                        )}

                        <div className="pt-8 border-t border-slate-100 flex gap-4 mt-6">
                            <button 
                                onClick={() => history.goBack()} 
                                className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                                Volver
                            </button>
                            <button 
                                onClick={handleLogout} 
                                className="flex-1 py-3 px-4 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
