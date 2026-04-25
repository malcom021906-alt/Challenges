import React, { useState } from 'react';
import { IonPage, IonContent, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Completa todos los campos'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setLoading(true);
    setError('');
    try {
      await registerUser(email, password, name);
      history.replace('/app/misiones');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al registrar';
      if (msg.includes('email-already-in-use')) {
        setError('Este email ya está registrado');
      } else if (msg.includes('invalid-email')) {
        setError('Email inválido');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage id="register-page">
      <IonContent scrollY={false}>
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-logo">
              <span className="auth-logo-icon">🎮</span>
              <h1>Crear cuenta</h1>
              <p>Únete y empieza a completar misiones</p>
            </div>

            <form onSubmit={handleRegister}>
              <div className="auth-field">
                <label htmlFor="reg-name">Nombre de usuario</label>
                <input
                  id="reg-name"
                  type="text"
                  className="auth-input"
                  placeholder="Tu nombre en el ranking"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-email">Correo electrónico</label>
                <input
                  id="reg-email"
                  type="email"
                  className="auth-input"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="reg-password">Contraseña</label>
                <input
                  id="reg-password"
                  type="password"
                  className="auth-input"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>

              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                  borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
                  color: 'var(--color-danger)', fontSize: '0.85rem'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" id="btn-register" className="btn-primary" disabled={loading}>
                {loading ? 'Creando cuenta...' : 'CREAR CUENTA'}
              </button>

              <button
                type="button"
                id="btn-go-login"
                className="btn-secondary"
                onClick={() => history.push('/login')}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </form>
          </div>
        </div>
        <IonLoading isOpen={loading} message="Creando cuenta..." />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
