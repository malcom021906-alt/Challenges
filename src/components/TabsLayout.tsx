import React from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';
import { ListTodo, Users, Apple } from 'lucide-react';
import TasksList from '../pages/List';
import ContactsPage from '../pages/ContactsPage';
import FruitsPage from '../pages/FruitsPage';

const TabsLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50">
      <main className="flex-1 overflow-y-auto pb-16">
        <Switch>
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
        </Switch>
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50 px-2 safe-area-pb shadow-lg">
        <NavLink 
          to="/tabs/tasks" 
          className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-blue-600 transition-colors"
          activeClassName="text-blue-600 font-semibold"
        >
          <ListTodo size={24} className="mb-1" />
          <span className="text-xs">Tareas</span>
        </NavLink>

        <NavLink 
          to="/tabs/contacts" 
          className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-blue-600 transition-colors"
          activeClassName="text-blue-600 font-semibold"
        >
          <Users size={24} className="mb-1" />
          <span className="text-xs">Contactos</span>
        </NavLink>

        <NavLink 
          to="/tabs/fruits" 
          className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-blue-600 transition-colors"
          activeClassName="text-blue-600 font-semibold"
        >
          <Apple size={24} className="mb-1" />
          <span className="text-xs">Frutas</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default TabsLayout;
