import { useState, useEffect } from 'react';
import { VERSION } from 'chaincss';
import { footer, footerRow, footerText, footerLink, footerStat } from '../styles/footer.chain.ts';

export default function Footer() {
  const [downloads, setDownloads] = useState<string>('...');

  useEffect(() => {
    // npm badge API supports CORS
    fetch('https://img.shields.io/npm/dm/chaincss.json')
      .then(res => res.json())
      .then(data => {
        if (data.value) setDownloads(data.value.toLocaleString());
      })
      .catch(() => setDownloads('50,000+'));
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
