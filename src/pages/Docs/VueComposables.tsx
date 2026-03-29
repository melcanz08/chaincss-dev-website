import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function VueComposables() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Usage',
      description: 'Use useAtomicClasses composable in Vue components',
      code: `<script setup>
import { useAtomicClasses } from 'chaincss/vue';

// Define styles
const buttonStyles = {
  primary: $()
    .backgroundColor('#3b82f6')
    .color('white')
    .padding('12px 24px')
    .borderRadius('8px')
    .hover()
      .backgroundColor('#2563eb')
      .end()
    .block(),
  
  secondary: $()
    .backgroundColor('#6b7280')
    .color('white')
    .padding('12px 24px')
    .borderRadius('8px')
    .block()
};

// Use the composable
const { classes, cx, cn } = useAtomicClasses(buttonStyles);
</script>

<template>
  <button :class="classes.primary">
    Primary Button
  </button>
  <button :class="classes.secondary">
    Secondary Button
  </button>
  <!-- Using helper functions -->
  <button :class="cx('primary')">
    Alternative syntax
  </button>
  <button :class="cn('primary', 'secondary')">
    Combined classes
  </button>
</template>`
    },
    dynamic: {
      title: 'Dynamic Props',
      description: 'Create dynamic styles based on component props',
      code: `<script setup>
import { computed } from 'vue';
import { useAtomicClasses } from 'chaincss/vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'medium' }
});

// Dynamic styles based on props
const styles = computed(() => ({
  button: $()
    .padding(props.size === 'large' ? '16px 32px' : '8px 16px')
    .fontSize(props.size === 'large' ? '18px' : '14px')
    .backgroundColor(props.variant === 'primary' ? '#3b82f6' : '#6b7280')
    .color('white')
    .borderRadius('8px')
    .hover()
      .backgroundColor(props.variant === 'primary' ? '#2563eb' : '#4b5563')
      .end()
    .block()
}));

const { classes } = useAtomicClasses(styles);
</script>

<template>
  <button :class="classes.button">
    {{ variant }} Button ({{ size }})
  </button>
</template>`
    },
    reactive: {
      title: 'Reactive Theme with createTheme',
      description: 'Switch themes dynamically using the built-in theme system',
      code: `<script setup>
import { useAtomicClasses, createTheme } from 'chaincss/vue';

// Create a theme system with multiple themes
const themes = {
  light: {
    card: $()
      .backgroundColor('white')
      .color('#1e293b')
      .border('1px solid #e2e8f0')
      .borderRadius('12px')
      .padding('20px')
      .boxShadow('0 1px 3px rgba(0,0,0,0.1)')
      .block(),
    button: $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('8px 16px')
      .borderRadius('6px')
      .cursor('pointer')
      .hover()
        .backgroundColor('#2563eb')
        .end()
      .block()
  },
  dark: {
    card: $()
      .backgroundColor('#1e293b')
      .color('#f1f5f9')
      .border('1px solid #334155')
      .borderRadius('12px')
      .padding('20px')
      .boxShadow('0 1px 3px rgba(0,0,0,0.3)')
      .block(),
    button: $()
      .backgroundColor('#3b82f6')
      .color('white')
      .padding('8px 16px')
      .borderRadius('6px')
      .cursor('pointer')
      .hover()
        .backgroundColor('#60a5fa')
        .end()
      .block()
  },
  cyberpunk: {
    card: $()
      .backgroundColor('#0a0a0f')
      .color('#00ff9f')
      .border('2px solid #00ff9f')
      .borderRadius('12px')
      .padding('20px')
      .boxShadow('0 0 20px rgba(0,255,159,0.3)')
      .block(),
    button: $()
      .backgroundColor('#00ff9f')
      .color('#0a0a0f')
      .padding('8px 16px')
      .borderRadius('6px')
      .cursor('pointer')
      .fontWeight('bold')
      .hover()
        .backgroundColor('#00cc7f')
        .end()
      .block()
  }
};

const { currentTheme, themeStyles, setTheme, toggleTheme } = createTheme(themes);
const { classes } = useAtomicClasses(themeStyles);
</script>

<template>
  <div class="theme-demo">
    <div style="display: flex; gap: 12px; margin-bottom: 20px;">
      <button @click="toggleTheme" :class="classes.button">
        Toggle Theme (Current: {{ currentTheme }})
      </button>
      <button @click="setTheme('light')" :class="classes.button">
        Light
      </button>
      <button @click="setTheme('dark')" :class="classes.button">
        Dark
      </button>
      <button @click="setTheme('cyberpunk')" :class="classes.button">
        Cyberpunk
      </button>
    </div>
    <div :class="classes.card">
      <h3>Theme-aware Card</h3>
      <p>This card changes dynamically with the theme!</p>
      <p>Current theme: <strong>{{ currentTheme }}</strong></p>
    </div>
  </div>
</template>`
    },
    'styled-component': {
      title: 'Styled Components',
      description: 'Create reusable styled components with createStyledComponent',
      code: `<script setup>
import { createStyledComponent } from 'chaincss/vue';

// Create a styled button component
const StyledButton = createStyledComponent({
  button: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .fontWeight('600')
    .transition('all 0.2s')
    .cursor('pointer')
    .border('none')
    .block()
}, {
  name: 'StyledButton',
  props: {
    variant: String,
    size: String
  }
});

// Create a styled card component with dynamic styles
const Card = createStyledComponent((props) => ({
  card: $()
    .backgroundColor(props.elevated ? 'white' : '#f8fafc')
    .borderRadius('12px')
    .padding('20px')
    .boxShadow(props.elevated ? '0 4px 6px rgba(0,0,0,0.1)' : 'none')
    .border(props.outlined ? '1px solid #e2e8f0' : 'none')
    .block()
}), {
  name: 'Card',
  props: {
    elevated: Boolean,
    outlined: Boolean
  }
});
</script>

<template>
  <div style="display: flex; gap: 20px; flex-direction: column;">
    <StyledButton 
      as="button"
      style="background: #3b82f6; color: white;"
      @click="console.log('Clicked!')"
    >
      Styled Button
    </StyledButton>
    
    <Card :elevated="true">
      <h3>Elevated Card</h3>
      <p>This card has a shadow effect</p>
    </Card>
    
    <Card :outlined="true">
      <h3>Outlined Card</h3>
      <p>This card has a border</p>
    </Card>
  </div>
</template>`
    },
    global: {
      title: 'Global Styles',
      description: 'Inject global styles into your Vue app',
      code: `<script setup>
import { ChainCSSGlobal } from 'chaincss/vue';

// Global styles for the entire app
const globalStyles = {
  body: $()
    .fontFamily('system-ui, -apple-system, sans-serif')
    .backgroundColor('#f8fafc')
    .color('#1e293b')
    .margin('0')
    .padding('0')
    .lineHeight('1.5')
    .block(),
  
  '*': $()
    .boxSizing('border-box')
    .block(),
  
  'a': $()
    .color('#3b82f6')
    .textDecoration('none')
    .transition('color 0.2s')
    .hover()
      .textDecoration('underline')
      .color('#2563eb')
      .end()
    .block(),
  
  'h1, h2, h3': $()
    .marginTop('0')
    .block(),
  
  '.container': $()
    .maxWidth('1200px')
    .margin('0 auto')
    .padding('0 20px')
    .block()
};
</script>

<template>
  <ChainCSSGlobal :styles="globalStyles" :atomic="false" />
  <div class="container">
    <h1>My App</h1>
    <a href="#">Styled Link with Hover Effect</a>
  </div>
</template>`
    },
    composition: {
      title: 'Composition API',
      description: 'Compose multiple style sources and use advanced features',
      code: `<script setup>
import { computed, ref } from 'vue';
import { useAtomicClasses } from 'chaincss/vue';

// Base styles
const baseStyles = {
  button: $()
    .padding('12px 24px')
    .borderRadius('8px')
    .transition('all 0.2s')
    .cursor('pointer')
    .fontWeight('600')
    .border('none')
    .block()
};

// Variant styles
const variantStyles = {
  primary: $()
    .backgroundColor('#3b82f6')
    .color('white')
    .hover()
      .backgroundColor('#2563eb')
      .transform('translateY(-2px)')
      .end()
    .block(),
  
  secondary: $()
    .backgroundColor('#6b7280')
    .color('white')
    .hover()
      .backgroundColor('#4b5563')
      .end()
    .block(),
  
  danger: $()
    .backgroundColor('#ef4444')
    .color('white')
    .hover()
      .backgroundColor('#dc2626')
      .end()
    .block()
};

// Size styles
const sizeStyles = {
  small: $()
    .padding('6px 12px')
    .fontSize('12px')
    .block(),
  medium: $()
    .padding('10px 20px')
    .fontSize('14px')
    .block(),
  large: $()
    .padding('14px 28px')
    .fontSize('16px')
    .block()
};

// Disabled state
const disabledStyles = {
  disabled: $()
    .opacity('0.5')
    .cursor('not-allowed')
    .hover()
      .transform('none')
      .end()
    .block()
};

// Combine all styles
const allStyles = {
  ...baseStyles,
  ...variantStyles,
  ...sizeStyles,
  ...disabledStyles
};

const { classes, cn } = useAtomicClasses(allStyles);

// Reactive state
const currentVariant = ref('primary');
const currentSize = ref('medium');
const isDisabled = ref(false);

const buttonClasses = computed(() => {
  return cn('button', currentVariant.value, currentSize.value, isDisabled.value ? 'disabled' : '');
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; gap: 12px;">
      <button 
        :class="buttonClasses"
        :disabled="isDisabled"
        @click="console.log('Clicked!')"
      >
        {{ currentVariant }} Button ({{ currentSize }})
      </button>
    </div>
    
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button 
        v-for="variant in ['primary', 'secondary', 'danger']" 
        :key="variant"
        :class="cn('button', variant, currentSize)"
        @click="currentVariant = variant"
      >
        Set {{ variant }}
      </button>
    </div>
    
    <div style="display: flex; gap: 12px;">
      <button 
        v-for="size in ['small', 'medium', 'large']" 
        :key="size"
        :class="cn('button', currentVariant, size)"
        @click="currentSize = size"
      >
        {{ size }}
      </button>
    </div>
    
    <div>
      <label>
        <input type="checkbox" v-model="isDisabled" />
        Disabled
      </label>
    </div>
  </div>
</template>`
    }
  };
  
  const currentExample = examples[activeExample];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Vue Composables</h1>
        <p className="docs-description">
          Integrate ChainCSS seamlessly with Vue 3 using our composable functions.
        </p>
      </div>
      
      {/* Installation */}
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss
# or
yarn add chaincss
# or
pnpm add chaincss`} />
      
      <div className="tip">
        <strong>Vue 3 Required:</strong> ChainCSS Vue composables require Vue 3 with Composition API support.
      </div>
      
      {/* Examples Navigation */}
      <h2>Examples</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveExample('basic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'basic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'basic' ? '#eef2ff' : 'white',
            color: activeExample === 'basic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Basic Usage
        </button>
        <button
          onClick={() => setActiveExample('dynamic')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'dynamic' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'dynamic' ? '#eef2ff' : 'white',
            color: activeExample === 'dynamic' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Dynamic Props
        </button>
        <button
          onClick={() => setActiveExample('reactive')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'reactive' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'reactive' ? '#eef2ff' : 'white',
            color: activeExample === 'reactive' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Theme System
        </button>
        <button
          onClick={() => setActiveExample('styled-component')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'styled-component' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'styled-component' ? '#eef2ff' : 'white',
            color: activeExample === 'styled-component' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Styled Components
        </button>
        <button
          onClick={() => setActiveExample('global')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'global' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'global' ? '#eef2ff' : 'white',
            color: activeExample === 'global' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Global Styles
        </button>
        <button
          onClick={() => setActiveExample('composition')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeExample === 'composition' ? '2px solid #667eea' : '1px solid #e2e8f0',
            backgroundColor: activeExample === 'composition' ? '#eef2ff' : 'white',
            color: activeExample === 'composition' ? '#667eea' : '#475569',
            cursor: 'pointer'
          }}
        >
          Advanced Composition
        </button>
      </div>
      
      {/* Current Example Display */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="jsx" code={currentExample.code} />
      </div>
      
      {/* API Reference */}
      <h2>API Reference</h2>
      
      <h3>useAtomicClasses()</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">styles</code></td>
              <td style={{ padding: '12px' }}>Object | Ref | ComputedRef</td>
              <td style={{ padding: '12px' }}>Style definitions (can be reactive)</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`{ button: $().color('red').block() }`}</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">options</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Optional configuration {`{ atomic?: boolean, global?: boolean }`}</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`{ atomic: true }`}</code></td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: '12px' }}>
          <strong>Returns:</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0 }}>
            <li><code>classes</code> - Reactive object with all class names</li>
            <li><code>cx(name)</code> - Helper to get a specific class</li>
            <li><code>cn(...names)</code> - Helper to combine multiple classes</li>
          </ul>
        </div>
      </div>
      
      <h3>createTheme()</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">themes</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Theme definitions with style objects</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`{ light: {...}, dark: {...} }`}</code></td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: '12px' }}>
          <strong>Returns:</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0 }}>
            <li><code>currentTheme</code> - Ref with current theme name</li>
            <li><code>themeStyles</code> - ComputedRef with current theme styles</li>
            <li><code>setTheme(name)</code> - Function to switch themes</li>
            <li><code>toggleTheme()</code> - Function to cycle through themes</li>
          </ul>
        </div>
      </div>
      
      <h3>createStyledComponent()</h3>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Parameter</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">styles</code></td>
              <td style={{ padding: '12px' }}>Object | Function</td>
              <td style={{ padding: '12px' }}>Style definitions or function that returns styles</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`(props) => ({...})`}</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">options</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Component options (name, props, atomic)</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`{ name: 'Button', props: {...} }`}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <h3>ChainCSSGlobal Component</h3>
      <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Prop</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Example</th>
                </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">styles</code></td>
              <td style={{ padding: '12px' }}>Object</td>
              <td style={{ padding: '12px' }}>Global style definitions</td>
              <td style={{ padding: '12px' }}><code className="inline-code">{`{ body: $().margin('0').block() }`}</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}><code className="inline-code">atomic</code></td>
              <td style={{ padding: '12px' }}>boolean</td>
              <td style={{ padding: '12px' }}>Enable atomic CSS optimization</td>
              <td style={{ padding: '12px' }}><code className="inline-code">true</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* TypeScript Support */}
      <h2>TypeScript Support</h2>
      <p>ChainCSS Vue composables come with full TypeScript support:</p>
      <CodeBlock language="typescript" code={`// types.ts
