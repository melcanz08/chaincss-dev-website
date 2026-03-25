export default function HeadlessComponents() {
  return (
    <>
      <div className="docs-header">
        <h1 className="docs-title">Headless Components</h1>
        <p className="docs-description">
          Build accessible components with built-in focus traps and keyboard navigation
        </p>
      </div>

      <h2>Built-in Accessibility Features</h2>
      <p>
        ChainCSS provides headless logic for complex components, so you don't need external libraries like Radix.
      </p>

      <div className="feature-grid">
        <div className="feature-card">
          <strong>Focus Traps</strong>
          <p>Automatically trap focus within modals and dialogs</p>
        </div>
        <div className="feature-card">
          <strong>Keyboard Navigation</strong>
          <p>Full keyboard support (Tab, Enter, Escape, Arrow keys)</p>
        </div>
        <div className="feature-card">
          <strong>Screen Reader Support</strong>
          <p>Proper ARIA attributes for accessibility</p>
        </div>
        <div className="feature-card">
          <strong>Portal Support</strong>
          <p>Render modals outside the React tree</p>
        </div>
      </div>

      <h2>Custom Modal with Focus Trap</h2>
      <div className="code-block">
        <pre>{`import { useModal } from 'chaincss/react';

function Modal({ isOpen, onClose }) {
  const { overlayProps, contentProps, trapFocus } = useModal({
    isOpen,
    onClose,
    trapFocus: true,
    closeOnEsc: true,
    closeOnOverlayClick: true
  });

  if (!isOpen) return null;

  return (
    <div {...overlayProps} className="modal-overlay">
      <div {...contentProps} className="modal-content">
        <h2>Modal Title</h2>
        <p>Modal content</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}`}</pre>
      </div>

      <div className="tip">
        <strong>💡 Headless Benefits:</strong> No dependencies, full control, perfect for design systems!
      </div>
    </>
  );
}
