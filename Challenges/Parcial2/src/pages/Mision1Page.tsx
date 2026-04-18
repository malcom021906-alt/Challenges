// ============================================================
// MISIÓN 1: Evidencia Fotográfica
// Plugins usados: @capacitor/camera, @capacitor/filesystem
// ============================================================

import React, { useState, useEffect } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonBackButton, IonButtons,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useCamera } from '../hooks/useCamera';
import { useFilesystem } from '../hooks/useFilesystem';
import { useLocalNotifications } from '../hooks/useLocalNotifications';
import { MISSIONS_DEFAULT } from '../models/types';

const MISSION_ID = 1;
const MISSION_POINTS = 50;

const Mision1Page: React.FC = () => {
  const { missions, completeMotion } = useApp();
  const { photo, takePhoto, loading: cameraLoading } = useCamera();
  const { savePhoto } = useFilesystem();
  const { requestPermission, notifyMissionCompleted, notifyOneMissionLeft } = useLocalNotifications();
  const history = useHistory();

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const mission = missions.find(m => m.id === MISSION_ID) ?? MISSIONS_DEFAULT[0];
  const isCompleted = mission.status === 'completed';

  useEffect(() => {
    requestPermission();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleTakePhoto = async () => {
    const dataUrl = await takePhoto();
    if (dataUrl) {
      showToast('📸 Foto capturada correctamente');
    }
  };

  const handleSave = async () => {
    if (!photo) return;
    setSaving(true);
    try {
      // Guardar en filesystem local
      const fileName = `mision1_${Date.now()}.jpeg`;
      await savePhoto(photo, fileName);

      // Marcar misión como completada
      completeMotion(MISSION_ID, MISSION_POINTS);
      setSaved(true);

      // Enviar notificación local
      await notifyMissionCompleted('Evidencia Fotográfica', MISSION_POINTS);

      // Notificar si falta 1 misión
      const completed = missions.filter(m => m.status === 'completed').length + 1;
      if (missions.length - completed === 1) {
        await notifyOneMissionLeft();
      }

      showToast('✅ Misión completada. +50 puntos');
      setTimeout(() => history.replace('/app/misiones'), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonPage id="mision1-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/misiones" text="Misiones" />
          </IonButtons>
          <IonTitle>📸 Misión 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">

          {/* Info de misión */}
          <div className="sensor-card" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '2.5rem' }}>📸</span>
              <span style={{
                background: 'rgba(245,158,11,0.2)', color: 'var(--color-warning)',
                padding: '4px 12px', borderRadius: '50px', fontWeight: 700, fontSize: '0.85rem'
              }}>
                +{MISSION_POINTS} pts
              </span>
            </div>
            <h2 style={{ margin: '0 0 8px', fontWeight: 800, fontSize: '1.2rem' }}>
              Evidencia Fotográfica
            </h2>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Captura una foto como evidencia de tu presencia.
              La foto se guardará localmente en tu dispositivo.
            </p>

            {/* Plugin info */}
            <div style={{
              marginTop: '12px', padding: '8px 12px',
              background: 'rgba(108,99,255,0.08)',
              borderRadius: '8px', fontSize: '0.75rem', color: 'var(--color-primary)'
            }}>
              🔌 <strong>@capacitor/camera</strong> + <strong>@capacitor/filesystem</strong>
            </div>
          </div>

          {/* Estado completada */}
          {isCompleted && !saved && (
            <div style={{
              textAlign: 'center', padding: '20px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-success)', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>✅</div>
              <p style={{ margin: 0, fontWeight: 700 }}>¡Misión ya completada!</p>
            </div>
          )}

          {/* Preview de foto */}
          {photo && (
            <img src={photo} alt="Foto tomada" className="photo-preview" id="photo-preview" />
          )}

          {/* Botón tomar foto */}
          {!isCompleted && (
            <button
              id="btn-take-photo"
              className="btn-primary"
              onClick={handleTakePhoto}
              disabled={cameraLoading}
              style={{ marginBottom: '12px' }}
            >
              {cameraLoading ? '📸 Abriendo cámara...' : photo ? '🔄 Retomar foto' : '📸 Tomar foto'}
            </button>
          )}

          {/* Botón guardar y completar */}
          {photo && !isCompleted && (
            <button
              id="btn-save-photo"
              className="btn-primary"
              onClick={handleSave}
              disabled={saving}
              style={{ background: 'var(--gradient-success)' }}
            >
              {saving ? 'Guardando...' : '✅ Guardar y completar misión'}
            </button>
          )}

          {/* Instrucciones */}
          {!photo && !isCompleted && (
            <div style={{
              marginTop: '20px', textAlign: 'center',
              color: 'var(--text-muted)', fontSize: '0.85rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '12px', opacity: 0.4 }}>📷</div>
              <p>Toca el botón para abrir la cámara</p>
              <p style={{ fontSize: '0.75rem' }}>
                En browser se abrirá la galería de archivos.
                En Android usará la cámara real.
              </p>
            </div>
          )}
        </div>

        {/* Toast */}
        <div className={`app-toast ${toast ? 'show' : ''} ${toast.includes('✅') ? 'success' : ''}`}>
          {toast}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Mision1Page;
