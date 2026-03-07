import { useState, useEffect } from 'react';
import { Login } from './components/auth/Login';
import { Dashboard } from './pages/Dashboard';

interface User {
  email: string;
  rol: 'admin' | 'recepcionista' | 'medico';
  nombre: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedSession = localStorage.getItem('sesion');
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        if (sessionData && sessionData.user) {
          setUser(sessionData.user);
        }
      } catch (e) {
        console.error("Invalid session format");
        localStorage.removeItem('sesion');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sesion');
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;

