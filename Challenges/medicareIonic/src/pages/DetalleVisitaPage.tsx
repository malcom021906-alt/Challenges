import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, 
  IonButton, IonIcon, IonLabel, IonBadge
} from '@ionic/react';
import { useParams, useHistory } from 'react-router';
import { checkmarkCircleOutline, medicalOutline, personOutline, timeOutline } from 'ionicons/icons';
import type { Visita } from '../models/Visita';

const DetalleVisitaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [visita, setVisita] = useState<Visita | null>(null);
  const [receta, setReceta] = useState<string[]>([]);
  
  useEffect(() => {
    const data = localStorage.getItem('medicare_visitas');
    if (data) {
      const list: Visita[] = JSON.parse(data);
      const found = list.find(v => v.id === id);
      if (found) {
        setVisita(found);
        setReceta(found.receta || []);
        if (found.estado === 'pendiente' || found.estado === 'en_camino') {
          updateField(found.id, 'estado', 'en_curso', list);
        }
      }
    }
  }, [id]);

  const updateField = (vid: string, f: string, val: any, all: Visita[]) => {
    const next = all.map(v => v.id === vid ? { ...v, [f]: val } : v);
    localStorage.setItem('medicare_visitas', JSON.stringify(next));
    window.dispatchEvent(new Event('visitas_updated'));
  };

  const finalize = () => {
    const data = localStorage.getItem('medicare_visitas');
    if (data) {
       updateField(id, 'estado', 'finalizada', JSON.parse(data));
       history.goBack();
    }
  };

  if (!visita) return <IonPage><IonContent className="bg-white"><div className="flex h-full items-center justify-center font-black text-slate-300">CARGANDO...</div></IonContent></IonPage>;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-white px-2">
          <IonButtons slot="start"><IonBackButton defaultHref="/visitas" /></IonButtons>
          <IonTitle className="font-black text-slate-800">Detalles</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="bg-white ion-padding">
        <IonCard className="m-0 mb-6 rounded-[2.5rem] border border-slate-100 shadow-xl bg-white overflow-hidden">
          <IonCardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg"><IonIcon icon={personOutline} className="text-xl" /></div>
              <IonCardTitle className="text-xl font-black text-slate-800">{visita.pacienteNombre}</IonCardTitle>
            </div>
          </IonCardHeader>
          <IonCardContent className="text-slate-600 space-y-3">
             <div className="flex items-center gap-2"><IonIcon icon={medicalOutline} className="text-slate-400" /><IonLabel className="font-bold">DNI: {visita.pacienteDni}</IonLabel></div>
             <div className="flex items-center gap-2"><IonIcon icon={timeOutline} className="text-slate-400" /><IonLabel className="font-bold">Horario: {visita.horario}</IonLabel></div>
             <IonBadge color="primary" className="font-black h-6 px-4 rounded-full flex items-center w-fit uppercase text-[9px]">{visita.estado.replace('_', ' ')}</IonBadge>
          </IonCardContent>
        </IonCard>

        <h3 className="text-lg font-black text-slate-800 mb-4 ml-2">PRESCRIPCIÓN</h3>
        
        {visita.estado !== 'finalizada' && (
          <div className="flex gap-2 mb-6">
            <IonItem className="bg-slate-50 rounded-2xl border border-slate-100 flex-1 px-2" lines="none">
            </IonItem>
          </div>
        )}

        <IonList className="bg-transparent space-y-4 mb-8">
          {receta.map((m, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-black text-slate-700 uppercase text-xs">{m}</span>
            </div>
          ))}
          {!receta.length && <div className="text-center py-6 text-slate-300 font-black text-xs">SIN MEDICAMENTOS</div>}
        </IonList>

        {visita.estado !== 'finalizada' && (
          <IonButton expand="block" className="h-16 font-black shadow-2xl mt-4" color="success" shape="round" onClick={finalize}>
            <IonIcon icon={checkmarkCircleOutline} slot="start" /> FINALIZAR VISITIA
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetalleVisitaPage;
