import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonButton,
  IonIcon, IonCard, IonCardContent, IonImg
} from '@ionic/react';
import { personCircleOutline, logOutOutline, mailOutline, shieldCheckmarkOutline } from 'ionicons/icons';

interface PerfilProps {
  user: any;
  onLogout: () => void;
}

const PerfilMedicoPage: React.FC<PerfilProps> = ({ user, onLogout }) => {
  const initials = user?.nombre?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'DR';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-white px-4 pt-4">
          <IonTitle className="text-2xl font-black text-slate-800 p-0">Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-white ion-padding">
        <div className="flex flex-col items-center mt-6 mb-8">
          <div className="relative">
            <IonAvatar className="w-28 h-28 border-4 border-white shadow-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black overflow-hidden">
               {user?.foto ? <IonImg src={user.foto} /> : <span>{initials}</span>}
            </IonAvatar>
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white">
              <IonIcon icon={shieldCheckmarkOutline} className="text-xs" />
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-800 m-0">{user?.nombre || 'Cargando...'}</h2>
          <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest mt-1 opacity-70">{user?.rol}</span>
        </div>

        <IonCard className="rounded-[2.5rem] border border-white bg-white/70 backdrop-blur-xl shadow-xl m-0 overflow-hidden">
          <IonCardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <IonIcon icon={mailOutline} className="text-2xl" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 m-0 tracking-widest">Email</p>
                <p className="text-slate-800 font-bold m-0">{user?.email || 'medico@mail.com'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <IonIcon icon={personCircleOutline} className="text-2xl" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 m-0 tracking-widest">Matrícula</p>
                <p className="text-slate-800 font-bold m-0">MAT-3942-A</p>
              </div>
            </div>

            <div className="pt-6">
              <IonButton 
                expand="block" 
                color="danger" 
                fill="clear" 
                className="font-black h-14 rounded-3xl bg-red-50 text-sm tracking-widest"
                onClick={onLogout}
              >
                <IonIcon icon={logOutOutline} slot="start" />
                CERRAR SESIÓN
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PerfilMedicoPage;
