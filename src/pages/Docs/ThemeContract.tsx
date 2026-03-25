export default function ThemeContract() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Theme Contracts</h1>
        <p className="docs-description">
          Ensure type-safe theming with contract validation
        </p>
      </div>

      <h2>What is a Theme Contract?</h2><br />
      <p>
        A theme contract defines the shape of your theme. It ensures that all your themes
        have the required tokens, preventing missing variables in production.
      </p><br />

      <h2>Defining a Contract</h2>
      <div className="code-block">
        <pre>{`import { defineThemeContract } from 'chaincss';

const themeContract = defineThemeContract({
  colors: {
    primary: 'string',
    secondary: 'string',
    background: 'string',
    text: 'string',
    accent: 'string'
  },
  spacing: {
    sm: 'string',
    md: 'string',
    lg: 'string',
    xl: 'string'
  },
  typography: {
    fontSize: {
      sm: 'string',
      base: 'string',
      lg: 'string'
    },
    fontWeight: {
      normal: 'string',
      bold: 'string'
    }
  }
});`}</pre>
      </div>

      <h2>Creating Themes with Contract</h2>
      <div className="code-block">
        <pre>{`import { createTheme } from 'chaincss';

//  Valid - matches contract
const lightTheme = createTheme(themeContract, {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#8b5cf6'
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem'
    },
    fontWeight: {
      normal: '400',
      bold: '700'
    }
  }
});

//  Invalid - missing 'secondary' and 'text'
const brokenTheme = createTheme(themeContract, {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff'
    // Missing secondary, text, accent!
  }
});`}</pre>
      </div>

      <h2>Build-Time Validation</h2>
      <div className="code-block">
        <pre>{`// chaincss.config.cjs
module.exports = {
  themes: {
    contract: './themes/contract.js',
    themes: [
      './themes/light.js',
      './themes/dark.js',
      './themes/high-contrast.js'
    ],
    validate: true  // Validate themes during build
  }
};`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Pro Tip:</strong> Theme contracts catch missing tokens at build time, not in production!
      </div>
    </>
  );
}