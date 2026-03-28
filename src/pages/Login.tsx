import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner
} from '@ionic/react';
import { logInOutline, personAddOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login, error, clearError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      history.replace('/tasks');
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" scrollY={false}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <div className="bg-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 transform rotate-12 transition-transform hover:rotate-0">
                <IonIcon icon={logInOutline} className="text-4xl" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Bienvenido</h1>
              <p className="text-slate-500 mt-2 font-medium">Gestiona tus tareas de forma eficiente</p>
            </div>

            <IonCard className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white">
              <IonCardContent className="p-8">
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <IonInput
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      className="custom-input h-14"
                      fill="outline"
                      labelPlacement="stacked"
                    >
                      <IonIcon slot="start" icon={mailOutline} className="mr-3 text-slate-400" aria-hidden="true" />
                    </IonInput>

                    <IonInput
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                      className="custom-input h-14"
                      fill="outline"
                      labelPlacement="stacked"
                    >
                      <IonIcon slot="start" icon={lockClosedOutline} className="mr-3 text-slate-400" aria-hidden="true" />
                    </IonInput>
                  </div>

                  {error && (
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100 animate-shake">
                      <IonText color="danger" className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {error}
                      </IonText>
                    </div>
                  )}

                  <IonButton
                    type="submit"
                    expand="block"
                    className="h-14 font-bold text-lg"
                    style={{ '--border-radius': '1rem' }}
                    disabled={loading}
                  >
                    {loading ? <IonSpinner name="crescent" /> : 'Iniciar Sesión'}
                  </IonButton>

                  <div className="text-center mt-4">
                    <IonButton
                      fill="clear"
                      onClick={() => {
                        clearError();
                        history.push('/register');
                      }}
                      className="text-primary font-bold hover:opacity-80 transition-opacity"
                    >
                      <IonIcon icon={personAddOutline} slot="start" />
                      ¿No tienes cuenta? Regístrate
                    </IonButton>
                  </div>
                </form>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
