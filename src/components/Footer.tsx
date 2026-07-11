import { useState, useEffect } from 'react';
import { VERSION } from 'chaincss';
import { footer, footerRow, footerText, footerLink, footerStat } from '../styles/footer.chain.ts';

export default function Footer() {
  const [downloads, setDownloads] = useState<string>('...');

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/2018-01-01:3000-01-01/chaincss')
      .then(res => res.json())
      .then(data => {
        if (data.downloads) setDownloads(data.downloads.toLocaleString());
      })
      .catch(() => setDownloads('—'));
  }, []);

  return (
    <footer className={footer}>
      <div className={footerText}>
        <strong style={{ color: '#a1a1aa' }}>ChainCSS v{VERSION}</strong>
        <span> — Compile TypeScript to zero-runtime CSS</span>
      </div>

      <div className={footerRow}>
        <span className={footerStat}>📦 {downloads} downloads</span>
        <a href="https://github.com/melcanz08/chaincss" className={footerLink} target="_blank" rel="noopener">
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/chaincss" className={footerLink} target="_blank" rel="noopener">
          npm
        </a>
        <a href="https://www.chaincss.dev/docs" className={footerLink}>
          Docs
        </a>
      </div>

      <div className={footerText}>
        MIT License • Built by{' '}
        <a href="mailto:rec0608m@gmail.com" style={{ color: '#818cf8', textDecoration: 'none' }}>
          Rommel Caneos
        </a>
      </div>
    </footer>
  );
}
