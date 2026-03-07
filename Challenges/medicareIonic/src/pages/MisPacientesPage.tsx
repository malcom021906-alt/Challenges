import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const MisPacientesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Sección en construcción para los registros de pacientes.</p>
      </IonContent>
    </IonPage>
  );
};

export default MisPacientesPage;
