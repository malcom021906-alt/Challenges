import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/react';
import { listOutline, peopleOutline, nutritionOutline } from 'ionicons/icons';
import TasksList from '../pages/List';
import ContactsPage from '../pages/ContactsPage';
import FruitsPage from '../pages/FruitsPage';

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/tasks">
          <TasksList />
        </Route>
        <Route exact path="/tabs/contacts">
          <ContactsPage />
        </Route>
        <Route exact path="/tabs/fruits">
          <FruitsPage />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/tasks" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tasks" href="/tabs/tasks">
          <IonIcon icon={listOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="contacts" href="/tabs/contacts">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Contactos</IonLabel>
        </IonTabButton>

        <IonTabButton tab="fruits" href="/tabs/fruits">
          <IonIcon icon={nutritionOutline} />
          <IonLabel>Frutas</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;
