import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const LegalPage = lazy(() => import('./pages/LegalPage'));

const App: React.FC = () => {
  // Theme State 鈥?read from localStorage synchronously so the inline script
  // in index.html and React agree on the initial theme without a re-render flash.
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return (localStorage.getItem('optipix-theme') as 'light' | 'dark') || 'light';
    } catch {
      // localStorage unavailable (e.g. private browsing)
      return 'light';
    }
  });

  // Keep the DOM class and localStorage in sync with React state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('optipix-theme', theme);
    } catch {
      // localStorage unavailable
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
      <Route
        path="/privacy"
        element={
          <Suspense fallback={null}>
            <LegalPage type="privacy" theme={theme} toggleTheme={toggleTheme} />
          </Suspense>
        }
      />
      <Route
        path="/terms"
        element={
          <Suspense fallback={null}>
            <LegalPage type="terms" theme={theme} toggleTheme={toggleTheme} />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
