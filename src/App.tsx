import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import Loader from './components/loader';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { TasksProvider } from './contexts/TasksContext';
import { ContactsProvider } from './contexts/ContactsContext';
import { FruitsProvider } from './contexts/FruitsContext';
import TabsLayout from './components/TabsLayout';
import UserDetail from './pages/userDetail';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import './theme/tailwind.css';

setupIonicReact();

const PrivateRoute: React.FC<{ children: React.ReactNode; path: string; exact?: boolean }> = ({ children, ...rest }) => {
  const { user, loading } = useAuthContext();
  return (
    <Route
      {...rest}
      render={() => {
        if (loading) return <Loader />;
        return user ? children : <Redirect to="/login" />;
      }}
    />
  );
};

const PublicRoute: React.FC<{ children: React.ReactNode; path: string; exact?: boolean }> = ({ children, ...rest }) => {
  const { user, loading } = useAuthContext();
  return (
    <Route
      {...rest}
      render={() => {
        if (loading) return <Loader />;
        return user ? <Redirect to="/tabs" /> : children;
      }}
    />
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <TasksProvider>
        <ContactsProvider>
          <FruitsProvider>
            <IonReactRouter>
              <IonRouterOutlet>
                <PublicRoute exact path="/login">
                  <Login />
                </PublicRoute>
                <PublicRoute exact path="/register">
                  <Register />
                </PublicRoute>
                <PrivateRoute path="/tabs">
                  <TabsLayout />
                </PrivateRoute>
                <PrivateRoute exact path="/task/add">
                  <TaskForm />
                </PrivateRoute>
                <PrivateRoute exact path="/task/edit/:id">
                  <TaskForm />
                </PrivateRoute>
                <PrivateRoute exact path="/task/view/:id">
                  <TaskDetail />
                </PrivateRoute>
                <PrivateRoute exact path="/contact/view/:id">
                  <UserDetail />
                </PrivateRoute>
                <Route exact path="/">
                  <Redirect to="/tabs" />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </FruitsProvider>
        </ContactsProvider>
      </TasksProvider>
    </AuthProvider>
  </IonApp>
);

export default App;
