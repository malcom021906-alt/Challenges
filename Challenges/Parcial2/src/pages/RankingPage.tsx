// ============================================================
// PANTALLA DE RANKING
// Mezcla usuarios reales de Firebase con 4 usuarios fake.
// El usuario actual aparece siempre en el ranking.
// ============================================================

import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent
} from '@ionic/react';
import { useApp } from '../context/AppContext';
import { getRanking } from '../services/firestoreService';
import { saveMissionProgress } from '../services/firestoreService';
import type { RankingEntry } from '../models/types';

const MEDAL = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

const RankingPage: React.FC = () => {
  const { user, points, missions } = useApp();
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRanking = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Sincronizar puntos actuales antes de cargar ranking
      await saveMissionProgress(
        user.uid,
        points,
        missions.map(m => ({ id: m.id, completed: m.status === 'completed' }))
      );
    } catch (_) {}

    try {
      const data = await getRanking(user.uid);
      // Inyectar datos reales del usuario actual
      const withMe = data.map(e =>
        e.isCurrentUser ? { ...e, points, displayName: user.displayName || 'Tú' } : e
      );
      setRanking(withMe.sort((a, b) => b.points - a.points));
    } catch (_) {
      // Fallback offline
      setRanking([
        { uid: 'fake-1', displayName: 'AlexGameMaster', email: 'alex@demo.com', points: 280 },
        { uid: 'fake-2', displayName: 'SofiaMissions', email: 'sofia@demo.com', points: 200 },
        { uid: user?.uid ?? 'me', displayName: user?.displayName || 'Tú', email: user?.email || '', points, isCurrentUser: true },
        { uid: 'fake-3', displayName: 'CarlosExplorer', email: 'carlos@demo.com', points: 100 },
        { uid: 'fake-4', displayName: 'MariaZen', email: 'maria@demo.com', points: 50 },
      ].sort((a, b) => b.points - a.points));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRanking(); }, [user, points]);

  const myPosition = ranking.findIndex(r => r.isCurrentUser) + 1;

  return (
    <IonPage id="ranking-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontWeight: 800 }}>🏆 Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={async (e) => { await loadRanking(); e.detail.complete(); }}>
          <IonRefresherContent />
        </IonRefresher>

        <div className="page-container">

          {/* Mi posición */}
          {myPosition > 0 && !loading && (
            <div style={{
              textAlign: 'center', marginBottom: '24px',
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(168,85,247,0.15) 100%)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(108,99,255,0.3)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>
                {MEDAL[myPosition - 1] || '📍'}
              </div>
              <p style={{ margin: 0, fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                Tu posición: #{myPosition}
              </p>
              <p style={{ margin: '4px 0 0', color: 'var(--color-warning)', fontWeight: 700 }}>
                {points} puntos
              </p>
            </div>
          )}

          <p className="section-title">Top 5 Jugadores</p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px', animation: 'float 1s infinite' }}>⏳</div>
              Cargando ranking...
            </div>
          ) : (
            ranking.map((entry, idx) => (
              <div
                key={entry.uid}
                id={`ranking-item-${idx + 1}`}
                className={`ranking-item ${entry.isCurrentUser ? 'current-user' : ''}`}
              >
                <div className="ranking-position">{MEDAL[idx] || `${idx + 1}`}</div>

                <div className="ranking-avatar">
                  {(entry.displayName || entry.email || 'U')[0].toUpperCase()}
                </div>

                <div className="ranking-info">
                  <p className="ranking-name">
                    {entry.displayName || 'Usuario'}
                    {entry.isCurrentUser && (
                      <span style={{
                        marginLeft: '6px', fontSize: '0.7rem',
                        background: 'var(--color-primary)', color: '#fff',
                        padding: '2px 6px', borderRadius: '4px'
                      }}>
                        Tú
                      </span>
                    )}
                  </p>
                  <p className="ranking-email">{entry.email}</p>
                </div>

                <div className="ranking-points">{entry.points} pts</div>
              </div>
            ))
          )}

          <div style={{
            marginTop: '16px', padding: '10px 14px',
            background: 'rgba(108,99,255,0.05)',
            borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-muted)'
          }}>
            💡 El ranking incluye usuarios reales de Firebase + jugadores de la comunidad.
            Completa más misiones para subir posiciones.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RankingPage;