import { $, useAtomicClasses, createTheme, createStyledComponent } from 'chaincss/vue';
import type { Ref, ComputedRef } from 'vue';

// Type-safe styles
interface ButtonStyles {
  button: any;
  primary: any;
}

const styles: ButtonStyles = {
  button: $().padding('12px').block(),
  primary: $().backgroundColor('blue').block()
};

const { classes } = useAtomicClasses<ButtonStyles>(styles);

// Type-safe theme system
interface ThemeStyles {
  card: any;
  button: any;
}

const themes = {
  light: { card: $().block(), button: $().block() },
  dark: { card: $().block(), button: $().block() }
} satisfies Record<string, ThemeStyles>;

const { currentTheme, themeStyles } = createTheme(themes);

// Type-safe styled component
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'large';
}

const StyledButton = createStyledComponent<ButtonProps>(
  (props) => ({
    button: $()
      .padding(props.size === 'large' ? '16px' : '8px')
      .backgroundColor(props.variant === 'primary' ? 'blue' : 'gray')
      .block()
  }),
  {
    name: 'StyledButton',
    props: {
      variant: { type: String, required: true },
      size: { type: String, default: 'medium' }
    }
  }
);`} />
      
      {/* Best Practices */}
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">computed()</code> for styles that depend on reactive props</li>
          <li>Extract reusable style constants outside components when possible</li>
          <li>Use <code className="inline-code">ChainCSSGlobal</code> for app-wide styles (once per app)</li>
          <li>Combine base styles with variants using object spread for cleaner code</li>
          <li>Use <code className="inline-code">createTheme()</code> for multi-theme applications</li>
          <li>Enable atomic CSS for better performance in production</li>
          <li>Use the <code className="inline-code">cn()</code> helper for conditional class composition</li>
        </ul>
      </div>
      
      {/* Performance Tips */}
      <div className="tip" style={{ backgroundColor: '#e0f2fe', borderLeftColor: '#3b82f6', marginBottom: '32px' }}>
        <strong>Performance Tips</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">computed()</code> to memoize styles and prevent unnecessary recalculations</li>
          <li>Extract static styles outside the component to avoid recreation on every render</li>
          <li>Enable atomic CSS in production for smaller bundle sizes</li>
          <li>Use <code className="inline-code">v-once</code> for static styles that never change</li>
          <li>Use <code className="inline-code">createStyledComponent</code> for reusable components to avoid re-renders</li>
          <li>Lazy load themes when using <code className="inline-code">createTheme</code> for better initial load time</li>
        </ul>
      </div>
      
      {/* Navigation 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '48px', 
        paddingTop: '24px', 
        borderTop: '1px solid #e2e8f0' 
      }}>
        <a href="/docs/react" style={{ color: '#667eea', textDecoration: 'none' }}>
          ← React Integration
        </a>
        <a href="/docs/nextjs" style={{ color: '#667eea', textDecoration: 'none' }}>
          Next.js Integration →
        </a>
      </div>*/}
    </>
  );
}