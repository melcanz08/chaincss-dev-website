import { useChainStyles } from 'chaincss/react';
import { useNavigate } from 'react-router-dom';
import Stats from '../Stats/Stats';
import { primaryButton, secondaryButton } from './hero.chain.js';

const Hero = () => {
  const navigate = useNavigate();
  
  // These are style objects from hero.chain.js
  const dynamicStyles = useChainStyles(() => ({
    primaryBtn: primaryButton,
    secondaryBtn: secondaryButton
  }), []);

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Chaincss</h1>
        <p className="hero-subtitle">
          Chainable CSS-in-JS library for modern React applications
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
        
        {/* Dynamic Stats Component */}
        <Stats />
        
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