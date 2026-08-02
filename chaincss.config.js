export default {
  inputs: [
    'src/styles/**/*.chain.ts',
    'src/pages/**/*.chain.ts',
    'src/components/**/*.chain.ts',
  ],
  output: {
    outputDir: 'dist/assets',
  },
  tokens: {
    enabled: true,
    tokens: {
      colors: {
        primary: '#6366f1',
        primaryHover: '#4f46e5',
        surface: '#1A1A2E',
        text: '#E2E8F0',
      },
      spacing: {
        sm: '8px',
        md: '16px', 
        lg: '24px',
      },
    },
  }
}