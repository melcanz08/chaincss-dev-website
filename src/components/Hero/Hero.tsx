// Hero.tsx - ChainCSS v2 (zero-runtime)
import { useNavigate } from 'react-router-dom';
import { 
  hero,
  container,
  title,
  subtitle,
  buttonGroup,
  primaryBtn,
  secondaryBtn,
  badge
} from './styles/hero.class.js';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={hero}>
      <div className={container}>
        <h1 className={title}>ChainCSS</h1>
        <p className={subtitle}>
          The JavaScript-native styling engine for the modern web
        </p>
        <div className={buttonGroup}>
          <button className={primaryBtn} onClick={() => navigate('/playground')}>
            Try Playground
          </button>
          <a 
            href="https://github.com/melcanz08/chaincss" 
            target="_blank" 
            rel="noopener noreferrer"
            className={secondaryBtn}
          >
            GitHub
          </a>
        </div>
        
        <div className={badge}>
          This entire website is styled with ChainCSS check <a 
            href="https://github.com/melcanz08/chaincss-dev-website" 
            target="_blank" style={{ color: 'white'}}>here</a> • MIT licensed • Actively maintained
        </div>
      </div>
    </section>
  );
};

export default Hero;