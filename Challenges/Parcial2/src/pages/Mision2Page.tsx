import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonBackButton, IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLocalNotifications } from '../hooks/useLocalNotifications';
import { MISSIONS_DEFAULT } from '../models/types';

const MISSION_ID = 2;
const MISSION_POINTS = 100;
const DISTANCE_REQUIRED = 10;

const Mision2Page: React.FC = () => {
  const { missions, completeMotion } = useApp();
  const {
    currentPosition, distanceMeters,
    isWatching, error, startWatching, stopWatching, requestPermission
  } = useGeolocation();
  const { notifyMissionCompleted, notifyOneMissionLeft } = useLocalNotifications();
  const history = useHistory();

  const [completed, setCompleted] = useState(false);
  const [toast, setToast] = useState('');

  const mission = missions.find(m => m.id === MISSION_ID) ?? MISSIONS_DEFAULT[1];
  const isAlreadyDone = mission.status === 'completed';
  const pct = Math.min((distanceMeters / DISTANCE_REQUIRED) * 100, 100);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (distanceMeters >= DISTANCE_REQUIRED && !completed && !isAlreadyDone) {
      handleComplete();
    }
  }, [distanceMeters]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStart = async () => {
    showToast('📍 GPS iniciado. ¡Empieza a caminar!');
    await startWatching();
  };

  const handleComplete = async () => {
    stopWatching();
    setCompleted(true);
    completeMotion(MISSION_ID, MISSION_POINTS);
    await notifyMissionCompleted('Explorador Urbano', MISSION_POINTS);
    const done = missions.filter(m => m.status === 'completed').length + 1;
    if (missions.length - done === 1) await notifyOneMissionLeft();
    showToast('✅ ¡30 metros alcanzados! +100 puntos');
    setTimeout(() => history.replace('/app/misiones'), 2500);
  };

  return (
    <IonPage id="mision2-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/misiones" text="Misiones" />
          </IonButtons>
          <IonTitle>🗺️ Misión 2</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <div className="sensor-card" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>🗺️</span>
              <span style={{
                background: 'rgba(245,158,11,0.2)', color: 'var(--color-warning)',
                padding: '4px 12px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem'
              }}>
                +{MISSION_POINTS} pts
              </span>
            </div>
            <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: '1.2rem' }}>Explorador Urbano</h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Desplázate <strong>{DISTANCE_REQUIRED} metros</strong> desde tu posición inicial.
              El GPS monitorea tu movimiento en tiempo real.
            </p>
          </div>

          {(isAlreadyDone || completed) && (
            <div style={{
              textAlign: 'center', padding: '20px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-success)', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✅</div>
              <p style={{ margin: 0, fontWeight: 700 }}>¡Misión completada!</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.8 }}>
                Alcanzaste los {DISTANCE_REQUIRED} metros requeridos
              </p>
            </div>
          )}

          {!isAlreadyDone && (
            <div className="sensor-card">
              <p className="sensor-label">Metros Recorridos</p>
              <div className="sensor-value" id="distance-display">
                {distanceMeters}m
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 16px' }}>
                Meta: {DISTANCE_REQUIRED}m
              </p>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: pct >= 100 ? 'var(--gradient-success)' : 'var(--gradient-primary)'
                  }}
                />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '8px 0 0', textAlign: 'right' }}>
                {Math.round(pct)}% completado
              </p>
            </div>
          )}

          {currentPosition && isWatching && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '16px 0' }}>
              <div className="device-info-item">
                <div className="label">Latitud</div>
                <div className="value" id="lat-display" style={{ fontSize: '0.75rem' }}>
                  {currentPosition.latitude.toFixed(6)}
                </div>
              </div>
              <div className="device-info-item">
                <div className="label">Longitud</div>
                <div className="value" id="lng-display" style={{ fontSize: '0.75rem' }}>
                  {currentPosition.longitude.toFixed(6)}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
              color: 'var(--color-danger)', fontSize: '0.85rem'
            }}>
              ⚠️ {error}
            </div>
          )}

          {!isAlreadyDone && !isWatching && !completed && (
            <button id="btn-start-gps" className="btn-primary" onClick={handleStart}>
              📍 Iniciar seguimiento GPS
            </button>
          )}

          {isWatching && !completed && (
            <div style={{
              textAlign: 'center', padding: '16px',
              color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem'
            }}>
              <span style={{
                display: 'inline-block', width: '8px', height: '8px',
                background: 'var(--color-secondary)', borderRadius: '50%',
                marginRight: '8px', animation: 'pulse-glow 1s infinite'
              }} />
              GPS activo — ¡Camina para completar la misión!
            </div>
          )}

          <div style={{
            marginTop: '16px', padding: '10px 14px',
            background: 'rgba(108,99,255,0.05)',
            borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)'
          }}>
            💡 En browser puede pedir permiso de ubicación. En Android usa GPS real de alta precisión.
          </div>
        </div>

        <div className={`app-toast ${toast ? 'show' : ''} ${toast.includes('✅') ? 'success' : ''}`}>
          {toast}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mision2Page;
