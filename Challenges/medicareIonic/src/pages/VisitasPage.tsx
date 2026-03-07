import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonItemSliding, IonItemOptions, IonItemOption, IonSegment, IonSegmentButton,
  IonBadge, IonReorderGroup, IonReorder, IonAlert, type ItemReorderEventDetail, IonIcon
} from '@ionic/react';
import { mapOutline, closeCircleOutline, chevronForwardOutline, calendarOutline } from 'ionicons/icons';
import { type Visita, mockedVisitas } from '../models/Visita';

const VisitasPage: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [filtro, setFiltro] = useState('todas');
  const [cancelId, setCancelId] = useState<string | null>(null);

  useEffect(() => {
    let stored = localStorage.getItem('medicare_visitas');
    if (!stored) {
      localStorage.setItem('medicare_visitas', JSON.stringify(mockedVisitas));
      stored = JSON.stringify(mockedVisitas);
    }
    setVisitas(JSON.parse(stored));
  }, []);

  const update = (list: Visita[]) => {
    setVisitas(list);
    localStorage.setItem('medicare_visitas', JSON.stringify(list));
    window.dispatchEvent(new Event('visitas_updated'));
  };

  const statusChange = (id: string, s: Visita['estado'], m?: string) => {
    update(visitas.map(v => v.id === id ? { ...v, estado: s, motivoCancelacion: m } : v));
  };

  const handleReorder = (e: CustomEvent<ItemReorderEventDetail>) => {
    const list = [...visitas];
    const item = list.splice(e.detail.from, 1)[0];
    list.splice(e.detail.to, 0, item);
    update(list);
    e.detail.complete();
  };

  const filtered = visitas.filter(v => filtro === 'todas' ? true : v.estado === filtro);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-white px-4 pt-4">
          <IonTitle className="text-2xl font-black text-slate-800 p-0">Agenda del Día</IonTitle>
        </IonToolbar>
        <IonToolbar className="bg-white px-2 pb-2">
          <IonSegment value={filtro} onIonChange={e => setFiltro(e.detail.value as string)} className="bg-slate-100 rounded-2xl p-1">
            <IonSegmentButton value="todas" className="rounded-xl"><IonLabel className="text-[10px] font-black uppercase">Todas</IonLabel></IonSegmentButton>
            <IonSegmentButton value="pendiente" className="rounded-xl"><IonLabel className="text-[10px] font-black uppercase">Pendientes</IonLabel></IonSegmentButton>
            <IonSegmentButton value="en_curso" className="rounded-xl"><IonLabel className="text-[10px] font-black uppercase">En curso</IonLabel></IonSegmentButton>
            <IonSegmentButton value="finalizada" className="rounded-xl"><IonLabel className="text-[10px] font-black uppercase">Finalizadas</IonLabel></IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="bg-white">
        <IonReorderGroup disabled={filtro !== 'todas' && filtro !== 'pendiente'} onIonItemReorder={handleReorder}>
          <IonList className="bg-transparent px-4 pb-20">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 text-slate-300">
                <IonIcon icon={calendarOutline} className="text-6xl mb-2 opacity-10" />
                <p className="font-black text-sm uppercase">Sin visitas</p>
              </div>
            )}
            {filtered.map(v => (
              <IonItemSliding key={v.id} className="mb-4">
                <IonItemOptions side="start">
                  <IonItemOption color="primary" onClick={() => statusChange(v.id, 'en_camino')} className="rounded-l-2xl font-black px-4">
                    <IonIcon icon={mapOutline} className="text-xl" />
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => setCancelId(v.id)} className="font-black px-4">
                    <IonIcon icon={closeCircleOutline} className="text-xl" />
                  </IonItemOption>
                </IonItemOptions>

                <IonItem className="rounded-[1.5rem] border border-slate-100 bg-white shadow-sm" lines="none" routerLink={v.estado !== 'finalizada' ? `/visitas/${v.id}` : undefined}>
                  <div className="flex items-center gap-3 w-full py-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg ${obtenerEstados(v.estado)}`}>
                      {v.pacienteNombre.charAt(0)}
                    </div>
                    <IonLabel className="m-0">
                      <h2 className="text-lg font-black text-slate-800">{v.pacienteNombre}</h2>
                      <div className="flex gap-2 items-center mt-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{v.horario}</span>
                        <IonBadge className={`text-[9px] font-black uppercase rounded-full px-2 ${estados(v.estado)}`}>{v.estado.replace('_', ' ')}</IonBadge>
                      </div>
                    </IonLabel>
                    {v.estado === 'pendiente' && <IonReorder slot="end" className="text-slate-200" />}
                    <IonIcon icon={chevronForwardOutline} className="text-slate-200 ml-1" />
                  </div>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="secondary" className="rounded-r-2xl font-black px-6" routerLink={`/visitas/${v.id}`}>
                    DETALLE
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        </IonReorderGroup>

        <IonAlert
          isOpen={!!cancelId}
          onDidDismiss={() => setCancelId(null)}
          header="Cancelar Visita"
          inputs={[{ name: 'm', type: 'textarea', placeholder: 'Motivo...' }]}
          buttons={[
            { text: 'NO', role: 'cancel' },
            { text: 'SÍ, CANCELAR', handler: (d) => statusChange(cancelId!, 'cancelada', d.m) }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

const obtenerEstados = (s: string) => {
  if (s === 'pendiente') return 'bg-amber-400';
  if (s === 'en_camino') return 'bg-blue-500';
  if (s === 'en_curso') return 'bg-indigo-600';
  if (s === 'finalizada') return 'bg-emerald-500';
  return 'bg-slate-300';
};

const estados = (s: string) => {
  if (s === 'pendiente') return 'bg-amber-50 text-amber-700';
  if (s === 'en_camino') return 'bg-blue-50 text-blue-700';
  if (s === 'en_curso') return 'bg-indigo-50 text-indigo-700';
  if (s === 'finalizada') return 'bg-emerald-50 text-emerald-700';
  return 'bg-slate-100 text-slate-500';
};

export default VisitasPage;
