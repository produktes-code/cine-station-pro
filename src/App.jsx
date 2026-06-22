import { useState, useEffect } from 'react';
import CineStation from './CineStation';
import { Globe } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cinestation_language') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('cinestation_language', language);
  }, [language]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050507] text-white overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-600 to-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>movie_filter</span>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CineStation Pro</h1>
            <p className="font-meta-code text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-0.5">V3.0 Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#111114] rounded border border-white/5 shadow-inner">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-meta-code flex items-center gap-1.5 mr-2">
              <Globe className="w-3 h-3 text-emerald-500" /> {language.toUpperCase()}
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none text-[10px] text-white hover:text-emerald-400 focus:outline-none cursor-pointer appearance-none font-meta-code text-right"
            >
              <option value="es">ESPAÑOL</option>
              <option value="en">ENGLISH</option>
              <option value="de">DEUTSCH</option>
              <option value="uk">УКРАЇНСЬКА</option>
              <option value="ru">РУССКИЙ</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main App */}
      <div className="flex-1 overflow-hidden relative">
        <CineStation language={language} />
      </div>

      {/* Footer */}
      <footer className="h-8 border-t border-white/5 bg-black/60 backdrop-blur-md flex items-center justify-between px-6 shrink-0 text-[10px] text-gray-500 font-meta-code uppercase tracking-wider z-20">
        <div>
          <span>Creado por </span>
          <a href="https://github.com/produktes-code" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 hover:underline font-bold transition-all">
            produktes-code
          </a>
          <span> · GitHub</span>
        </div>
        <div>
          <span>© 2026 CineStation Pro</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
