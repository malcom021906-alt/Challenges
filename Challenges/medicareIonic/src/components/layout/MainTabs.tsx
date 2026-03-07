import React, { useState, useEffect } from 'react';
import { 
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonBadge 
} from '@ionic/react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { calendar, calendarOutline, people, peopleOutline, person, personOutline } from 'ionicons/icons';

import VisitasPage from '../../pages/VisitasPage';
import DetalleVisitaPage from '../../pages/DetalleVisitaPage';
import MisPacientesPage from '../../pages/MisPacientesPage';
import PerfilMedicoPage from '../../pages/PerfilMedicoPage';

interface MainTabsProps {
  pendingCount: number;
}

const MainTabs: React.FC<MainTabsProps> = ({ pendingCount }) => {
  const [activeTab, setActiveTab] = useState('visitas');
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    const session = localStorage.getItem('sesion');
    if (session) {
      try {
        const data = JSON.parse(session);
        setUser(data.user);
      } catch (e) {}
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('sesion');
    history.replace('/login');
  };

  return (
    <IonTabs onIonTabsDidChange={e => setActiveTab(e.detail.tab)}>
      <IonRouterOutlet>
        <Route exact path="/visitas" component={VisitasPage} />
        <Route exact path="/visitas/:id" component={DetalleVisitaPage} />
        <Route exact path="/pacientes" component={MisPacientesPage} />
        <Route exact path="/perfil">
          <PerfilMedicoPage user={user} onLogout={logout} />
        </Route>
        <Route exact path="/"><Redirect to="/visitas" /></Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="h-20 bg-white/80 border-t border-slate-100 backdrop-blur-xl">
        <IonTabButton tab="visitas" href="/visitas">
          <IonIcon icon={activeTab === 'visitas' ? calendar : calendarOutline} />
          <IonLabel className="text-[10px] font-black uppercase">Visitas</IonLabel>
          {pendingCount > 0 && (
            <IonBadge color="danger" className="font-black h-5 min-w-[20px] absolute top-2 right-4">
              {pendingCount}
            </IonBadge>
          )}
        </IonTabButton>

        <IonTabButton tab="pacientes" href="/pacientes">
          <IonIcon icon={activeTab === 'pacientes' ? people : peopleOutline} />
          <IonLabel className="text-[10px] font-black uppercase">Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon icon={activeTab === 'perfil' ? person : personOutline} />
          <IonLabel className="text-[10px] font-black uppercase">Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
