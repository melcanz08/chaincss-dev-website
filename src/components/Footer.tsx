import { useState, useEffect } from 'react';
import { VERSION } from 'chaincss';
import { footer, footerText, footerLink } from '../styles/footer.chain.ts';

export default function Footer() {
  const [downloads, setDownloads] = useState<string>('...');

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-month/chaincss')
      .then(res => res.json())
      .then(data => {
        if (data.downloads) {
          setDownloads(data.downloads.toLocaleString());
        }
      })
      .catch(() => setDownloads('—'));
  }, []);

  return (
    <footer className={footer}>
      <p className={footerText}>
        ChainCSS v{VERSION} · {downloads} downloads/month ·{' '}
        <a href="https://github.com/melcanz08/chaincss" className={footerLink} target="_blank" rel="noopener">
          GitHub
        </a>
        {' · '}
        <a href="https://www.npmjs.com/package/chaincss" className={footerLink} target="_blank" rel="noopener">
          npm
        </a>
        {' · '}MIT License
      </p>
    </footer>
  );
}
