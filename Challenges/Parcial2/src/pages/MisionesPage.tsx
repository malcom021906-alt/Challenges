import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logOutOutline } from 'ionicons/icons';
import { useApp } from '../context/AppContext';
import { logoutUser } from '../services/authService';
import MisionCard from '../components/MisionCard';
import ProgressBar from '../components/ProgressBar';

const MisionesPage: React.FC = () => {
  const { user, points, missions, totalCompleted, progress } = useApp();
  const history = useHistory();

  const handleMissionClick = (id: number) => {
    history.push(`/app/misiones/${id}`);
  };

  const handleLogout = async () => {
    await logoutUser();
    history.replace('/login');
  };

  return (
    <IonPage id="misiones-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontWeight: 800 }}>🚀 Misiones</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            id="btn-logout"
            onClick={handleLogout}
            style={{ color: 'var(--text-secondary)' }}
          >
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <div className="points-header">
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Bienvenido
              </p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                {user?.displayName || user?.email?.split('@')[0] || 'Agente'}
              </p>
            </div>
            <div className="points-badge" id="points-display">
              ⭐ {points} pts
            </div>
          </div>

          <ProgressBar completed={totalCompleted} total={missions.length} />

          {progress === 100 && (
            <div style={{
              textAlign: 'center',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              marginBottom: '16px',
              color: 'var(--color-success)',
              fontWeight: 700,
            }}>
              👑 ¡Completaste todas las misiones! Eres un Maestro.
            </div>
          )}

          <p className="section-title">Tus misiones</p>

          {missions.map((mission, index) => (
            <MisionCard
              key={mission.id}
              mission={mission}
              index={index}
              onClick={() => handleMissionClick(mission.id)}
            />
          ))}

          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(108,99,255,0.05)',
            border: '1px solid rgba(108,99,255,0.15)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: '1.5'
          }}>
            💡 <strong style={{ color: 'var(--text-secondary)' }}>Consejo:</strong> La Misión 3 se desbloquea automáticamente
            al completar la Misión 2 de GPS.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MisionesPage;
