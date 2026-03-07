import { IonItem, IonInput, IonButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
            <IonItem className="bg-white rounded-xl overflow-hidden mb-4 custom-item border border-gray-200" lines="none" color="light">
                <IonInput color="light"
                    label="Nombre Completo"
                    labelPlacement="stacked"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                    className="text-gray-900 font-medium"
                />
            </IonItem>

            <IonItem color="light" className="bg-white rounded-xl overflow-hidden mb-6 custom-item border border-gray-200" lines="none">
                <IonInput
                    label="Teléfono"
                    labelPlacement="stacked"
                    type="tel"
                    placeholder="Ej. 300 123 4567"
                    value={phone}
                    onIonChange={(e) => setPhone(e.detail.value!)}
                    className="text-gray-900 font-medium"
                />
                
            </IonItem>
            

            <IonButton
                expand="block"
                type="submit"
                className="font-bold h-12 mt-4 transition-all"
                shape="round"
            >
                <IonIcon slot="start" icon={addOutline} />
                Agregar Contacto
            </IonButton>
        </form>
    );
}

export default ContactForm;
