import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle
} from "@ionic/react";
import PersonalInfo from "../components/personalInfo";

const PersonalInfoPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color="blue">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/list" />
                    </IonButtons>
                    <IonTitle className="font-bold">Información Personal</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent color="light">
                <div className="p-4 flex flex-col items-center">
                    <IonCard className="w-full max-w-lg shadow-xl rounded-[2rem] border-0 mt-8 bg-blue-200">
                        <IonCardHeader className="text-center pt-8">
                            <IonCardTitle className="text-xl font-extrabold text-blue-600">Mi Perfil</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className="p-6">
                            <PersonalInfo></PersonalInfo>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PersonalInfoPage;

