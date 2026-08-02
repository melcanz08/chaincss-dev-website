// Color utilities for the Theme Graph Editor
// Runtime engine for live preview + ChainCSS token config export

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixColors(hex1: string, hex2: string, ratio: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return rgbToHex(
    r1 + (r2 - r1) * ratio,
    g1 + (g2 - g1) * ratio,
    b1 + (b2 - b1) * ratio,
  );
}

function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = luminance(hex1);
  const lum2 = luminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface ThemePalette {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string;
}

export interface SemanticTokens {
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  hover: string;
  focus: string;
  buttonBg: string;
  buttonText: string;
  dangerBg: string;
  dangerText: string;
  successBg: string;
  successText: string;
}

export interface ThemeReport {
  palette: ThemePalette;
  semantic: SemanticTokens;
  accessibility: {
    buttonContrast: number;
    textContrast: number;
    passesAA: boolean;
    passesAAA: boolean;
  };
}

// ChainCSS-compatible token config
export interface ChainCSSTokenConfig {
  tokens: {
    colors: Record<string, Record<string, string>>;
  };
  relationships: Array<{
    type: 'derived' | 'contrast';
    source?: string;
    target?: string;
    method?: string;
    foreground?: string;
    background?: string;
    targetRatio?: number;
  }>;
}

export function generatePalette(hex500: string): ThemePalette {
  return {
    50:  mixColors(hex500, '#ffffff', 0.9),
    100: mixColors(hex500, '#ffffff', 0.75),
    200: mixColors(hex500, '#ffffff', 0.5),
    300: mixColors(hex500, '#ffffff', 0.25),
    400: mixColors(hex500, '#ffffff', 0.1),
    500: hex500,
    600: mixColors(hex500, '#000000', 0.15),
    700: mixColors(hex500, '#000000', 0.35),
    800: mixColors(hex500, '#000000', 0.55),
    900: mixColors(hex500, '#000000', 0.75),
  };
}

export function generateSemanticTokens(palette: ThemePalette, isDark: boolean = false): SemanticTokens {
  if (isDark) {
    return {
      surface: palette[900],
      textPrimary: palette[50],
      textSecondary: palette[300],
      border: palette[700],
      hover: palette[700],
      focus: palette[400],
      buttonBg: palette[500],
      buttonText: '#ffffff',
      dangerBg: '#dc2626',
      dangerText: '#ffffff',
      successBg: '#16a34a',
      successText: '#ffffff',
    };
  }
  return {
    surface: palette[50],
    textPrimary: palette[900],
    textSecondary: palette[600],
    border: palette[200],
    hover: palette[100],
    focus: palette[400],
    buttonBg: palette[500],
    buttonText: '#ffffff',
    dangerBg: '#dc2626',
    dangerText: '#ffffff',
    successBg: '#16a34a',
    successText: '#ffffff',
  };
}

export function checkAccessibility(fg: string, bg: string) {
  const ratio = contrastRatio(fg, bg);
  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
}

export function extractDominantColor(imageData: ImageData): string {
  let r = 0, g = 0, b = 0;
  const count = imageData.data.length / 4;
  for (let i = 0; i < imageData.data.length; i += 4) {
    r += imageData.data[i];
    g += imageData.data[i + 1];
    b += imageData.data[i + 2];
  }
  return rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
}

export function generateTheme(primaryColor: string, isDark: boolean = false): ThemeReport {
  const palette = generatePalette(primaryColor);
  const semantic = generateSemanticTokens(palette, isDark);
  const buttonContrast = checkAccessibility(semantic.buttonText, semantic.buttonBg);
  const textContrast = checkAccessibility(semantic.textPrimary, semantic.surface);
  return {
    palette,
    semantic,
    accessibility: {
      buttonContrast: buttonContrast.ratio,
      textContrast: textContrast.ratio,
      passesAA: buttonContrast.passesAA && textContrast.passesAA,
      passesAAA: buttonContrast.passesAAA && textContrast.passesAAA,
    },
  };
}

// Generate a ChainCSS-compatible token config from a theme
export function generateChainCSSConfig(primaryColor: string, themeName: string = 'custom'): ChainCSSTokenConfig {
  const palette = generatePalette(primaryColor);
  const isDark = luminance(primaryColor) < 0.3;

  // Build color tokens
  const colors: Record<string, Record<string, string>> = {
    primary: {},
    neutral: {},
    surface: {},
    text: {},
  };

  // Primary scale (50-900)
  for (const [key, value] of Object.entries(palette)) {
    colors.primary[key] = value;
  }

  // Neutral scale (derived from primary, desaturated)
  colors.neutral = {
    50:  mixColors(palette[50], '#808080', 0.3),
    100: mixColors(palette[100], '#808080', 0.3),
    200: mixColors(palette[200], '#808080', 0.3),
    300: mixColors(palette[300], '#808080', 0.3),
    400: mixColors(palette[400], '#808080', 0.3),
    500: mixColors(palette[500], '#808080', 0.3),
    600: mixColors(palette[600], '#808080', 0.3),
    700: mixColors(palette[700], '#808080', 0.3),
    800: mixColors(palette[800], '#808080', 0.3),
    900: mixColors(palette[900], '#808080', 0.3),
  };

  // Surface tokens
  if (isDark) {
    colors.surface = {
      page: palette[900],
      card: palette[800],
      overlay: palette[800],
      border: palette[700],
    };
    colors.text = {
      primary: palette[50],
      secondary: palette[300],
      muted: palette[500],
      onPrimary: '#ffffff',
    };
  } else {
    colors.surface = {
      page: '#ffffff',
      card: palette[50],
      overlay: palette[100],
      border: palette[200],
    };
    colors.text = {
      primary: palette[900],
      secondary: palette[600],
      muted: palette[400],
      onPrimary: '#ffffff',
    };
  }

  // Build relationships
  const relationships: ChainCSSTokenConfig['relationships'] = [];

  // Derived relationships (primary shades)
  const shadeMap: Record<string, string> = {
    '50': 'mix-white 90%',
    '100': 'mix-white 75%',
    '200': 'mix-white 50%',
    '300': 'mix-white 25%',
    '400': 'mix-white 10%',
    '600': 'mix-black 15%',
    '700': 'mix-black 35%',
    '800': 'mix-black 55%',
    '900': 'mix-black 75%',
  };

  for (const [shade, method] of Object.entries(shadeMap)) {
    relationships.push({
      type: 'derived',
      source: `primary.500`,
      target: `primary.${shade}`,
      method: method as any,
    });
  }

  // Contrast relationships
  relationships.push({
    type: 'contrast',
    foreground: 'text.onPrimary',
    background: `primary.500`,
  });

  relationships.push({
    type: 'contrast',
    foreground: 'text.primary',
    background: 'surface.page',
  });

  return {
    tokens: { colors },
    relationships,
  };
}
