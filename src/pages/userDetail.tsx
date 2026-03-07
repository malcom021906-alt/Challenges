import {
    IonContent,
    IonPage,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
} from '@ionic/react';
import { peopleOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ContactInfo from '../components/contactInfo';

const UserDetail: React.FC = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('logged');
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
                            <ContactInfo
                                name="Juan Pérez"
                                phone="300 123 4567"
                            />

                            <div className="pt-8 border-t border-gray-100 flex gap-4 mt-6">
                                <IonButton fill="outline" routerLink="/list" className="flex-1 rounded-xl">
                                    Volver a la lista
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
