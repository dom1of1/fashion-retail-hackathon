import { useState, useEffect } from 'react';

const MESSAGES = [
  'Analysing your body shape\u2026',
  'Fitting the garment\u2026',
  'Rendering your look\u2026',
];

const CYCLE_MS = 2000;

/**
 * Full-screen loading overlay with rotating messages.
 */
export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="loading-overlay__spinner" />
      <p className="loading-overlay__message">{MESSAGES[messageIndex]}</p>
    </div>
  );
}
