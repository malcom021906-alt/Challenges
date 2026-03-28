import {
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
} from '@ionic/react';
import { peopleOutline } from 'ionicons/icons';
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
                setLoading(setLoading(false) as any);
            }
        };

        fetchContact();
    }, [user, id]);

    const handleLogout = async () => {
        await logout();
        history.replace('/login');
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" color="light">
                <div className="max-w-2xl mx-auto">
                    <IonCard className="shadow-lg rounded-2xl overflow-hidden border-0" style={{ backgroundColor: 'white' }}>
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                    <IonIcon icon={peopleOutline} className="text-4xl" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold m-0">Detalle del Contacto</h2>
                                    <p className="opacity-80 m-0">Vista de Usuario</p>
                                </div>
                            </div>
                        </div>

                        <IonCardContent className="p-8">
                            {loading ? (
                                <p className="text-center py-4">Cargando...</p>
                            ) : contact ? (
                                <ContactInfo
                                    name={contact.name}
                                    phone={contact.phone}
                                />
                            ) : (
                                <p className="text-center py-4 text-red-500">Contacto no encontrado</p>
                            )}

                            <div className="pt-8 border-t border-gray-100 flex gap-4 mt-6">
                                <IonButton fill="outline" onClick={() => history.goBack()} className="flex-1 rounded-xl">
                                    Volver
                                </IonButton>
                                <IonButton onClick={handleLogout} color="danger" fill="clear" className="flex-1">
                                    Cerrar Sesión
                                </IonButton>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default UserDetail;
