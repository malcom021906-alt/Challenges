import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainTabs from './components/layout/MainTabs';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './index.css';

setupIonicReact({ mode: 'md' });

// Guard para rutas privadas
const PrivateRoute: React.FC<{ children: React.ReactNode; path: string; exact?: boolean }> = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      localStorage.getItem('firebase:authUser') !== null || sessionStorage.length > 0
        ? children
        : <Redirect to="/login" />
    }
  />
);

// Guard de autenticación real usando AppContext
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--color-bg)',
        flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ fontSize: '3rem', animation: 'float 1.5s ease-in-out infinite' }}>🚀</div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
          Cargando MisionApp...
        </p>
      </div>
    );
  }

  return user ? <>{children}</> : <Redirect to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user, loading } = useApp();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--color-bg)',
        flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ fontSize: '3rem', animation: 'float 1.5s ease-in-out infinite' }}>🚀</div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600, margin: 0 }}>
          Cargando MisionApp...
        </p>
      </div>
    );
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas públicas */}
        <Route
          exact path="/login"
          render={() => user ? <Redirect to="/app/misiones" /> : <LoginPage />}
        />
        <Route
          exact path="/register"
          render={() => user ? <Redirect to="/app/misiones" /> : <RegisterPage />}
        />

        {/* Rutas privadas — requieren auth */}
        <Route
          path="/app"
          render={() => user ? <MainTabs /> : <Redirect to="/login" />}
        />

        {/* Ruta raíz */}
        <Route exact path="/">
          <Redirect to={user ? '/app/misiones' : '/login'} />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </IonApp>
);

export default App;
