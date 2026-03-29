import { useChainStyles } from 'chaincss/react';
import { useNavigate } from 'react-router-dom';
import { primaryButton, secondaryButton } from './hero.runt';

const Hero = () => {
  const navigate = useNavigate();
  
  const dynamicStyles = useChainStyles(() => ({
    primaryBtn: primaryButton,
    secondaryBtn: secondaryButton
  }), []);

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">ChainCSS</h1>
        <p className="hero-subtitle">
          The JavaScript-native styling engine for the modern web
        </p>
        <div className="hero-button-group">
          <button className={dynamicStyles.primaryBtn} onClick={() => navigate('/playground')}>
            Try Playground
          </button>
          <a 
            href="https://github.com/melcanz08/chaincss" 
            target="_blank" 
            rel="noopener noreferrer"
            className={dynamicStyles.secondaryBtn}
          >
            GitHub
          </a>
        </div>
        
        <div className="hero-badge">
          This entire website is styled with ChainCSS check <a 
            href="https://github.com/melcanz08/chaincss-dev-website" 
            target="_blank" style={{ color: 'white'}}>here</a> • MIT licensed • Actively maintained
        </div>
      </div>
    </section>
  );
};

export default Hero;