import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { logOutOutline, personAddOutline, peopleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ContactForm from '../components/contactForm';
import ContactList from '../components/contactList';
import Loader from '../components/loader';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

const List: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setContacts([
        { id: 1, name: 'John Doe', phone: '123-456-7890' },
        { id: 2, name: 'Jane Smith', phone: '987-654-3210' },
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('logged');
    history.replace('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gestión de Contactos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} className="font-semibold">
              <IonIcon slot="start" icon={logOutOutline} />
              <span className="hidden sm:inline">Salir</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        {loading ? (
          <div className="flex justify-center pt-20">
            <Loader loading={loading} />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto p-4">

            {/* Hero Image */}
            <IonCard className="mx-0 mt-2 mb-6 shadow-md rounded-xl overflow-hidden">
              <img
                src="https://media.istockphoto.com/id/2218105210/photo/folder-document-management-system-dms-open-file-folder-with-flying-blank-documents-with.jpg?s=1024x1024&w=is&k=20&c=QezwGIhw8EuA4_uTXxUQuEQ913l27-RglHNk_rGNUAc="
                alt="PWA Connectivity"
                className="w-full h-32 md:h-48 object-cover"
              />
            </IonCard>

            <IonGrid className="p-0">
              <IonRow className="gap-y-6">

                {/* Contact Form Column */}
                <IonCol size="12" sizeMd="4" className="p-0 md:pr-4">
                  <IonCard className="m-0 h-full shadow-md rounded-xl">
                    <IonCardHeader>
                      <IonCardTitle className="text-xl font-bold flex items-center gap-2">
                        <IonIcon icon={personAddOutline} color="primary" />
                        Nuevo Contacto
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <ContactForm onAdd={addContact} />
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                {/* Contact List Column */}
                <IonCol size="12" sizeMd="8" className="p-0 md:pl-2">
                  <IonCard className="m-0 min-h-[400px] shadow-md rounded-xl">
                    <IonCardHeader>
                      <IonCardTitle className="text-xl font-bold flex items-center gap-2">
                        <IonIcon icon={peopleOutline} color="primary" />
                        Lista de Contactos
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <ContactList contacts={contacts} onDelete={deleteContact} />
                    </IonCardContent>
                  </IonCard>
                </IonCol>

              </IonRow>
            </IonGrid>

          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default List;
