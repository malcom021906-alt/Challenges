import React, { useState } from 'react';
import { IonPage, IonContent, IonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true);
    setError('');
    try {
      await loginUser(email, password);
      history.replace('/app/misiones');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Credenciales incorrectas';
      setError(msg.includes('invalid-credential') ? 'Email o contraseña incorrectos' : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage id="login-page">
      <IonContent scrollY={false}>
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-logo">
              <span className="auth-logo-icon animate-float">🚀</span>
              <h1>MisionApp</h1>
              <p>Completa misiones. Gana puntos. Conquista el ranking.</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="login-email">Correo electrónico</label>
                <input
                  id="login-email"
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
                <label htmlFor="login-password">Contraseña</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    style={{ paddingRight: '48px' }}
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)', background: 'none',
                      border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                      fontSize: '1.1rem'
                    }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
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

              <button type="submit" id="btn-login" className="btn-primary" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
              </button>

              <button
                type="button"
                id="btn-go-register"
                className="btn-secondary"
                onClick={() => history.push('/register')}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </form>
          </div>
        </div>
        <IonLoading isOpen={loading} message="Autenticando..." />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
