import { VERSION } from 'chaincss';
import { footer, footerText, footerLink } from '../styles/footer.chain.ts';

export default function Footer() {
  return (
    <footer className={footer}>
      <p className={footerText}>
        ChainCSS v{VERSION} ·{' '}
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
