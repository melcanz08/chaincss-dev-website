import { useState } from 'react';
import CodeBlock from '../../components/CodeBlock';

export default function VueComposables() {
  const [activeExample, setActiveExample] = useState('basic');
  
  const examples = {
    basic: {
      title: 'Basic Usage',
      description: 'Use useAtomicClasses composable in Vue components',
      code: `<script setup>
import { useAtomicClasses } from 'chaincss/runtime/vue';

const buttonStyles = {
  primary: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    hover: {
      backgroundColor: '#2563eb'
    }
  },
  secondary: {
    backgroundColor: '#6b7280',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px'
  }
};

const { classes, cx, cn } = useAtomicClasses(buttonStyles);
</script>

<template>
  <button :class="classes.primary">Primary Button</button>
  <button :class="classes.secondary">Secondary Button</button>
  <button :class="cx('primary')">Alternative syntax</button>
  <button :class="cn('primary', 'secondary')">Combined classes</button>
</template>`
    },
    dynamic: {
      title: 'Dynamic Props',
      description: 'Create dynamic styles based on component props',
      code: `<script setup>
import { computed } from 'vue';
import { useAtomicClasses } from 'chaincss/runtime/vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'medium' }
});

const styles = computed(() => ({
  button: {
    padding: props.size === 'large' ? '16px 32px' : '8px 16px',
    fontSize: props.size === 'large' ? '18px' : '14px',
    backgroundColor: props.variant === 'primary' ? '#3b82f6' : '#6b7280',
    color: 'white',
    borderRadius: '8px',
    hover: {
      backgroundColor: props.variant === 'primary' ? '#2563eb' : '#4b5563'
    }
  }
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
import { ref, computed } from 'vue';
import { useAtomicClasses } from 'chaincss/runtime/vue';

const themes = {
  light: {
    card: {
      backgroundColor: 'white',
      color: '#1e293b',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      hover: { backgroundColor: '#2563eb' }
    }
  },
  dark: {
    card: {
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
      border: '1px solid #334155',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      hover: { backgroundColor: '#60a5fa' }
    }
  }
};

const currentTheme = ref('light');
const themeStyles = computed(() => themes[currentTheme.value]);
const { classes } = useAtomicClasses(themeStyles);

const setTheme = (theme) => { currentTheme.value = theme; };
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
};
</script>

<template>
  <div>
    <div style="display: flex; gap: 12px; margin-bottom: 20px;">
      <button @click="toggleTheme" :class="classes.button">
        Toggle Theme (Current: {{ currentTheme }})
      </button>
      <button @click="setTheme('light')" :class="classes.button">Light</button>
      <button @click="setTheme('dark')" :class="classes.button">Dark</button>
    </div>
    <div :class="classes.card">
      <h3>Theme-aware Card</h3>
      <p>This card changes dynamically with the theme</p>
      <p>Current theme: <strong>{{ currentTheme }}</strong></p>
    </div>
  </div>
</template>`
    },
    global: {
      title: 'Global Styles',
      description: 'Inject global styles into your Vue app',
      code: `<script setup>
import { ChainCSSGlobal } from 'chaincss/runtime/vue';

const globalStyles = {
  body: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    margin: '0',
    padding: '0',
    lineHeight: '1.5'
  },
  '*': { boxSizing: 'border-box' },
  a: {
    color: '#3b82f6',
    textDecoration: 'none',
    transition: 'color 0.2s',
    hover: { textDecoration: 'underline', color: '#2563eb' }
  },
  '.container': {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  }
};
</script>

<template>
  <ChainCSSGlobal :styles="globalStyles" />
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
import { useAtomicClasses } from 'chaincss/runtime/vue';

const baseStyles = {
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    fontWeight: '600',
    border: 'none'
  }
};

const variantStyles = {
  primary: {
    backgroundColor: '#3b82f6',
    color: 'white',
    hover: { backgroundColor: '#2563eb', transform: 'translateY(-2px)' }
  },
  secondary: {
    backgroundColor: '#6b7280',
    color: 'white',
    hover: { backgroundColor: '#4b5563' }
  },
  danger: {
    backgroundColor: '#ef4444',
    color: 'white',
    hover: { backgroundColor: '#dc2626' }
  }
};

const sizeStyles = {
  small: { padding: '6px 12px', fontSize: '12px' },
  medium: { padding: '10px 20px', fontSize: '14px' },
  large: { padding: '14px 28px', fontSize: '16px' }
};

const disabledStyles = {
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    hover: { transform: 'none' }
  }
};

const allStyles = { ...baseStyles, ...variantStyles, ...sizeStyles, ...disabledStyles };

const { classes, cn } = useAtomicClasses(allStyles);

const currentVariant = ref('primary');
const currentSize = ref('medium');
const isDisabled = ref(false);

const buttonClasses = computed(() => {
  return cn('button', currentVariant.value, currentSize.value, isDisabled.value ? 'disabled' : '');
});
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <button 
      :class="buttonClasses"
      :disabled="isDisabled"
      @click="console.log('Clicked!')"
    >
      {{ currentVariant }} Button ({{ currentSize }})
    </button>
    
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
  
  const currentExample = examples[activeExample as keyof typeof examples];
  
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Vue Composables</h1>
        <p className="docs-description">
          Integrate ChainCSS seamlessly with Vue 3 using our composable functions.
        </p>
      </div>
      
      <h2>Installation</h2>
      <CodeBlock language="bash" code={`npm install chaincss`} />
      
      <div className="tip">
        <strong>Vue 3 Required:</strong> ChainCSS Vue composables require Vue 3 with Composition API support.
      </div>
      
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
      
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          {currentExample.title}
        </h3>
        <p style={{ marginBottom: '16px', color: '#64748b' }}>
          {currentExample.description}
        </p>
        <CodeBlock language="jsx" code={currentExample.code} />
      </div>
      
      <h2>API Reference</h2>
      
      <h3>useAtomicClasses()</h3>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 1fr 200px', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Parameter</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
            <div style={{ padding: '12px' }}>Example</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 1fr 200px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">styles</code></div>
            <div style={{ padding: '12px' }}>Object</div>
            <div style={{ padding: '12px' }}>Style definitions</div>
            <div style={{ padding: '12px' }}><code className="inline-code">{`{ button: {...} }`}</code></div>
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <strong>Returns:</strong>
          <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
            <li><code>classes</code> - Reactive object with all class names</li>
            <li><code>cx(name)</code> - Helper to get a specific class</li>
            <li><code>cn(...names)</code> - Helper to combine multiple classes</li>
          </ul>
        </div>
      </div>
      
      <h3>ChainCSSGlobal Component</h3>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'grid', gap: '1px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 1fr 200px', backgroundColor: '#f8fafc', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>
            <div style={{ padding: '12px' }}>Prop</div>
            <div style={{ padding: '12px' }}>Type</div>
            <div style={{ padding: '12px' }}>Description</div>
            <div style={{ padding: '12px' }}>Example</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '150px 100px 1fr 200px', backgroundColor: 'white' }}>
            <div style={{ padding: '12px' }}><code className="inline-code">styles</code></div>
            <div style={{ padding: '12px' }}>Object</div>
            <div style={{ padding: '12px' }}>Global style definitions</div>
            <div style={{ padding: '12px' }}><code className="inline-code">{`{ body: {...} }`}</code></div>
          </div>
        </div>
      </div>
      
      <div className="note">
        <strong>Best Practices</strong>
        <ul style={{ marginTop: '8px', marginBottom: 0, paddingLeft: '20px' }}>
          <li>Use <code className="inline-code">computed()</code> for styles that depend on reactive props</li>
          <li>Extract reusable style constants outside components when possible</li>
          <li>Use <code className="inline-code">ChainCSSGlobal</code> for app-wide styles (once per app)</li>
          <li>Combine base styles with variants using object spread for cleaner code</li>
          <li>Use the <code className="inline-code">cn()</code> helper for conditional class composition</li>
        </ul>
      </div>
    </>
  );
}