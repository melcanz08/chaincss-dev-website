export default function Recipes() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Recipe System</h1>
        <p className="docs-description">
          Create variant-based component styles like CVA (Class Variance Authority)
        </p>
      </div>
      
      <h2>Basic Recipe</h2>
      <pre className="code-block">
        <code>{`import { recipe } from 'chaincss/react';

const button = recipe({
  base: 'px-4 py-2 rounded font-semibold',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      outline: 'border-2 border-blue-500 text-blue-500'
    },
    size: {
      sm: 'text-sm px-3 py-1',
      lg: 'text-lg px-6 py-3'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm'
  }
});

// Usage
<button className={button({ variant: 'secondary', size: 'lg' })}>
  Click me
</button>`}</code>
      </pre>
      
      <h2>Compound Variants</h2>
      <pre className="code-block">
        <code>{`const button = recipe({
  base: 'px-4 py-2 rounded',
  variants: {
    variant: { primary: 'bg-blue-500', danger: 'bg-red-500' },
    disabled: { true: 'opacity-50' }
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      className: 'bg-blue-300 cursor-not-allowed'
    }
  ]
});`}</code>
      </pre>
      
      <h2>With Atomic Optimization</h2>
      <p>Recipes automatically work with the atomic CSS optimizer when enabled.</p>
    </>
  );
}