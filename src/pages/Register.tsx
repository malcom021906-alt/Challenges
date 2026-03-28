import {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon,
    IonSpinner,
  } from '@ionic/react';
  import { personAddOutline, mailOutline, lockClosedOutline, arrowBackOutline } from 'ionicons/icons';
  import React, { useState } from 'react';
  import { useHistory } from 'react-router-dom';
  import { useAuthContext } from '../contexts/AuthContext';
  
  const Register: React.FC = () => {
    const { register, error, clearError } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const history = useHistory();
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setLocalError('');
      
      if (password !== confirmPassword) {
        setLocalError('Las contraseñas no coinciden');
        return;
      }
  
      if (password.length < 6) {
        setLocalError('La contraseña debe tener al menos 6 caracteres');
        return;
      }
  
      setLoading(true);
      try {
        await register(email, password);
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
                <div className="bg-primary text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 transform rotate-12 transition-transform hover:rotate-0">
                  <IonIcon icon={personAddOutline} className="text-4xl" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Regístrate</h1>
                <p className="text-slate-500 mt-2 font-medium">Únete para empezar a organizar tus tareas</p>
              </div>
  
              <IonCard className="rounded-3xl shadow-xl border-0 overflow-hidden bg-white">
                <IonCardContent className="p-8">
                  <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div className="space-y-4">
                      <IonInput
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onIonInput={(e) => setEmail(e.detail.value!)}
                        className="custom-input h-14"
                        fill="outline"
                        required
                      >
                        <IonIcon slot="start" icon={mailOutline} className="mr-3 text-slate-400" />
                      </IonInput>
  
                      <IonInput
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onIonInput={(e) => setPassword(e.detail.value!)}
                        className="custom-input h-14"
                        fill="outline"
                        required
                      >
                        <IonIcon slot="start" icon={lockClosedOutline} className="mr-3 text-slate-400" />
                      </IonInput>
  
                      <IonInput
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                        className="custom-input h-14"
                        fill="outline"
                        required
                      >
                        <IonIcon slot="start" icon={lockClosedOutline} className="mr-3 text-slate-400" />
                      </IonInput>
                    </div>
  
                    {(error || localError) && (
                      <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                        <IonText color="danger" className="text-sm font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {localError || error}
                        </IonText>
                      </div>
                    )}
  
                    <IonButton
                      type="submit"
                      expand="block"
                      className="h-14 font-bold text-lg mt-2"
                      style={{ '--border-radius': '1rem' }}
                      disabled={loading}
                    >
                      {loading ? <IonSpinner name="crescent" /> : 'Crear Cuenta'}
                    </IonButton>
  
                    <div className="text-center mt-2">
                      <IonButton
                        fill="clear"
                        onClick={() => {
                          clearError();
                          history.goBack();
                        }}
                        className="text-slate-500 font-semibold"
                      >
                        <IonIcon icon={arrowBackOutline} slot="start" />
                        Ya tengo cuenta, iniciar sesión
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
  
export default Register;
