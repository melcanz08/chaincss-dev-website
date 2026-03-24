import { useChainStyles } from 'chaincss/react';
import { $ } from 'chaincss';
import { useNavigate } from 'react-router-dom';
import Stats from '../Stats/Stats';

const Hero = () => {
  const navigate = useNavigate();
  
  const styles = useChainStyles(() => ({
    primaryButton: $()
      .backgroundColor('white')
      .color('#667eea')
      .padding('0.875rem 2rem')
      .fontWeight('700')
      .borderRadius('9999px')
      .boxShadow('0 10px 15px -3px rgba(0,0,0,0.1)')
      .hover()
        .backgroundColor('#f1f5f9')
        .scale(1.05)
        .translateY('-2px')
      .end()
      .transition('all 0.2s ease')
      .cursor('pointer')
      .block(),
      
    secondaryButton: $()
      .backgroundColor('transparent')
      .color('white')
      .border('2px solid white')
      .padding('0.875rem 2rem')
      .fontWeight('600')
      .borderRadius('9999px')
      .hover()
        .backgroundColor('rgba(255,255,255,0.1)')
        .scale(1.05)
      .end()
      .transition('all 0.2s ease')
      .cursor('pointer')
      .block(),
  }), []);

  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">ChainCSS</h1>
        <p className="hero-subtitle">
          Chainable CSS-in-JS library for modern React applications
        </p>
        <div className="hero-button-group">
          <button className={styles.primaryButton} onClick={() => navigate('/playground')}>
            Try Playground
          </button>
          <a 
            href="https://github.com/melcanz08/chaincss" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            GitHub
          </a>
        </div>
        
        {/* Dynamic Stats Component */}
        <Stats />
        
        <div className="hero-badge">
          This entire website is styled with ChainCSS • MIT licensed • Actively maintained
        </div>
      </div>
    </section>
  );
};

export default Hero;