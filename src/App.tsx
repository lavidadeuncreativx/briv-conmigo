import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [state, setState] = useState<'form' | 'success'>('form');
  const [darkMode, setDarkMode] = useState(false);

  // Check for query param ?state=success for QA
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get('state');
    if (stateParam === 'success') {
      setState('success');
    } else if (stateParam === 'form') {
      setState('form');
    }
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 md:p-8 transition-colors duration-300 font-sans">
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform z-50"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <main className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        <LeftPanel state={state} />
        <RightPanel
          state={state}
          onSuccess={() => setState('success')}
          onBack={() => setState('form')}
        />
      </main>

      <div className="fixed bottom-6 text-slate-400 dark:text-slate-600 text-xs hidden md:block">
        © 2024 Brivé Solutions. Todos los derechos reservados.
      </div>
    </div>
  );
}

export default App;
