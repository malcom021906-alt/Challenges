import { IonList, IonNote } from "@ionic/react";
import ContactItem from "./contactItem";

interface Contact {
    id: number;
    name: string;
    phone: string;
}

interface ContactListProps {
    contacts: Contact[];
    onDelete: (id: number) => void;
}

export const ContactList = ({ contacts, onDelete }: ContactListProps) => {
    return (
        <>
            {contacts.length === 0 ? (
                <div className="ion-padding ion-text-center">
                    <IonNote color="medium">No hay contactos guardados.</IonNote>
                </div>
            ) : (
                <IonList>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            onDelete={onDelete}
                        />
                    ))}
                </IonList>
            )}
        </>
    );
}

export default ContactList;
