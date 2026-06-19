const fs = require('fs');

const path = '/Users/jesusferrer/Desktop/CineStation-Pro/src/CineStation.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace CustomSelect, Icon, and CopyBtn (lines ~482 to 549)
const customSelectRegex = /const Icon[\s\S]*?(?=export default function CineStation)/;
const customSelectCode = `function CustomSelect({ label, value, onChange, options, nameKey = null, valKey = null, placeholder = "Auto", language = "es" }) {
  return (
    <div className="flex flex-col gap-xs recessed-panel p-md rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
      <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">{label}</label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full bg-app-input border border-app-border rounded-sm px-sm py-[6px] font-body-sm text-on-surface focus:border-app-accent focus:ring-1 focus:ring-app-accent focus:outline-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"
      >
        <option value="">{placeholder}</option>
        {options.map((opt, i) => {
          const v = valKey ? opt[valKey] : opt;
          const n = nameKey ? opt[nameKey] : opt;
          return <option key={i} value={v}>{translateVal(n, language)}</option>;
        })}
      </select>
    </div>
  );
}

`;

content = content.replace(customSelectRegex, customSelectCode);

// Replace return (...) in CineStation (from `  return (` to `    </div>\n  );\n}`)
const returnBlockStart = content.indexOf('  return (\n    <div className="bg-background');
if (returnBlockStart === -1) {
  console.log("Error: could not find return block start");
  process.exit(1);
}

