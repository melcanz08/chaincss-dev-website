import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import ComparisonTable from '../components/ComparisonTable';
import Footer from '../components/Footer';

const Docs = lazy(() => import('../pages/Docs/Docs'));
const Playground = lazy(() => import('../components/Playground'));

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
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
