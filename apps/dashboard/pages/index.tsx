import React, { useEffect, useState } from 'react';
import { ServiceList, Service } from '../components/ServiceList';
import styles from './index.module.css';

const initialServices: Service[] = [
  { name: 'Studio', url: 'http://localhost:3000' },
  { name: 'Sentient Developer', url: 'http://localhost:4001' },
  { name: 'Pathways', url: 'http://localhost:3001' },
  { name: 'Orchestrator', url: 'N/A (library)' },
  { name: 'Analyzer', url: 'N/A (library)' },
];

export default function Dashboard() {
  const [services, setServices] = useState<Service[]>(initialServices);

  // Example: Live status polling and log simulation (stub)
  useEffect(() => {
    // Simulate status and logs
    setTimeout(() => {
      setServices(s => s.map(service =>
        service.url.startsWith('http')
          ? {
              ...service,
              status: 'Online',
              logs: [
                `[${service.name}] Service started at 08:00:00`,
                `[${service.name}] Health check passed`,
                `[${service.name}] No errors detected`,
                `[${service.name}] Ready for requests`,
                `[${service.name}] Last request: 08:04:12`,
                `[${service.name}] Status: Online`,
              ],
            }
          : service
      ));
    }, 1000);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>OurSynth Platform Dashboard</h1>
      <p className={styles.description}>Monitor and launch all platform services from one place.</p>
      <ServiceList services={services} />
      <hr className={styles.divider} />
      <p className={styles.description}>More features coming soon: live service status, logs, orchestration results, and controls.</p>
    </main>
  );
}
