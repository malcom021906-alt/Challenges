import React from 'react';
import type { Mission } from '../models/types';

interface MisionCardProps {
  mission: Mission;
  onClick?: () => void;
  index: number;
}

const MisionCard: React.FC<MisionCardProps> = ({ mission, onClick, index }) => {
  const statusLabel = {
    pending: 'Pendiente',
    completed: 'Completada',
    locked: 'Bloqueada 🔒',
  }[mission.status];

  return (
    <div
      className={`mission-card ${mission.status} animate-slide-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={mission.status !== 'locked' ? onClick : undefined}
      role={mission.status !== 'locked' ? 'button' : undefined}
      tabIndex={mission.status !== 'locked' ? 0 : -1}
      id={`mission-card-${mission.id}`}
    >
      <div className="mission-card-header">
        <div className="mission-icon">{mission.icon}</div>
        <div className="mission-info">
          <h3 className="mission-title">{mission.title}</h3>
          <p className="mission-desc">{mission.description}</p>
        </div>
      </div>

      <div className="mission-footer">
        <span className="mission-points">+{mission.points} pts</span>
        <span className={`mission-status-badge ${mission.status}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  );
};

export default MisionCard;
