import { IonContent, IonPage, IonInput, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/react';
import { logInOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
            <IonContent className="ion-padding" color="light">
                <div className="flex justify-center flex-col items-center min-h-screen">
                    <IonCard className="w-full max-w-md shadow-md rounded-[2rem] p-6 m-0">
                        <IonCardContent>

                            {/* Header */}
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight drop-shadow-sm mb-2">Bienvenido</h1>
                                <p className="text-gray-500 font-medium m-0">Ingresa a tu cuenta para continuar</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="flex flex-col gap-4">

                                <IonInput
                                    id="email"
                                    type="email"
                                    label="Correo Electrónico"
                                    labelPlacement="stacked"
                                    placeholder="user@mail.com"
                                    fill="outline"
                                    shape="round"
                                    value={email}
                                    onIonInput={(e) => setEmail(e.detail.value! as string)}
                                    color="primary"
                                    required
                                >
                                    <IonIcon icon={mailOutline} slot="start" aria-hidden="true" className="text-gray-400" />
                                </IonInput>

                                <IonInput
                                    id="password"
                                    type="password"
                                    label="Contraseña"
                                    labelPlacement="stacked"
                                    placeholder="••••••••"
                                    fill="outline"
                                    shape="round"
                                    value={password}
                                    onIonInput={(e) => setPassword(e.detail.value! as string)}
                                    color="primary"
                                    required
                                >
                                    <IonIcon icon={lockClosedOutline} slot="start" aria-hidden="true" className="text-gray-400" />
                                </IonInput>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 p-4 rounded-xl flex items-center gap-3 text-red-600 animate-[fadeIn_0.3s_ease-out]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm font-medium leading-tight m-0">{error}</p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <IonButton
                                    type="submit"
                                    expand="block"
                                    shape="round"
                                    className="mt-6 font-bold"
                                    color="primary"
                                >
                                    Inicia Sesión
                                    <IonIcon icon={logInOutline} slot="end" className="ml-2" />
                                </IonButton>

                            </form>

                        </IonCardContent>
                    </IonCard>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;
