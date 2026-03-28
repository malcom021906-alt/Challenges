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
  IonChip,
} from '@ionic/react';
import { logOutOutline, addOutline, trashOutline, wifiOutline } from 'ionicons/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { useContactsContext } from '../contexts/ContactsContext';
import ContactForm from '../components/contactForm';

const ContactsPage: React.FC = () => {
  const { logout, user } = useAuthContext();
  const { contacts, deleteContact, addContact, isOnline } = useContactsContext();
  const [showForm, setShowForm] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Contactos</IonTitle>
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
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <p className="text-sm text-slate-500 mb-3">
              Conectado como: <strong className="text-slate-700">{user?.email}</strong>
            </p>
            {!isOnline && (
              <IonChip color="danger" className="mb-4">
                <IonLabel>Sin conexión - Modo Solo Lectura</IonLabel>
              </IonChip>
            )}
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Mis Contactos ({contacts.length})</h2>
              <IonButton 
                onClick={() => setShowForm(!showForm)} 
                disabled={!isOnline}
                color="secondary"
              >
                <IonIcon slot="start" icon={addOutline} />
                {showForm ? 'Cancelar' : 'Nuevo'}
              </IonButton>
            </div>

            {showForm && isOnline && (
              <div className="mb-6 p-4 border border-gray-100 rounded-xl bg-gray-50">
                <ContactForm 
                  onAdd={(name, phone) => {
                    addContact(name, phone);
                    setShowForm(false);
                  }} 
                />
              </div>
            )}
          </div>

          {contacts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-xl font-bold text-slate-600 mb-2">No tienes contactos</h2>
              <p className="text-slate-400">Agrega contactos para verlos aquí</p>
            </div>
          ) : (
            <IonList className="rounded-2xl overflow-hidden shadow-md bg-white">
              {contacts.map((contact) => (
                <IonItemSliding key={contact.id}>
                  <IonItem button routerLink={`/contact/view/${contact.id}`}>
                    <IonLabel>
                      <h2 className="font-semibold text-lg">{contact.name}</h2>
                      <p className="text-slate-500">{contact.phone}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItemOptions side="end">
                    <IonItemOption
                      color="danger"
                      onClick={() => deleteContact(contact.id)}
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

export default ContactsPage;
