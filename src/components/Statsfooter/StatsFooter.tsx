// src/components/Stats/StatsFooter.tsx
import { useState, useEffect } from 'react';
import { fetchStats } from '../../lib/stats';
import { 
  statsContainer, 
  statsStat 
} from './styles/statsFooter.class.js';

const StatsFooter = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className={statsContainer}>
      <span className={statsStat}>v{stats.version}</span>
      <span className={statsStat}>{stats.npmDownloads.toLocaleString()} downloads (30d)</span>
      <span className={statsStat}>{stats.githubStars.toLocaleString()} stars</span>
    </div>
  );
};

export default StatsFooter;