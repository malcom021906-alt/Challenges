import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import MainTabs from './components/layout/MainTabs';
import type { Visita } from './models/Visita';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import './index.css';

setupIonicReact();

const PrivateRoute: React.FC<{ children: React.ReactNode; path: string; exact?: boolean }> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => localStorage.getItem('logged') === 'true' ? children : <Redirect to="/login" />}
  />
);

const PublicRoute: React.FC<{ children: React.ReactNode; path: string; exact?: boolean }> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() => localStorage.getItem('logged') === 'true' ? <Redirect to="/visitas" /> : children}
  />
);

const App: React.FC = () => {
  const [pendingTotal, setPendingTotal] = useState(0);

  const calculatePending = () => {
    const data = localStorage.getItem('medicare_visitas');
    if (data) {
      try {
        const list: Visita[] = JSON.parse(data);
        setPendingTotal(list.filter(v => v.estado === 'pendiente').length);
      } catch (e) {}
    }
  };

  useEffect(() => {
    calculatePending();
    window.addEventListener('visitas_updated', calculatePending);
    return () => window.removeEventListener('visitas_updated', calculatePending);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <PublicRoute exact path="/login"><LoginPage /></PublicRoute>
          <PrivateRoute path="/visitas"><MainTabs pendingCount={pendingTotal} /></PrivateRoute>
          <PrivateRoute path="/pacientes"><MainTabs pendingCount={pendingTotal} /></PrivateRoute>
          <PrivateRoute path="/perfil"><MainTabs pendingCount={pendingTotal} /></PrivateRoute>
          <Route exact path="/"><Redirect to={localStorage.getItem('logged') === 'true' ? '/visitas' : '/login'} /></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
