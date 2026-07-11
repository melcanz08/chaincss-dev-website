import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import ComparisonTable from '../components/ComparisonTable';
import Footer from '../components/Footer';

const Docs = lazy(() => import('../pages/Docs/Docs'));
const Playground = lazy(() => import('../components/Playground'));
const Audit = lazy(() => import('../pages/Audit'));
import Inspector from '../components/Inspector';

export default function App() {
  return (
    <>
      <Nav />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FeatureGrid />
              <ComparisonTable />
            </>
          } />
          <Route path="/docs/*" element={<Docs />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
        {(() => {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    try { setM(window.innerWidth <= 768); } catch {}
    const h = () => { try { setM(window.innerWidth <= 768); } catch {} };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  if (m) {
    return React.createElement('div', {
      style: { position:'fixed',bottom:20,left:'50%',transform:'translateX(-50%)',background:'rgba(30,41,59,0.9)',color:'#94a3b8',padding:'10px 20px',borderRadius:20,fontSize:12,zIndex:9999,border:'1px solid rgba(255,255,255,0.08)',textAlign:'center' }
    }, '🔬 Inspector available on desktop');
  }
  return React.createElement(Inspector, null);
})()}
      </Suspense>
      <Footer />
    </>
  );
}
