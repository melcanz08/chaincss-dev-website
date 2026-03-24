import { useState, useEffect } from 'react';
import { useChainStyles } from 'chaincss/react';
import { $ } from 'chaincss';
import { fetchStats } from '../../lib/stats';

interface StatsData {
  version: string;
  npmDownloads: number;
  githubStars: number;
  lastUpdated: string;
}

const Stats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = useChainStyles(() => ({
    container: $()
      .display('flex')
      .gap('1.5rem')
      .justifyContent('center')
      .flexWrap('wrap')
      .marginTop('2rem')
      .block(),
    
    statCard: $()
      .backgroundColor('rgba(255,255,255,0.1)')
      .backdropFilter('blur(10px)')
      .borderRadius('1rem')
      .padding('1rem 1.5rem')
      .textAlign('center')
      .minWidth('120px')
      .transition('all 0.3s')
      .hover()
        .transform('translateY(-2px)')
        .backgroundColor('rgba(255,255,255,0.2)')
      .end()
      .block(),
    
    statValue: $()
      .fontSize('1.5rem')
      .fontWeight('700')
      .color('white')
      .marginBottom('0.25rem')
      .block(),
    
    statLabel: $()
      .fontSize('0.75rem')
      .opacity('0.8')
      .color('white')
      .block()
  }), []);

  useEffect(() => {
    fetchStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>...</div>
          <div className={styles.statLabel}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>v{stats?.version}</div>
        <div className={styles.statLabel}>Latest Version</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{formatNumber(stats?.npmDownloads || 0)}</div>
        <div className={styles.statLabel}>npm downloads (30d)</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{formatNumber(stats?.githubStars || 0)}</div>
        <div className={styles.statLabel}>GitHub Stars</div>
      </div>
    </div>
  );
};

export default Stats;