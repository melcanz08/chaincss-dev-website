import { useState, useEffect } from 'react';
import { useChainStyles } from 'chaincss/react';
import { $ } from 'chaincss';
import { fetchStats } from '../../lib/stats';

const StatsFooter = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  const styles = useChainStyles(() => ({
    container: $()
      .display('flex')
      .gap('1.5rem')
      .justifyContent('center')
      .padding('1rem')
      .borderTop('1px solid #e2e8f0')
      .backgroundColor('#f8fafc')
      .block(),
    
    stat: $()
      .fontSize('0.875rem')
      .color('#64748b')
      .block()
  }), []);

  if (!stats) return null;

  return (
    <div className={styles.container}>
      <span className={styles.stat}>v{stats.version}</span>
      <span className={styles.stat}>{stats.npmDownloads.toLocaleString()} downloads (30d)</span>
      <span className={styles.stat}>{stats.githubStars.toLocaleString()} stars</span>
    </div>
  );
};

export default StatsFooter;