import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-container" id="progress-bar-container">
      <div className="progress-label">
        <span>{completed} / {total} misiones</span>
        <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{pct}%</span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
