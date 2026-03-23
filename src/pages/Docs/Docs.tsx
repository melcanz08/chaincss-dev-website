import { Routes, Route, NavLink } from 'react-router-dom';
import './docs.jcss';
import GettingStarted from './GettingStarted';
import Installation from './Installation';
import CoreConcepts from './CoreConcepts';
import Recipes from './Recipes';
import Theming from './Theming';
import Plugins from './Plugins';
import APIReference from './APIReference';

export default function Docs() {
  return (
    <div className="docs-container">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Getting Started</div>
          <NavLink to="/docs" end className="docs-sidebar-link">
            Introduction
          </NavLink>
          <NavLink to="/docs/installation" className="docs-sidebar-link">
            Installation
          </NavLink>
        </div>
        
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Core Concepts</div>
          <NavLink to="/docs/core-concepts" className="docs-sidebar-link">
            Chainable API
          </NavLink>
          <NavLink to="/docs/theming" className="docs-sidebar-link">
            Dynamic Theming
          </NavLink>
          <NavLink to="/docs/recipes" className="docs-sidebar-link">
            Recipe System
          </NavLink>
        </div>
        
        <div className="docs-sidebar-section">
          <div className="docs-sidebar-title">Advanced</div>
          <NavLink to="/docs/plugins" className="docs-sidebar-link">
            Build Plugins
          </NavLink>
          <NavLink to="/docs/api" className="docs-sidebar-link">
            API Reference
          </NavLink>
        </div>
      </aside>
      
      <main className="docs-content">
        <Routes>
          <Route index element={<GettingStarted />} />
          <Route path="installation" element={<Installation />} />
          <Route path="core-concepts" element={<CoreConcepts />} />
          <Route path="theming" element={<Theming />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="plugins" element={<Plugins />} />
          <Route path="api" element={<APIReference />} />
        </Routes>
      </main>
    </div>
  );
}