
import React, { useState } from 'react';
import styles from './ServiceList.module.css';

export interface Service {
  name: string;
  url: string;
  status?: string;
  logs?: string[];
}

export const ServiceList: React.FC<{ services: Service[] }> = ({ services }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const orchestrate = async (action: 'start' | 'stop' | 'restart', service: Service) => {
    setLoading(service.name + action);
    setFeedback(f => ({ ...f, [service.name]: '' }));
    try {
      const res = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'valid-token' },
        body: JSON.stringify({ action, name: service.name }),
      });
      const data = await res.json();
      setFeedback(f => ({ ...f, [service.name]: data.result || data.error }));
    } catch (err) {
      setFeedback(f => ({ ...f, [service.name]: 'Orchestration failed.' }));
    } finally {
      setLoading(null);
    }
  };
  const handleStart = (service: Service) => orchestrate('start', service);
  const handleStop = (service: Service) => orchestrate('stop', service);
  const handleRestart = (service: Service) => orchestrate('restart', service);

  return (
    <ul className={styles.list}>
      {services.map(service => (
        <li key={service.name} className={styles.item}>
          <div className={styles.header}>
            <span className={styles.name}>{service.name}</span>
            {service.url.startsWith('http') ? (
              <a href={service.url} target="_blank" rel="noopener" className={styles.link}>
                Open
              </a>
            ) : (
              <span className={styles.library}>Library</span>
            )}
            {service.status && (
              <span className={styles.status} data-status={service.status}>
                {service.status}
              </span>
            )}
          </div>
          {service.logs && service.logs.length > 0 && (
            <details className={styles.logs}>
              <summary>Logs</summary>
              <pre>
                {service.logs.slice(-10).join('\n')}
              </pre>
            </details>
          )}
          <div className={styles.controls}>
            <button onClick={() => handleStart(service)} className={styles.controlBtn} disabled={!!loading}>
              {loading === service.name + 'start' ? 'Starting...' : 'Start'}
            </button>
            <button onClick={() => handleStop(service)} className={styles.controlBtn} disabled={!!loading}>
              {loading === service.name + 'stop' ? 'Stopping...' : 'Stop'}
            </button>
            <button onClick={() => handleRestart(service)} className={styles.controlBtn} disabled={!!loading}>
              {loading === service.name + 'restart' ? 'Restarting...' : 'Restart'}
            </button>
          </div>
          {feedback[service.name] && (
            <div className={styles.feedback}>{feedback[service.name]}</div>
          )}
        </li>
      ))}
    </ul>
  );
};
