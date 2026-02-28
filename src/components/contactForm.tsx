import { useState } from 'react';
import { IonButton, IonInput, IonItem, IonList, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

interface ContactFormProps {
    onAdd: (name: string, phone: string) => void;
}

function ContactForm({ onAdd }: ContactFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        onAdd(name, phone);
        setName('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <IonList lines="none">
                <IonItem className="ion-margin-bottom">
                    <IonInput
                        id="name"
                        type="text"
                        placeholder="Ej. Juan Pérez"
                        label="Nombre Completo"
                        labelPlacement="stacked"
                        fill="outline"
                        shape="round"
                        value={name}
                        onIonInput={(e) => setName(e.detail.value! as string)}
                    ></IonInput>
                </IonItem>

                <IonItem className="ion-margin-bottom">
                    <IonInput
                        id="phone"
                        type="tel"
                        placeholder="Ej. 300 123 4567"
                        label="Teléfono"
                        labelPlacement="stacked"
                        fill="outline"
                        shape="round"
                        value={phone}
                        onIonInput={(e) => setPhone(e.detail.value! as string)}
                    ></IonInput>
                </IonItem>
            </IonList>

            <div className="ion-padding-horizontal">
                <IonButton
                    type="submit"
                    expand="block"
                    shape="round"
                    color="primary"
                    className="ion-margin-top"
                >
                    <IonIcon icon={addOutline} slot="start" />
                    Agregar Contacto
                </IonButton>
            </div>
        </form>
    );
}

export default ContactForm;