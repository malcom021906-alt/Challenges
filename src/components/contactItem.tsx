import { IonButton, IonItem, IonLabel, IonIcon, IonNote } from "@ionic/react";
import { trashOutline, personCircleOutline } from "ionicons/icons";

interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactItemProps {
    contact: Contact;
    onDelete: (id: number) => void;
}

function ContactItem({ contact, onDelete }: ContactItemProps) {
    return (
        <IonItem lines="full" button detail={false}>
            <IonIcon icon={personCircleOutline} slot="start" color="primary" style={{ fontSize: '2.5rem' }} />
            <IonLabel>
                <h2>{contact.name}</h2>
                <IonNote color="medium">{contact.phone}</IonNote>
            </IonLabel>
            <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(contact.id);
                }}
            >
                <IonIcon icon={trashOutline} slot="icon-only" />
            </IonButton>
        </IonItem>
    );
}

export default ContactItem;
