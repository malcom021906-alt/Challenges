import { 
    IonContent, IonPage, IonInput, IonButton, IonIcon, IonCard, IonCardContent, 
    IonLoading, IonToast, IonItem 
} from '@ionic/react';
import { logInOutline, mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginBg from '../assets/medicare_bg.png';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const history = useHistory();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            if ((email === 'user@mail.com' || email === 'admin@mail.com' || email === 'medico@mail.com') && password === '123') {
                localStorage.setItem('logged', 'true');
                localStorage.setItem('sesion', JSON.stringify({ 
                    user: { 
                        email, 
                        rol: email === 'admin@mail.com' ? 'admin' : 'medico',
                        nombre: email === 'admin@mail.com' ? 'Administrador' : 'Dr. Médico'
                    } 
                }));
                history.replace('/visitas');
            } else {
                setToastMsg('Credenciales incorrectas. Intenta con user@mail.com / 123');
            }
        }, 1500);
    };

    return (
        <IonPage>
            <IonContent className="ion-padding bg-white" scrollY={false}>
                <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${loginBg})` }} />
                <div className="absolute inset-0 z-10 bg-black/5" />

                <div className="relative z-20 flex flex-col justify-center items-center min-h-screen p-4">
                    <IonCard className="w-full max-w-md shadow-2xl rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/30 overflow-hidden">
                        <IonCardContent className="p-8">
                            <div className="text-center mb-8">
                                <div className="inline-flex w-16 h-16 rounded-2xl bg-blue-500/10 items-center justify-center mb-3">
                                    <IonIcon icon={logInOutline} className="text-3xl text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-black text-slate-800 tracking-tight">MediCare+</h1>
                                <p className="text-slate-500 font-medium">Gestión de Visitas Médicas</p>
                            </div>

                            <form onSubmit={handleLogin} className="flex flex-col gap-4 ">.
                              <IonItem className="custom-item-input rounded-2xl border border-slate-200 !bg-white/100 px-2">
                                <IonInput
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={email}
                                    onIonInput={e => setEmail(e.detail.value!)}
                                    required
                                >
                                  
                                    <IonIcon icon={mailOutline} slot="start" className="ml-2 text-slate-400" />
                                </IonInput>
                                </IonItem>

                                <IonItem lines="none" className="custom-item-input rounded-2xl border border-slate-200 !bg-white/100 px-2">
                                    <IonIcon icon={lockClosedOutline} className="text-slate-400 mr-2" />
                                    <IonInput
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Contraseña"
                                        value={password}
                                        onIonInput={e => setPassword(e.detail.value!)}
                                        required
                                    />
                                    <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>
                                        <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} color="medium" />
                                    </IonButton>
                                </IonItem>

                                <IonButton type="submit" expand="block" shape="round" className="h-14 font-black text-lg mt-4" color="primary">
                                    INICIAR SESIÓN
                                </IonButton>
                            </form>
                        </IonCardContent>
                    </IonCard>
                </div>

                <IonLoading isOpen={loading} message="iniciando sesion.." duration={0} />
                <IonToast
                    isOpen={!!toastMsg}
                    message={toastMsg}
                    duration={1000}
                    onDidDismiss={() => setToastMsg('')}
                    color="danger"
                    position="bottom"
                />
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
