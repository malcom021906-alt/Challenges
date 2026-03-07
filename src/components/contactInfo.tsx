import React from 'react';
import {
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
} from '@ionic/react';
import { personOutline, callOutline } from 'ionicons/icons';

interface ContactInfoProps {
    name: string;
    phone: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ name, phone }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / Avatar Section */}
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50/50 rounded-2xl mb-6">
                <IonAvatar className="w-24 h-24 mb-4 border-1 border-white shadow-lg">
                    <div className="w-full rounded-full h-full bg-blue-600 flex items-center justify-center text-white">
                        <IonIcon icon={personOutline} className="text-4xl " />
                    </div>
                </IonAvatar>
            </div>

            {/* Details List */}
            <div className="bg-white rounded-xl shadow-sm border border-white-100 overflow-hidden">
                <IonItem lines="none" className="py-1" color="light">
                    <IonIcon icon={personOutline} slot="start" color="primary" className="mr-4" />
                    <IonLabel>
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Nombre Completo</p>
                        <h3 className="text-lg font-medium text-gray-900 m-0">{name}</h3>
                    </IonLabel>
                </IonItem>

                <IonItem lines="none" className="py-1" color="light">
                    <IonIcon icon={callOutline} slot="start" color="primary" className="mr-4" />
                    <IonLabel>
                        <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Célular / Teléfono</p>
                        <h3 className="text-lg font-medium text-gray-900 m-0">{phone}</h3>
                    </IonLabel>
                </IonItem>
            </div>
        </div>
    );
};

export default ContactInfo;
