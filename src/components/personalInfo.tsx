import React from 'react';
import {
    IonAvatar,
    IonItem,
    IonLabel,
    IonList,
    IonIcon
} from "@ionic/react";
import {
    mailOutline,
    callOutline,
    personOutline,
    locationOutline
} from 'ionicons/icons';

const PersonalInfo: React.FC = () => {
    // Mock user data
    const user = {
        name: "Malcom osorio",
        email: "user@mail.com",
        phone: "+57 311 234 5678",
        address: "Cali, Colombia",
        avatar: "https://ionicframework.com/docs/img/demos/avatar.svg"
    };

    return (
        <div className="flex flex-col items-center">
            <IonAvatar className="w-32 h-32 mb-6 shadow-lg border-4 border-blue-500/20">
                <img src={user.avatar} alt="Profile" />
            </IonAvatar>

            <h2 className="text-2xl font-bold text-slate-800 mb-1">{user.name}</h2>
            <p className="text-slate-500 font-medium mb-6">Administrador</p>

            <IonList
                lines="full"
                className="w-full !bg-transparent overflow-hidden rounded-2xl border border-blue-300/30"
                style={{ '--background': 'transparent' } as any}
            >
                <IonItem style={{ '--background': 'transparent' } as any} className="!bg-transparent">
                    <IonIcon icon={personOutline} slot="start" color="primary" />
                    <IonLabel>
                        <h3 className="text-blue-900/60 font-semibold">Nombre Completo</h3>
                        <p className="text-blue-900 font-bold">{user.name}</p>
                    </IonLabel>
                </IonItem>

                <IonItem style={{ '--background': 'transparent' } as any} className="!bg-transparent">
                    <IonIcon icon={mailOutline} slot="start" color="primary" />
                    <IonLabel>
                        <h3 className="text-blue-900/60 font-semibold">Correo Electrónico</h3>
                        <p className="text-blue-900 font-bold">{user.email}</p>
                    </IonLabel>
                </IonItem>

                <IonItem style={{ '--background': 'transparent' } as any} className="!bg-transparent">
                    <IonIcon icon={callOutline} slot="start" color="primary" />
                    <IonLabel>
                        <h3 className="text-blue-900/60 font-semibold">Teléfono</h3>
                        <p className="text-blue-900 font-bold">{user.phone}</p>
                    </IonLabel>
                </IonItem>

                <IonItem style={{ '--background': 'transparent' } as any} className="!bg-transparent">
                    <IonIcon icon={locationOutline} slot="start" color="primary" />
                    <IonLabel>
                        <h3 className="text-blue-900/60 font-semibold">Ubicación</h3>
                        <p className="text-blue-900 font-bold">{user.address}</p>
                    </IonLabel>
                </IonItem>
            </IonList>
        </div>
    );
};

export default PersonalInfo;

