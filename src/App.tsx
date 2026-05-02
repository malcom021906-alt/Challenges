import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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

import './theme/variables.css';
import './theme/tailwind.css';

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
  <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
    <AuthProvider>
      <TasksProvider>
        <ContactsProvider>
          <FruitsProvider>
            <Router>
              <Switch>
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
              </Switch>
            </Router>
          </FruitsProvider>
        </ContactsProvider>
      </TasksProvider>
    </AuthProvider>
  </div>
);

export default App;
