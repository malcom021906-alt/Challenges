import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonInput,
  IonChip,
} from '@ionic/react';
import { logOutOutline, addOutline, trashOutline, wifiOutline } from 'ionicons/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { useFruitsContext } from '../contexts/FruitsContext';

const FruitsPage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { fruits, addFruit, deleteFruit, isOnline } = useFruitsContext();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !qty.trim()) return;
    addFruit(name, parseInt(qty, 10));
    setName('');
    setQty('');
    setShowForm(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Mis Frutas (Cloud)</IonTitle>
          <IonButtons slot="end">
            {!isOnline && (
              <IonIcon icon={wifiOutline} color="danger" className="mr-2 text-xl" />
            )}
            <IonButton onClick={logout} className="font-semibold">
              <IonIcon slot="start" icon={logOutOutline} />
              <span className="hidden sm:inline">Salir</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        <div className="max-w-3xl mx-auto p-4">
           <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-success">
            <p className="text-sm text-slate-500 mb-3">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            {!isOnline && (
              <IonChip color="danger" className="mb-4">
                <IonLabel>Sin conexión - Modo Solo Lectura</IonLabel>
              </IonChip>
            )}
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Mis Frutas ({fruits.length})</h2>
              <IonButton 
                onClick={() => setShowForm(!showForm)} 
                color="success"
                disabled={!isOnline}
              >
                <IonIcon slot="start" icon={addOutline} />
                {showForm ? 'Cancelar' : 'Nueva'}
              </IonButton>
            </div>

            {showForm && (
              <form onSubmit={handleAdd} className="mb-6 p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-4">
                <IonItem className="rounded-lg">
                  <IonInput
                    label="Nombre"
                    labelPlacement="floating"
                    value={name}
                    onIonChange={e => setName(e.detail.value!)}
                    required
                  />
                </IonItem>
                <IonItem className="rounded-lg">
                  <IonInput
                    type="number"
                    label="Cantidad"
                    labelPlacement="floating"
                    value={qty}
                    onIonChange={e => setQty(e.detail.value!)}
                    required
                  />
                </IonItem>
                <IonButton type="submit" expand="block" color="success">
                  Guardar
                </IonButton>
              </form>
            )}
          </div>

          {fruits.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍎</div>
               <h2 className="text-xl font-bold text-slate-600 mb-2">No hay frutas</h2>
               <p className="text-slate-400">Agrega frutas para sincronizarlas en la nube</p>
            </div>
          ) : (
            <IonList className="rounded-2xl overflow-hidden shadow-md bg-white">
              {fruits.map((f) => (
                <IonItemSliding key={f.id}>
                  <IonItem>
                    <IonLabel>
                      <h2 className="font-bold text-lg">{f.name}</h2>
                      <p>Cantidad: <strong className="text-success">{f.quantity}</strong></p>
                    </IonLabel>
                  </IonItem>
                   <IonItemOptions side="end">
                    <IonItemOption 
                      color="danger" 
                      onClick={() => deleteFruit(f.id)}
                      disabled={!isOnline}
                    >
                      <IonIcon slot="icon-only" icon={trashOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FruitsPage;
