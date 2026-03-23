import { $, recipe, createTokens, responsive, run, compile, configureAtomic, atomicOptimizer, chain } from '@melcanz85/chaincss';

console.log('\n🔬 ChainCSS Node Test Suite (build-time only)\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (err) {
    console.log(`❌ ${name}: ${err.message}`);
    failed++;
  }
}

// Test core features
test('Chainable API', () => {
  const style = $().color('red').backgroundColor('blue').block();
  if (style.color !== 'red') throw new Error('color not set');
  if (style.backgroundColor !== 'blue') throw new Error('backgroundColor not set');
});

test('Hover with .end()', () => {
  const style = $().color('red').hover().color('blue').end().block();
  if (style.color !== 'red') throw new Error('regular color wrong');
  if (!style.hover || style.hover.color !== 'blue') throw new Error('hover color missing');
});

test('Recipe system', () => {
  const button = recipe({
    base: $().padding('8px').block(),
    variants: { color: { primary: $().backgroundColor('blue').block() } }
  });
  const result = button({ color: 'primary' });
  if (!result) throw new Error('recipe failed');
});

test('Media query', () => {
  const style = $().media('(max-width: 768px)', (css) => {
    css.$('.test').padding('10px').block();
  }).block();
  if (!style.atRules || style.atRules[0].type !== 'media') throw new Error('media rule not created');
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);
