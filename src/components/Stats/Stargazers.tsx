import { useState, useEffect } from 'react';
import { $, useChainStyles } from '@melcanz85/chaincss';

interface Stargazer {
  login: string;
  avatar_url: string;
  html_url: string;
  starred_at?: string;
}

const Stargazers = () => {
  const [stargazers, setStargazers] = useState<Stargazer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const styles = useChainStyles(() => ({
    container: $()
      .display('flex')
      .flexDirection('column')
      .alignItems('center')
      .padding('2rem 1.5rem')
      .backgroundColor('#f8fafc')
      .borderTop('1px solid #e2e8f0')
      .block(),
    
    title: $()
      .fontSize('1rem')
      .fontWeight('600')
      .color('#1e293b')
      .marginBottom('1rem')
      .block(),
    
    avatarContainer: $()
      .display('flex')
      .gap('0.75rem')
      .flexWrap('wrap')
      .justifyContent('center')
      .block(),
    
    avatar: $()
      .width('40px')
      .height('40px')
      .borderRadius('50%')
      .transition('all 0.2s')
      .hover()
        .transform('scale(1.1)')
        .boxShadow('0 4px 6px -1px rgba(0,0,0,0.1)')
      .end()
      .block(),
    
    link: $()
      .textDecoration('none')
      .block(),
    
    loadingText: $()
      .fontSize('0.875rem')
      .color('#64748b')
      .block(),
    
    errorText: $()
      .fontSize('0.875rem')
      .color('#dc2626')
      .block()
  }), []);

  useEffect(() => {
    const fetchStargazers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/repos/melcanz08/chaincss/stargazers');
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setStargazers(data.slice(0, 12)); // Show only the 12 most recent
        setError(null);
      } catch (err) {
        console.error('Failed to fetch stargazers:', err);
        setError('Unable to load stargazers');
      } finally {
        setLoading(false);
      }
    };

    fetchStargazers();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>✨ Recent Supporters</div>
        <div className={styles.loadingText}>Loading stargazers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>✨ Recent Supporters</div>
        <div className={styles.errorText}>{error}</div>
      </div>
    );
  }

  if (stargazers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>✨ Be the first to star ChainCSS on GitHub!</div>
        <a
          href="https://github.com/melcanz08/chaincss"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#667eea',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '0.875rem'
          }}
        >
          ⭐ Star on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        ✨ {stargazers.length} {stargazers.length === 1 ? 'Supporter' : 'Supporters'} ❤️
      </div>
      <div className={styles.avatarContainer}>
        {stargazers.map((user) => (
          <a
            key={user.login}
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            title={`${user.login} starred ChainCSS`}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className={styles.avatar}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Stargazers;