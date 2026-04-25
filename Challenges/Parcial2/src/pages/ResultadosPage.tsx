import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/react';
import { useApp } from '../context/AppContext';
import { useDevice } from '../hooks/useDevice';
import { getUserLevel, getUserLevelEmoji } from '../models/types';

const ResultadosPage: React.FC = () => {
  const { points, missions, totalCompleted, progress, user, resetProgress } = useApp();
  const { deviceInfo } = useDevice();

  const level = getUserLevel(points);
  const emoji = getUserLevelEmoji(points);
  const maxPoints = missions.reduce((s, m) => s + m.points, 0);

  return (
    <IonPage id="resultados-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontWeight: 800 }}>📊 Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="result-level-badge">
              <span className="result-level-emoji">{emoji}</span>
              <span className="result-level-name">{level}</span>
              <span className="result-level-pts">{points} / {maxPoints} puntos</span>
            </div>
          </div>

          <p className="section-title">Estadísticas</p>

          <div className="device-info-grid" style={{ marginBottom: '20px' }}>
            <div className="device-info-item">
              <div className="label">Puntos Totales</div>
              <div className="value" id="total-points" style={{ color: 'var(--color-warning)', fontSize: '1.4rem' }}>
                {points}
              </div>
            </div>
            <div className="device-info-item">
              <div className="label">Misiones</div>
              <div className="value" id="missions-completed">
                {totalCompleted} / {missions.length}
              </div>
            </div>
            <div className="device-info-item">
              <div className="label">Progreso</div>
              <div className="value" id="progress-pct" style={{ color: 'var(--color-primary)' }}>
                {progress}%
              </div>
            </div>
            <div className="device-info-item">
              <div className="label">Nivel</div>
              <div className="value">{emoji} {level}</div>
            </div>
          </div>

          <p className="section-title">Detalle de Misiones</p>
          {missions.map(m => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              background: 'var(--color-surface-2)',
              border: `1px solid ${m.status === 'completed' ? 'rgba(16,185,129,0.3)' : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-md)',
              marginBottom: '10px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{m.title}</p>
                  <p style={{
                    margin: 0, fontSize: '0.75rem',
                    color: m.status === 'completed' ? 'var(--color-success)' : 'var(--text-muted)'
                  }}>
                    {m.status === 'completed' ? '✅ Completada' : m.status === 'locked' ? '🔒 Bloqueada' : '⏳ Pendiente'}
                  </p>
                </div>
              </div>
              <span style={{
                fontWeight: 700,
                color: m.status === 'completed' ? 'var(--color-warning)' : 'var(--text-muted)'
              }}>
                {m.status === 'completed' ? `+${m.points}` : `${m.points} pts`}
              </span>
            </div>
          ))}

          {deviceInfo && (
            <>
              <p className="section-title" style={{ marginTop: '20px' }}>
                Info del Dispositivo
              </p>
              <div className="device-info-grid">
                <div className="device-info-item">
                  <div className="label">Modelo</div>
                  <div className="value">{deviceInfo.model}</div>
                </div>
                <div className="device-info-item">
                  <div className="label">Plataforma</div>
                  <div className="value" style={{ textTransform: 'capitalize' }}>{deviceInfo.platform}</div>
                </div>
                <div className="device-info-item">
                  <div className="label">Sistema OS</div>
                  <div className="value">{deviceInfo.osVersion}</div>
                </div>
                <div className="device-info-item">
                  <div className="label">Batería</div>
                  <div className="value">
                    {deviceInfo.batteryLevel !== null
                      ? `${deviceInfo.batteryLevel}% ${deviceInfo.isCharging ? '⚡' : ''}`
                      : 'N/A'
                    }
                  </div>
                </div>
              </div>
            </>
          )}

          {user && (
            <div style={{
              marginTop: '20px', padding: '14px 16px',
              background: 'var(--color-surface-2)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem', color: 'var(--text-secondary)'
            }}>
              👤 Sesión activa: <strong style={{ color: 'var(--text-primary)' }}>{user.email}</strong>
            </div>
          )}

          <button
            id="btn-reset-progress"
            className="btn-secondary"
            style={{ marginTop: '20px', color: 'var(--color-danger)', borderColor: 'rgba(239,68,68,0.3)' }}
            onClick={() => {
              if (confirm('¿Resetear todo tu progreso?')) resetProgress();
            }}
          >
            🔄 Resetear progreso
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultadosPage;
