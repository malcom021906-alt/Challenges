// ============================================================
// MISIÓN 3: Modo Zen — Acelerómetro + Haptics
// Plugins usados: @capacitor/motion, @capacitor/haptics
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonBackButton, IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useMotion } from '../hooks/useMotion';
import { useHaptics } from '../hooks/useHaptics';
import { useLocalNotifications } from '../hooks/useLocalNotifications';
import { MISSIONS_DEFAULT } from '../models/types';

const MISSION_ID = 3;
const MISSION_POINTS = 150;
const TOTAL_SECONDS = 10;

const Mision3Page: React.FC = () => {
  const { missions, completeMotion: completeMissionCtx } = useApp();
  const { vibrate, successFeedback } = useHaptics();
  const { notifyMissionCompleted, notifyAllCompleted } = useLocalNotifications();
  const history = useHistory();
  const [toast, setToast] = useState('');

  const mission = missions.find(m => m.id === MISSION_ID) ?? MISSIONS_DEFAULT[2];
  const isAlreadyDone = mission.status === 'completed';
  const isLocked = mission.status === 'locked';

  const handleMissionComplete = async () => {
    await vibrate();
    await successFeedback();
    completeMissionCtx(MISSION_ID, MISSION_POINTS);
    await notifyMissionCompleted('Modo Zen', MISSION_POINTS);
    await notifyAllCompleted();
    setToast('👑 ¡Misión completada! +150 puntos');
    setTimeout(() => history.replace('/app/misiones'), 2500);
  };

  const {
    isListening, countdown, isCompleted, acceleration, isStill,
    startListening, stopListening, reset
  } = useMotion(handleMissionComplete);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  const progressAngle = ((TOTAL_SECONDS - countdown) / TOTAL_SECONDS) * 283;
  const circumference = 283;

  if (isLocked) {
    return (
      <IonPage id="mision3-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/app/misiones" text="Misiones" /></IonButtons>
            <IonTitle>🧘 Misión 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="page-container" style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔒</div>
            <h2 style={{ fontWeight: 800, marginBottom: '8px' }}>Misión Bloqueada</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto' }}>
              Completa primero la Misión 2 (GPS) para desbloquear el Modo Zen.
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage id="mision3-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/misiones" text="Misiones" />
          </IonButtons>
          <IonTitle>🧘 Misión 3</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">

          {/* Info misión */}
          <div className="sensor-card" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>🧘</span>
              <span style={{
                background: 'rgba(245,158,11,0.2)', color: 'var(--color-warning)',
                padding: '4px 12px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem'
              }}>
                +{MISSION_POINTS} pts
              </span>
            </div>
            <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: '1.2rem' }}>Modo Zen</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Permanece <strong>completamente quieto 10 segundos</strong>. El acelerómetro detecta
              cualquier movimiento. Si te mueves, el conteo reinicia. Al completar, el celular vibrará.
            </p>
            <div style={{
              marginTop: '12px', padding: '8px 12px',
              background: 'rgba(108,99,255,0.08)',
              borderRadius: '8px', fontSize: '0.75rem', color: 'var(--color-primary)'
            }}>
              🔌 <strong>@capacitor/motion</strong> (accel) + <strong>@capacitor/haptics</strong> (vibración)
            </div>
          </div>

          {/* Ya completada */}
          {(isAlreadyDone || isCompleted) ? (
            <div style={{
              textAlign: 'center', padding: '30px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-success)',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '12px' }}>👑</div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: '1.2rem' }}>¡Modo Zen completado!</p>
              <p style={{ margin: '6px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                Permaneciste quieto 10 segundos
              </p>
            </div>
          ) : (
            <>
              {/* Countdown ring */}
              <div className="sensor-card" style={{ marginBottom: '20px' }}>
                <p className="sensor-label" style={{ marginBottom: '20px' }}>
                  {isListening ? (isStill ? '😌 Quieto...' : '😬 ¡Te moviste! Reiniciando...') : 'Presiona iniciar'}
                </p>

                <div className="countdown-ring" id="countdown-ring">
                  <svg width="160" height="160" viewBox="0 0 100 100">
                    {/* Track */}
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke="var(--color-surface)"
                      strokeWidth="6"
                    />
                    {/* Progress */}
                    <circle
                      cx="50" cy="50" r="45"
                      fill="none"
                      stroke={isStill && isListening ? 'var(--color-secondary)' : 'var(--color-primary)'}
                      strokeWidth="6"
                      strokeDasharray={`${circumference} ${circumference}`}
                      strokeDashoffset={circumference - progressAngle}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
                    />
                  </svg>
                  <div className="countdown-number" id="countdown-display">{countdown}</div>
                </div>

                {/* Acelerómetro en tiempo real */}
                {acceleration && isListening && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '16px' }}>
                    {(['x', 'y', 'z'] as const).map(axis => (
                      <div key={axis} style={{
                        background: 'var(--color-surface)',
                        borderRadius: '8px', padding: '8px',
                        border: '1px solid var(--color-border)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '2px', textTransform: 'uppercase' }}>
                          Accel {axis.toUpperCase()}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                          {acceleration[axis].toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Estado del movimiento */}
              {isListening && (
                <div style={{
                  textAlign: 'center', marginBottom: '16px',
                  padding: '12px',
                  background: isStill ? 'rgba(0,212,170,0.1)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${isStill ? 'rgba(0,212,170,0.3)' : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: 'var(--radius-md)',
                  color: isStill ? 'var(--color-secondary)' : 'var(--color-danger)',
                  fontWeight: 700, fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}>
                  {isStill ? '✅ Quieto — sigue así' : '⚠️ ¡Movimiento detectado! Cuenta reiniciada'}
                </div>
              )}

              {/* Botones */}
              {!isListening ? (
                <button
                  id="btn-start-motion"
                  className="btn-primary animate-pulse-glow"
                  onClick={startListening}
                >
                  🧘 Iniciar detección
                </button>
              ) : (
                <button
                  id="btn-reset-motion"
                  className="btn-secondary"
                  onClick={() => { reset(); showToast('🔄 Reiniciado'); }}
                >
                  🔄 Reiniciar
                </button>
              )}
            </>
          )}

          <div style={{
            marginTop: '16px', padding: '10px 14px',
            background: 'rgba(108,99,255,0.05)',
            borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)'
          }}>
            💡 En browser se simula el acelerómetro. En Android usa el sensor físico real.
            Al completar, el celular vibrará automáticamente.
          </div>
        </div>

        <div className={`app-toast ${toast ? 'show' : ''} ${toast.includes('👑') ? 'success' : ''}`}>
          {toast}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mision3Page;
