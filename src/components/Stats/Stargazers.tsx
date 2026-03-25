import { $ } from 'chaincss';
import { useChainStyles } from 'chaincss/react';
import { useEffect, useState } from 'react';
import {_container,_title,_avatarContainer,_avatar,_link,_loadingText,_errorText } from './stargazers.chain';

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
    container: _container,
    title: _title,
    avatarContainer: _avatarContainer,
    avatar: _avatar,
    link: _link,
    loadingText: _loadingText,
    errorText: _errorText
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
        <div className={styles.title}>Recent Supporters</div>
        <div className={styles.loadingText}>Loading stargazers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Recent Supporters</div>
        <div className={styles.errorText}>{error}</div>
      </div>
    );
  }

  if (stargazers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>Be the first to star ChainCSS on GitHub!</div>
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
          Star on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {stargazers.length} {stargazers.length === 1 ? 'Supporter' : 'Supporters'} 
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