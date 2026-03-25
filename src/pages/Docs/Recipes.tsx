export default function Recipes() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Recipe System</h1>
        <p className="docs-description">
          Create variant-rich components with ease
        </p>
      </div>

      <h2>What is a Recipe?</h2><br />
      <p>
        The <code className="inline-code">recipe()</code> function lets you define components with variants,
        similar to CVA (Class Variance Authority). It's perfect for design systems and component libraries.
      </p><br />

      <h2>Basic Recipe</h2>
      <div className="code-block">
        <pre>{`import { recipe } from 'chaincss';

const button = recipe({
  base: $()
    .display('inline-flex')
    .alignItems('center')
    .justifyContent('center')
    .padding('8px 16px')
    .fontSize('14px')
    .fontWeight('500')
    .borderRadius('6px')
    .transition('all 0.2s')
    .cursor('pointer')
    .border('none')
    .block(),
  
  variants: {
    color: {
      primary: $()
        .backgroundColor('#3b82f6')
        .color('white')
        .hover()
          .backgroundColor('#2563eb')
          .scale(1.05)
          .end()
        .block(),
      
      secondary: $()
        .backgroundColor('#6b7280')
        .color('white')
        .hover()
          .backgroundColor('#4b5563')
          .scale(1.05)
          .end()
        .block()
    },
    
    size: {
      sm: $().padding('4px 8px').fontSize('12px').block(),
      md: $().padding('8px 16px').fontSize('14px').block(),
      lg: $().padding('12px 24px').fontSize('16px').block()
    }
  },
  
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});`}</pre>
      </div>

      <h2>Using a Recipe</h2>
      <div className="code-block">
        <pre>{`function Button({ color, size, children }) {
  const className = button({ color, size });
  return <button className={className}>{children}</button>;
}

// Usage
<Button color="primary" size="lg">Click Me</Button>
<Button color="secondary" size="sm">Cancel</Button>`}</pre>
      </div>

      <h2>Compound Variants</h2>
      <p>
        Compound variants apply styles when multiple conditions are met:
      </p>
      <div className="code-block">
        <pre>{`const button = recipe({
  // ... base and variants ...
  
  compoundVariants: [
    {
      variants: { color: 'primary', size: 'lg' },
      style: $()
        .fontWeight('bold')
        .textTransform('uppercase')
        .block()
    },
    {
      variants: { color: 'danger', size: 'lg' },
      style: $()
        .boxShadow('0 4px 6px rgba(0,0,0,0.1)')
        .block()
    }
  ]
});`}</pre>
      </div>

      <h2>Pre-compile All Variants</h2>
      <p>
        For production, you can pre-compile all variant combinations to CSS:
      </p>
      <div className="code-block">
        <pre>{`// At build time
button.compileAll();

// All variant styles are now in your CSS bundle`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Pro Tip:</strong> Recipes are type-safe! Your IDE will autocomplete variants.
      </div>
    </>
  );
}