const newReturnBlock = `  return (
    <div className="bg-app-bg text-on-surface h-screen w-screen overflow-hidden flex flex-col font-body-md selection:bg-app-accent selection:text-white antialiased">
      {/* TopNavBar (48px height) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-lg h-12 bg-app-bg border-b border-app-border shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-app-accent text-[24px]" style={{fontVariationSettings: "'FILL' 1"}}>videocam</span>
          <span className="font-headline-lg text-[20px] font-bold tracking-tighter">
            <span className="text-app-accent">CINESTATION</span><span className="text-white">.PRO</span>
          </span>
        </div>
        <div className="flex items-center gap-sm">
          {/* Language Selector Dropdown mapped as styled select */}
          <div className="flex items-center bg-app-panel border border-app-border rounded-sm overflow-hidden h-8 px-2 shadow-inner">
             <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1" style={{fontVariationSettings: "'FILL' 0"}}>language</span>
             <select 
                value={language} 
                onChange={e => changeLanguage(e.target.value)} 
                className="bg-transparent text-on-surface font-label-sm uppercase outline-none cursor-pointer appearance-none pl-1 pr-4"
                style={{backgroundImage: 'none'}}
              >
                {Object.entries(TRANSLATIONS).map(([key, value]) => (
                  <option key={key} value={key} className="bg-app-input text-on-surface">
                    {value.flag} {key.toUpperCase()}
                  </option>
                ))}
              </select>
          </div>
          <button className="font-label-sm text-label-sm font-mono-data text-white hardware-btn px-md py-xs hover:text-app-accent transition-colors rounded-sm uppercase tracking-wider h-8" onClick={() => setShowSettings(true)}>
            {TRANSLATIONS[language].engine_config}
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-[#000000cc] backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-app-panel border border-app-border shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full max-w-lg rounded-sm p-6 relative">
            <h2 className="font-headline-md text-app-accent mb-6 uppercase tracking-widest">{TRANSLATIONS[language].core_engine_config}</h2>
            
            <div className="mb-6 border-b border-app-border pb-6">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-2">{TRANSLATIONS[language].llm_brain}</p>
              <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIza... or sk-..." className="w-full recessed-panel recessed-input px-sm py-[6px] font-mono-data text-on-surface rounded-sm" />
              <div className="font-mono-data text-[10px] text-app-accent mt-2">
                {provider === "GEMINI" && \`[SYS] \${TRANSLATIONS[language].name} Gemini Engine Detected.\`}
                {provider === "CLAUDE" && \`[SYS] \${TRANSLATIONS[language].name} Claude Engine Detected.\`}
                {provider === "OPENAI" && \`[SYS] \${TRANSLATIONS[language].name} OpenAI Engine Detected.\`}
                {provider === "UNKNOWN" && apiKey.length > 0 && "[ERR] Unknown API Signature."}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-2">{TRANSLATIONS[language].render_node}</p>
              <input type="password" value={replicateKey} onChange={e => setReplicateKey(e.target.value)} placeholder="r8_..." className="w-full recessed-panel recessed-input px-sm py-[6px] font-mono-data text-on-surface rounded-sm" />
              <div className="font-mono-data text-[10px] text-on-surface-variant mt-2">{TRANSLATIONS[language].replicate_key_required}</div>
            </div>

            <div className="flex justify-end gap-sm">
              <button className="hardware-btn px-md py-sm rounded-sm text-on-surface-variant hover:text-white font-label-sm uppercase" onClick={() => setShowSettings(false)}>{TRANSLATIONS[language].cancel}</button>
              <button className="glow-amber px-md py-sm rounded-sm text-white font-label-sm uppercase" onClick={saveSettings}>{TRANSLATIONS[language].apply}</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 flex mt-12 mb-8 overflow-hidden bg-app-border gap-px">
        
        {/* PANEL LEFT: ACTION BRIEF (20%) */}
        <section className="w-1/4 panel-container flex flex-col flex-shrink-0 relative z-10 border-r border-app-border max-w-[320px]">
          <header className="h-10 px-panel-padding border-b border-app-border bg-app-panel flex items-center justify-between shrink-0">
            <h2 className="font-label-md text-label-md uppercase text-on-surface tracking-[0.1em]">{TRANSLATIONS[language].action_brief}</h2>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px]" style={{fontVariationSettings: "'FILL' 0"}}>description</span>
          </header>
          <div className="p-panel-padding flex-1 flex flex-col gap-sm overflow-y-auto bg-app-panel">
            <div className="flex-1 flex flex-col min-h-[150px]">
              <textarea 
                className="flex-1 w-full recessed-panel recessed-input p-md font-mono-data text-on-surface placeholder:text-on-surface-variant rounded-sm resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-all" 
                placeholder={TRANSLATIONS[language].placeholder_brief}
                value={brief}
                onChange={e => setBrief(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col gap-xs shrink-0 mt-sm">
              <button className="w-full py-sm px-sm rounded-sm hardware-btn text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm flex justify-center items-center gap-xs uppercase tracking-wider" onClick={autoRandomize}>
                <span className="material-symbols-outlined text-[16px]">shuffle</span>
                {TRANSLATIONS[language].random_seed}
              </button>
              <button className="w-full py-sm px-sm rounded-sm hardware-btn text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm flex justify-center items-center gap-xs uppercase tracking-wider disabled:opacity-50" onClick={generateManual} disabled={loading || !isBriefValid}>
                <span className="material-symbols-outlined text-[16px]">build</span>
                {loading && !canUseAI ? TRANSLATIONS[language].compiling : TRANSLATIONS[language].manual_compile}
              </button>
              <button 
                className={\`w-full h-10 rounded-sm text-white font-label-sm text-label-sm flex justify-center items-center gap-xs transition-all tracking-wider uppercase mt-sm \${canUseAI ? 'glow-amber' : 'bg-[#222] border border-[#333] text-on-surface-variant cursor-not-allowed'}\`} 
                onClick={generateAI} 
                disabled={loading || !canUseAI}
              >
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
                {loading && canUseAI ? TRANSLATIONS[language].thinking : \`INIT \${getProviderName()}\`}
              </button>
            </div>

            <div className="mt-md pt-md border-t border-app-border shrink-0">
              <h3 className="font-label-sm text-label-sm text-app-accent mb-sm tracking-wider">{TRANSLATIONS[language].video_cloud_render}</h3>
              <button 
                className={\`w-full h-10 rounded-sm text-white font-label-sm text-label-sm flex justify-center items-center gap-xs transition-all tracking-wider uppercase \${(!project || !replicateKey || videoState === "loading") ? 'bg-[#222] border border-[#333] text-on-surface-variant cursor-not-allowed' : 'glow-crimson'}\`} 
                onClick={renderVideo} 
                disabled={!project || !replicateKey || videoState === "loading"}
              >
                <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
                {videoState === "loading" ? TRANSLATIONS[language].rendering : TRANSLATIONS[language].send_to_replicate}
              </button>
              {(!replicateKey) && (
                <div className="text-[10px] text-app-accent/60 text-center mt-2 font-mono-data uppercase">
                  {TRANSLATIONS[language].replicate_key_warning}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PANEL CENTER: PROPERTIES (45%) */}
        <section className="w-[45%] panel-container flex flex-col flex-shrink-0 relative z-10 border-r border-app-border min-w-[350px]">
          <header className="flex h-10 border-b border-app-border bg-app-panel shrink-0 overflow-x-auto hide-scrollbar">
            <button className={\`px-md h-full flex items-center border-b-2 font-label-sm text-label-sm tracking-wider uppercase transition-colors \${activeTab === 'camera' ? 'border-app-accent text-app-accent bg-[#222]' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-[#222]'}\`} onClick={() => setActiveTab('camera')}>{TRANSLATIONS[language].camera}</button>
            <button className={\`px-md h-full flex items-center border-b-2 font-label-sm text-label-sm tracking-wider uppercase transition-colors \${activeTab === 'light' ? 'border-app-accent text-app-accent bg-[#222]' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-[#222]'}\`} onClick={() => setActiveTab('light')}>{TRANSLATIONS[language].lighting}</button>
            <button className={\`px-md h-full flex items-center border-b-2 font-label-sm text-label-sm tracking-wider uppercase transition-colors \${activeTab === 'art' ? 'border-app-accent text-app-accent bg-[#222]' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-[#222]'}\`} onClick={() => setActiveTab('art')}>{TRANSLATIONS[language].art_dir}</button>
            <button className={\`px-md h-full flex items-center border-b-2 font-label-sm text-label-sm tracking-wider uppercase transition-colors \${activeTab === 'output' ? 'border-app-accent text-app-accent bg-[#222]' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-[#222]'}\`} onClick={() => setActiveTab('output')}>{TRANSLATIONS[language].output}</button>
          </header>
          <div className="p-panel-padding flex-1 overflow-y-auto bg-app-panel">
            <div className="grid grid-cols-2 gap-x-md gap-y-md content-start">
              {activeTab === 'camera' && (
                <>
                  <CustomSelect label={TRANSLATIONS[language].shot_scale} value={shot} onChange={setShot} options={Lib.SHOT_SCALES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].angle} value={angle} onChange={setAngle} options={Lib.ANGLES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].movement} value={movement} onChange={setMovement} options={Lib.MOVEMENTS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].sensor} value={sensor} onChange={setSensor} options={Lib.SENSORS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].lens} value={lens} onChange={setLens} options={Lib.LENSES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].vintage_lens} value={vintageLens} onChange={setVintageLens} options={Lib.VINTAGE_LENSES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].aperture} value={fstop} onChange={setFstop} options={Lib.F_STOPS} placeholder={TRANSLATIONS[language].auto} language={language} />
                </>
              )}
              {activeTab === 'light' && (
                <>
                  <CustomSelect label={TRANSLATIONS[language].light_style} value={lightStyle} onChange={setLightStyle} options={Lib.LIGHT_STYLES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].light_quality} value={lightQuality} onChange={setLightQuality} options={Lib.LIGHT_QUALITY} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].light_source} value={lightSource} onChange={setLightSource} options={Lib.LIGHT_SOURCES} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].modifier} value={modifier} onChange={setModifier} options={Lib.MODIFIERS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].weather} value={weather} onChange={setWeather} options={Lib.WEATHER_TIME} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].atmosphere} value={atmosphere} onChange={setAtmosphere} options={Lib.ATMOSPHERE} placeholder={TRANSLATIONS[language].auto} language={language} />
                </>
              )}
              {activeTab === 'art' && (
                <>
                  <CustomSelect label={TRANSLATIONS[language].director} value={director} onChange={setDirector} options={Lib.DIRECTORS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].film_stock} value={filmStock} onChange={setFilmStock} options={Lib.FILM_STOCKS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].aesthetic} value={aesthetic} onChange={setAesthetic} options={Lib.AESTHETICS} placeholder={TRANSLATIONS[language].auto} language={language} />
                </>
              )}
              {activeTab === 'output' && (
                <>
                  <CustomSelect label={TRANSLATIONS[language].target_model} value={model} onChange={setModel} options={Lib.AI_MODELS} valKey="id" nameKey="name" placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].resolution} value={resolution} onChange={setResolution} options={Lib.RESOLUTIONS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].aspect_ratio} value={aspectRatio} onChange={setAspectRatio} options={Lib.ASPECT_RATIOS} placeholder={TRANSLATIONS[language].auto} language={language} />
                  <CustomSelect label={TRANSLATIONS[language].framerate} value={framerate} onChange={setFramerate} options={Lib.FRAMERATES} placeholder={TRANSLATIONS[language].auto} language={language} />
                </>
              )}
            </div>
          </div>
        </section>

        {/* PANEL RIGHT: OUTPUT CONSOLE (35%) */}
        <section className="flex-1 panel-container flex flex-col min-w-0 relative z-10">
          <header className="h-10 px-panel-padding border-b border-app-border bg-app-panel flex items-center justify-between shrink-0">
            <h2 className="font-label-md text-label-md uppercase text-on-surface tracking-[0.1em]">{TRANSLATIONS[language].output_console}</h2>
            <div className="flex gap-sm">
              <span className="w-2 h-2 rounded-full bg-app-border"></span>
              <span className="w-2 h-2 rounded-full bg-app-border"></span>
              <span className="w-2 h-2 rounded-full bg-app-border"></span>
            </div>
          </header>
          
          <div className="p-panel-padding flex-1 flex flex-col gap-sm overflow-y-auto bg-app-panel">
            
            {/* Video Player Container */}
            <div className="flex-1 min-h-[250px] flex flex-col items-center justify-center bg-app-input rounded-[4px] border border-app-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden">
              {videoState === "idle" && (
                <>
                  <div className="flex flex-col items-center gap-md text-app-border z-10">
                    <span className="material-symbols-outlined text-[64px]" style={{fontVariationSettings: "'wght' 200"}}>movie</span>
                    <p className="font-mono-data text-mono-data tracking-widest uppercase">{TRANSLATIONS[language].waiting_input}</p>
                  </div>
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{backgroundImage: 'linear-gradient(#1c1c1c 1px, transparent 1px), linear-gradient(90deg, #1c1c1c 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
                  <div className="absolute bottom-md right-md text-[#333333] font-mono-data text-[10px] tracking-widest uppercase">REC 709 // NO SIGNAL</div>
                </>
              )}

              {videoState === "loading" && (
                <div className="flex flex-col items-center justify-center z-20">
                  <span className="material-symbols-outlined text-[48px] text-app-accent animate-spin mb-4">settings</span>
                  <p className="font-mono-data text-[11px] text-app-accent tracking-widest uppercase animate-pulse">{videoProgress}</p>
                </div>
              )}

              {videoState === "error" && (
                <div className="p-6 text-app-accent font-mono-data text-[10px] text-center w-full z-10">
                  {videoProgress}
                </div>
              )}

              {videoState === "success" && videoUrl && (
                <video src={videoUrl} autoPlay controls loop className="w-full h-full object-contain block absolute inset-0 z-10 bg-black" />
              )}
            </div>

            {/* Terminal Boxes */}
            {project && (
              <div className="flex flex-col gap-sm shrink-0 mt-sm">
                
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-headline-lg text-[18px] font-bold text-white uppercase">{project.titulo}</h3>
                  <span className="text-app-success font-mono-data text-[10px] uppercase border border-app-success px-2 py-1 rounded-sm">{project.modeloRecomendado || "Auto"}</span>
                </div>
                
                <div className="bg-app-input border border-app-success/50 rounded-sm p-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] group relative">
                  <div className="flex justify-between items-center mb-xs">
                    <h3 className="font-label-sm text-label-sm text-app-success tracking-wider">{TRANSLATIONS[language].pos_prompt}</h3>
                    <button onClick={() => copy(project.escena.promptCinematografico, "pos")} className="text-app-success hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[14px]">{copied === "pos" ? "check" : "content_copy"}</span>
                    </button>
                  </div>
                  <p className="font-mono-data text-mono-data text-app-success opacity-80 min-h-[40px] break-all">{project.escena.promptCinematografico}</p>
                </div>

                <div className="bg-app-input border border-app-accent/50 rounded-sm p-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] group relative">
                  <div className="flex justify-between items-center mb-xs">
                    <h3 className="font-label-sm text-label-sm text-app-accent tracking-wider">{TRANSLATIONS[language].neg_prompt}</h3>
                    <button onClick={() => copy(project.escena.promptNegativo, "neg")} className="text-app-accent hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[14px]">{copied === "neg" ? "check" : "content_copy"}</span>
                    </button>
                  </div>
                  <p className="font-mono-data text-mono-data text-app-accent opacity-80 min-h-[40px] break-all">{project.escena.promptNegativo}</p>
                </div>

              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer (32px height) */}
      <footer className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-center px-lg h-8 bg-app-bg border-t border-app-border shadow-[0_-4px_12px_rgba(0,0,0,0.5)] shrink-0">
        <div className="flex items-center gap-md">
          <span className="font-headline-sm text-headline-sm font-bold text-white text-[12px] tracking-widest uppercase">{TRANSLATIONS[language].version}</span>
        </div>
        <div className="flex items-center gap-lg font-label-sm text-label-sm font-mono-data tracking-[0.1em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-app-success shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span className="text-on-surface-variant">{TRANSLATIONS[language].status_online}</span>
          </div>
          <a className="text-app-accent font-bold hover:brightness-110 transition-all tracking-[0.2em]" href="#">{TRANSLATIONS[language].powered_by}</a>
        </div>
      </footer>
    </div>
  );
}`;

content = content.substring(0, returnBlockStart) + newReturnBlock + '\n}\n';

fs.writeFileSync(path, content, 'utf8');
console.log("CineStation.jsx rewritten successfully");
