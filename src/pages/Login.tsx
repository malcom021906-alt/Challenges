import { IonContent, IonPage, IonInput, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { logInOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginBg from '../assets/telefono.avif';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'user@mail.com' && password === '123') {
            localStorage.setItem('logged', 'true');
            history.replace('/list');
        } else {
            setError('Credenciales incorrectas. Intenta con user@mail.com / 123');
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" scrollY={false}>
                {/* Background Layer */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${loginBg})` }}
                />

                {/* Overlay for better contrast */}
                <div className="absolute inset-0 z-10 bg-black/10 backdrop-blur-[2px]" />

                <div className="relative z-20 flex justify-center flex-col items-center min-h-screen p-4">
                    <IonCard className="w-full max-w-md shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/30 bg-white/70 backdrop-blur-xl animate-[fadeIn_0.5s_ease-out]">
                        <IonCardContent className="p-8">

                            {/* Header */}
                            <div className="mb-10 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 mb-4">
                                    <IonIcon icon={logInOutline} className="text-3xl text-blue-600" />
                                </div>
                                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Bienvenido</h1>
                                <p className="text-slate-600 font-medium m-0">Ingresa a tu cuenta para continuar</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="flex flex-col gap-5">

                                <IonInput
                                    id="email"
                                    type="email"
                                    label="Correo Electrónico"
                                    labelPlacement="stacked"
                                    placeholder="user@mail.com"
                                    fill="outline"
                                    className="custom-input"
                                    value={email}
                                    onIonInput={(e) => setEmail(e.detail.value! as string)}
                                    color="primary"
                                    required
                                >
                                    <IonIcon icon={mailOutline} slot="start" aria-hidden="true" className="text-slate-400 ml-2" />
                                </IonInput>

                                <IonInput
                                    id="password"
                                    type="password"
                                    label="Contraseña"
                                    labelPlacement="stacked"
                                    placeholder="••••••••"
                                    fill="outline"
                                    className="custom-input"
                                    value={password}
                                    onIonInput={(e) => setPassword(e.detail.value! as string)}
                                    color="primary"
                                    required
                                >
                                    <IonIcon icon={lockClosedOutline} slot="start" aria-hidden="true" className="text-slate-400 ml-2" />
                                </IonInput>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-500/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 text-red-600 border border-red-500/20 animate-shake">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm font-semibold leading-tight m-0">{error}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <IonButton
                                    type="submit"
                                    expand="block"
                                    className="mt-4 h-14 font-bold text-lg shadow-lg shadow-blue-600/20"
                                    style={{ '--border-radius': '1rem' }}
                                    color="primary"
                                >
                                    Inicia Sesión
                                    <IonIcon icon={logInOutline} slot="end" className="ml-2" />
                                </IonButton>

                                <div className="text-center mt-2">
                                    <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>

                            </form>

                        </IonCardContent>
                    </IonCard>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;

