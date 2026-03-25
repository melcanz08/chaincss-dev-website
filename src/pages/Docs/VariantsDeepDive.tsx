export default function VariantsDeepDive() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Advanced Variants</h1>
        <p className="docs-description">
          Master the recipe system with compound variants, nested variants, and dynamic variant selection
        </p>
      </div>

      <h2>Compound Variants</h2>
      <p>
        Compound variants apply styles when multiple variant conditions are met simultaneously.
      </p>
      <div className="code-block">
        <pre>{`const button = recipe({
  base: $().padding('8px 16px').borderRadius('4px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('blue').color('white').block(),
      danger: $().backgroundColor('red').color('white').block()
    },
    size: {
      sm: $().padding('4px 8px').fontSize('12px').block(),
      lg: $().padding('12px 24px').fontSize('16px').block()
    },
    fullWidth: {
      true: $().width('100%').block()
    }
  },
  compoundVariants: [
    {
      variants: { color: 'primary', size: 'lg' },
      style: $()
        .fontWeight('bold')
        .textTransform('uppercase')
        .letterSpacing('1px')
        .block()
    },
    {
      variants: { color: 'danger', size: 'lg', fullWidth: 'true' },
      style: $()
        .boxShadow('0 4px 12px rgba(239, 68, 68, 0.3)')
        .borderRadius('8px')
        .block()
    }
  ]
});`}</pre>
      </div>

      <h2>Nested Variants (Variant Groups)</h2>
      <div className="code-block">
        <pre>{`const card = recipe({
  base: $()
    .backgroundColor('white')
    .borderRadius('12px')
    .overflow('hidden')
    .boxShadow('0 4px 6px rgba(0,0,0,0.1)')
    .block(),
  
  variants: {
    variant: {
      elevated: $()
        .boxShadow('0 20px 25px -5px rgba(0,0,0,0.2)')
        .hover()
          .transform('translateY(-4px)')
          .end()
        .block(),
      
      outline: $()
        .border('2px solid #e5e7eb')
        .boxShadow('none')
        .block(),
      
      ghost: $()
        .backgroundColor('transparent')
        .boxShadow('none')
        .hover()
          .backgroundColor('rgba(0,0,0,0.02)')
          .end()
        .block()
    },
    interactive: {
      true: $()
        .cursor('pointer')
        .transition('all 0.3s')
        .hover()
          .transform('translateY(-2px)')
          .boxShadow('0 10px 20px rgba(0,0,0,0.15)')
          .end()
        .block()
    }
  }
});`}</pre>
      </div>

      <h2>Dynamic Variant Selection</h2>
      <div className="code-block">
        <pre>{`function Button({ variant, size, customStyles }) {
  // Dynamic variant combination
  const baseClass = button({ variant, size });
  
  // Merge with custom styles
  const finalStyles = useChainStyles(() => ({
    custom: customStyles
  }), [customStyles]);
  
  return <button className={\`\${baseClass} \${finalStyles.custom}\`} />;
}`}</pre>
      </div>

      <h2>Variant Composition</h2>
      <div className="code-block">
        <pre>{`// Compose variants from existing recipes
const baseButton = recipe({
  base: $().padding('8px 16px').borderRadius('4px').block(),
  variants: {
    color: {
      primary: $().backgroundColor('blue').block(),
      secondary: $().backgroundColor('gray').block()
    }
  }
});

const iconButton = recipe({
  base: $()
    .extend(baseButton.base)  // hypothetical extend method
    .display('inline-flex')
    .gap('8px')
    .block(),
  variants: {
    ...baseButton.variants,
    iconPosition: {
      left: $().flexDirection('row').block(),
      right: $().flexDirection('row-reverse').block()
    }
  }
});`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Pro Tip:</strong> Use compound variants for complex UI states like "disabled" + "primary" + "large".
      </div>
    </>
  );
}