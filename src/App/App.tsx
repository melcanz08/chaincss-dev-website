import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Nav from '../components/Nav/Nav';
import Hero from '../components/Hero/Hero';
import FeatureGrid from '../components/FeatureGrid/FeatureGrid';
import ComparisonTable from '../components/Comparison/ComparisonTable';
import Footer from '../components/Footer/Footer';
const Docs = lazy(() => import('../pages/docs/Docs/Docs'));
const Playground = lazy(() => import('../components/Playground/Playground'));
const ThemeGraph = lazy(() => import('../pages/ThemeGraph/ThemeGraph'));
const Audit = lazy(() => import('../pages/Audit/Audit'));
const Pipeline =lazy(()=>import('../pages/NewPipeline/NewPipeline'));
import Inspector from '../components/Inspector/Inspector';

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
          <Route path="/theme-graph" element={<ThemeGraph />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/newpipeline" element={<Pipeline />} />
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
