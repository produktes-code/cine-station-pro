import { useState, useEffect } from 'react';
import { Camera, Terminal, Zap, Wand2, Film, Dices, ChevronDown, BrainCircuit, Loader2, Play, UploadCloud, Users, Image as ImageIcon, Video, RefreshCcw, Copy, Lock, ShieldAlert } from 'lucide-react';
import { cinemaLibrary } from './data/cinemaLibrary';
import { translationsUI } from './data/translationsUI';
import { translateOptionV3 } from './data/translationsOptionsV3';

// Import client API services
import { createProject } from './services/api/projects';
import { uploadMedia } from './services/api/media';
import { enhancePrompt } from './services/api/effects';
import { createRenderJob, startRenderJob, getRenderProgress } from './services/api/export';

const CollapsibleSection = ({ title, icon: Icon, colorClass, children, defaultOpen = false, secondaryAction }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-[#0c0c0f]/80 backdrop-blur-md rounded-lg border border-white/5 overflow-hidden mb-3 shadow-[0_0_15px_rgba(0,0,0,0.3)]`}>
      <div 
        className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-4 h-4 ${colorClass}`} />
          <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-widest">{title}</h3>
        </div>
        <div className="flex items-center gap-4">
          {secondaryAction && (
            <div onClick={(e) => e.stopPropagation()}>
              {secondaryAction}
            </div>
          )}
          <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-4 border-t border-white/5">
          {children}
        </div>
      </div>
    </div>
  );
};

const SelectGroup = ({ label, id, options, value, onChange, highlightClass, language }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className={`font-meta-code text-[9px] uppercase tracking-widest text-on-surface-variant ${highlightClass || ''}`}>{label}</label>
    <select id={id} className="w-full bg-[#141417] border border-white/10 rounded-md p-2 text-xs font-mono text-on-surface focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 focus:outline-none transition-all cursor-pointer" value={value || ''} onChange={(e) => onChange(id, e.target.value)}>
      <option value="">{language === 'es' ? '-- SELECCIONAR --' : '-- SELECT --'}</option>
      {options?.map((opt, i) => {
        if (opt.group) {
          return (
            <optgroup key={i} label={translateOptionV3(opt.group, language)}>
              {opt.options.map((subOpt, j) => (
                <option key={j} value={subOpt.value}>{translateOptionV3(subOpt.text, language)}</option>
              ))}
            </optgroup>
          );
        }
        return <option key={i} value={opt.value}>{translateOptionV3(opt.text, language)}</option>;
      })}
    </select>
  </div>
);

const flattenOptions = (arr) => {
  if (!arr) return [];
  return arr.flatMap(item => item.group && item.options ? item.options : [item]);
};

const CineStation = ({ language = 'es' }) => {
  const [projectId, setProjectId] = useState('default-project');
  const [config, setConfig] = useState({});
  const [engineMode, setEngineMode] = useState('t2v'); // 't2v', 'i2v', 'v2v', 'face_swap'
  const [tokens, setTokens] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [compiledPayload, setCompiledPayload] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([]);
  
  // Camera Vectors
  const [vectorCam, setVectorCam] = useState({ pan: 0, tilt: 0, zoom: 0, roll: 0, x: 0, y: 0 });
  const [staticCam, setStaticCam] = useState(false);

  const t = (key) => translationsUI[language]?.[key] || translationsUI['en']?.[key] || key;

  // Initialize/ensure project folder exists on backend
  useEffect(() => {
    createProject({
      title: "CineStation Workspace",
      description: "Auto-created workspace project",
      resolution: "1080p",
      framerate: "24fps"
    }).then(res => {
      setProjectId(res.id);
      setTerminalLogs([`> [SYSTEM] Initialized project session: ${res.id}`]);
    }).catch(err => {
      console.warn("Failed to register project in backend, using default path key.", err);
      setTerminalLogs([`> [SYSTEM] Session initialized under local fallback.`]);
    });
  }, []);

  // Clear selected file name on engine mode switch
  useEffect(() => {
    setSelectedFileName('');
  }, [engineMode]);

  const handleConfigChange = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));
  const handleVectorChange = (axis, value) => setVectorCam(prev => ({ ...prev, [axis]: parseFloat(value) }));

  const getOptionText = (categoryArray, value) => {
    if (!categoryArray || !value) return null;
    const flat = flattenOptions(categoryArray);
    const found = flat.find(o => o.value === value);
    return found ? translateOptionV3(found.text, 'en') : value;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (2GB limit)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert(t('error_file_too_large'));
      return;
    }

    // Check format
    if (engineMode === 'i2v' && !file.type.startsWith('image/')) {
      alert(t('error_unsupported_image'));
      return;
    }

    const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

    if (engineMode === 'v2v' && !allowedVideoTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert(t('error_unsupported_video'));
      return;
    }

    setSelectedFileName(file.name);
    setIsUploading(true);
    setTerminalLogs(prev => [...prev, `> [MEDIA] Uploading ${file.name} (${(file.size / (1024*1024)).toFixed(2)} MB)...`]);

    try {
      const uploadRes = await uploadMedia(projectId, file);
      handleConfigChange('media_file', uploadRes.filename);
      setIsUploading(false);
      setTerminalLogs(prev => [
        ...prev,
        `> [MEDIA] ${t('file_uploaded_success')}: ${uploadRes.filename}`
      ]);
    } catch (err) {
      setIsUploading(false);
      setSelectedFileName('');
      const rateLimitMsg = err.status === 429 ? t('error_rate_limited') : err.message;
      alert(`${t('error_upload_failed')}: ${rateLimitMsg}`);
      setTerminalLogs(prev => [...prev, `> [MEDIA] [ERROR] Upload failed: ${rateLimitMsg}`]);
    }
  };

  const handleEnhanceBrief = async () => {
    if (!config.brief) return;
    setIsEnhancing(true);
    setTerminalLogs(prev => [...prev, `> [NLP] Enhancing prompt: "${config.brief}"`]);
    try {
      const enhanceRes = await enhancePrompt(config.brief);
      handleConfigChange('brief', enhanceRes.enhanced_prompt);
      setTerminalLogs(prev => [...prev, `> [NLP] Enhanced prompt: "${enhanceRes.enhanced_prompt}"`]);
    } catch (err) {
      const rateLimitMsg = err.status === 429 ? t('error_rate_limited') : err.message;
      console.warn("Prompt enhancement request failed, applying local fallback:", rateLimitMsg);
      
      const concepts = [
        "A highly detailed, cinematic masterpiece showing " + config.brief.toLowerCase() + ", physically accurate lighting, masterpiece, 8k resolution, photorealistic rendering.",
        "Moody, atmospheric composition featuring " + config.brief.toLowerCase() + " surrounded by cinematic fog, depth of field, award-winning cinematography.",
        "Vibrant, neon-drenched cyberpunk aesthetic interpreting " + config.brief.toLowerCase() + " on a wet rainy environment, high contrast."
      ];
      const fallbackPrompt = concepts[Math.floor(Math.random() * concepts.length)];
      handleConfigChange('brief', fallbackPrompt);
      setTerminalLogs(prev => [
        ...prev,
        `> [NLP] [WARNING] API error (${rateLimitMsg}). Fallback applied: "${fallbackPrompt}"`
      ]);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCompile = async () => {
    if (!config.brief && engineMode !== 'face_swap') return;
    setIsCompiling(true);
    setCompiledPayload(null);
    setTerminalLogs([
      `> [EXPORT] Initializing rendering pipeline...`,
      `> [EXPORT] Compiling sequence CLI arguments...`
    ]);
    
    let cmdArgs = [];
    if (engineMode === 'v2v') cmdArgs.push(`--engine v2v_stylize --target "${getOptionText(cinemaLibrary.videoToVideoStyles, config.v2v_style)}"`);
    if (engineMode === 'face_swap') cmdArgs.push(`--engine identity_swap --op "${getOptionText(cinemaLibrary.marketingModes, config.marketing_mode)}"`);
    
    let camStr = staticCam ? '--cam static' : `--pan ${vectorCam.pan} --tilt ${vectorCam.tilt} --zoom ${vectorCam.zoom} --roll ${vectorCam.roll}`;
    
    let promptStr = config.brief ? `"${config.brief.replace(/"/g, '\\"')}"` : '"[NO PROMPT]"';
    let fullCmd = `> cinestation-core-cli render ${promptStr} ${camStr} ${cmdArgs.join(' ')}`;

    // Append Resolution & FPS if selected
    if (config.resolution) fullCmd += ` --res ${config.resolution}`;
    if (config.framerate) fullCmd += ` --fps ${config.framerate}`;

    setTerminalLogs(prev => [...prev, `> [EXPORT] Command generated: ${fullCmd}`]);

    try {
      const timelineData = { tracks: [] };
      const exportConfig = {
        resolution: config.resolution || "1080p",
        framerate: config.framerate || "24fps",
        engine_mode: engineMode,
        command: fullCmd,
        camera: staticCam ? "STATIC" : vectorCam,
      };

      setTerminalLogs(prev => [...prev, `> [EXPORT] Registering render job on queue...`]);
      const jobRes = await createRenderJob(projectId, timelineData, exportConfig);
      const jobId = jobRes.job_id;
      setTerminalLogs(prev => [...prev, `> [EXPORT] Job successfully enqueued. ID: ${jobId}`]);

      setTerminalLogs(prev => [...prev, `> [EXPORT] Requesting process thread execution...`]);
      const startRes = await startRenderJob(jobId, projectId, timelineData, exportConfig);
      setTerminalLogs(prev => [...prev, `> [EXPORT] Process started. Status: ${startRes.status}`]);

      // Poll progress every 1s
      const interval = setInterval(async () => {
        try {
          const progRes = await getRenderProgress(jobId);
          setTerminalLogs(prev => [
            ...prev,
            `> [EXPORT] Status: ${progRes.status.toUpperCase()} | Completion: ${progRes.progress}%`
          ]);

          if (progRes.status === 'finished' || progRes.status === 'completed' || progRes.progress >= 100) {
            clearInterval(interval);
            setIsCompiling(false);
            
            let tokenCount = Math.floor(fullCmd.length * 0.7) + Math.floor(Math.random() * 20);
            setTokens(tokenCount);

            setCompiledPayload({
              id: jobId,
              command: fullCmd,
              camera: staticCam ? "STATIC" : vectorCam,
              technical: {
                lens: getOptionText(cinemaLibrary.lenses, config.lens) || "DEFAULT_LENS",
                dop: getOptionText(cinemaLibrary.artStyles, config.dop) || "DEFAULT_STYLE",
                sensor: getOptionText(cinemaLibrary.cameras, config.sensor) || "DEFAULT_SENSOR",
                resolution: config.resolution || "DEFAULT_RESOLUTION",
                framerate: config.framerate || "DEFAULT_FPS"
              },
              render_status: "SUCCESS"
            });
            setTerminalLogs(prev => [...prev, `> [EXPORT] [SUCCESS] Rendering complete. Output files compiled successfully.`]);
          } else if (progRes.status === 'failed') {
            clearInterval(interval);
            setIsCompiling(false);
            setTerminalLogs(prev => [...prev, `> [EXPORT] [ERROR] Render processing failed on the backend runner.`]);
          }
        } catch (pollErr) {
          clearInterval(interval);
          setIsCompiling(false);
          setTerminalLogs(prev => [...prev, `> [EXPORT] [ERROR] Tracking check failed: ${pollErr.message}`]);
        }
      }, 1000);

    } catch (err) {
      setIsCompiling(false);
      const rateLimitMsg = err.status === 429 ? t('error_rate_limited') : err.message;
      setTerminalLogs(prev => [...prev, `> [EXPORT] [ERROR] Pipeline failure: ${rateLimitMsg}`]);
      alert(`${t('error_unsupported_format')}: ${rateLimitMsg}`);
    }
  };

  const cameraSliders = [
    { id: 'pan', min: -10, max: 10, color: 'accent-blue-500' },
    { id: 'tilt', min: -10, max: 10, color: 'accent-purple-500' },
    { id: 'zoom', min: -10, max: 10, color: 'accent-emerald-500' },
    { id: 'roll', min: -10, max: 10, color: 'accent-rose-500' }
  ];


  return (
    <div className="flex w-full h-[calc(100vh-6rem-2rem)] gap-3 p-3 bg-[#050507]">
      
      {/* LEFT PANEL: CONFIGURATION */}
      <aside className="w-[380px] flex-shrink-0 bg-surface-container-low/20 backdrop-blur-2xl border border-white/10 rounded-xl flex flex-col overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
        <div className="p-3 border-b border-white/5 bg-black/40 flex flex-col gap-3 shrink-0">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-on-surface tracking-widest text-[9px] uppercase"><Zap className="w-3 h-3 inline mr-1 text-emerald-500"/> {t('core_engine_mode')}</span>
          </div>
          
          <div className="grid grid-cols-4 gap-1 p-1 bg-[#0a0a0c] rounded-lg border border-white/5">
            <button onClick={() => setEngineMode('t2v')} className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${engineMode === 't2v' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'text-gray-500 hover:text-white border border-transparent'}`}>
              <Terminal className="w-4 h-4 mb-1" />
              <span className="text-[8px] font-bold tracking-widest">T2V</span>
            </button>
            <button onClick={() => setEngineMode('i2v')} className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${engineMode === 'i2v' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'text-gray-500 hover:text-white border border-transparent'}`}>
              <ImageIcon className="w-4 h-4 mb-1" />
              <span className="text-[8px] font-bold tracking-widest">I2V</span>
            </button>
            <button onClick={() => setEngineMode('v2v')} className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${engineMode === 'v2v' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'text-gray-500 hover:text-white border border-transparent'}`}>
              <Film className="w-4 h-4 mb-1" />
              <span className="text-[8px] font-bold tracking-widest">V2V</span>
            </button>
            <button onClick={() => setEngineMode('face_swap')} className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${engineMode === 'face_swap' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'text-gray-500 hover:text-white border border-transparent'}`}>
              <Users className="w-4 h-4 mb-1" />
              <span className="text-[8px] font-bold tracking-widest">FACE</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
          
          {/* UPLOADERS */}
          {(engineMode === 'i2v' || engineMode === 'v2v') && (
            <CollapsibleSection title={engineMode === 'i2v' ? t('reference_keyframe') : t('source_video_payload')} icon={UploadCloud} colorClass={engineMode === 'i2v' ? 'text-blue-400' : 'text-rose-400'} defaultOpen={true}>
              <label className="border border-dashed border-white/20 bg-black/30 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
                {isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 mb-2 animate-spin text-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      Uploading...
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 mb-2 opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2 break-all">
                      {selectedFileName ? selectedFileName : t('select_media_object')}
                    </span>
                  </>
                )}
                <input 
                  type="file" 
                  accept={engineMode === 'i2v' ? 'image/*' : 'video/*'} 
                  className="hidden" 
                  onChange={handleFileChange} 
                  disabled={isUploading}
                />
              </label>
              {engineMode === 'v2v' && (
                <div className="mt-3">
                  <SelectGroup label={t('style_transfer_target')} id="v2v_style" options={cinemaLibrary?.videoToVideoStyles} value={config.v2v_style} onChange={handleConfigChange} highlightClass="text-rose-400" language={language} />
                </div>
              )}
            </CollapsibleSection>
          )}

          {engineMode === 'face_swap' && (
            <CollapsibleSection title={t('operation_protocol')} icon={Users} colorClass="text-purple-400" defaultOpen={true}>
              <SelectGroup label={t('operation_protocol')} id="marketing_mode" options={cinemaLibrary?.marketingModes} value={config.marketing_mode} onChange={handleConfigChange} highlightClass="text-purple-400" language={language} />
              <div className="grid grid-cols-2 gap-2 mt-3">
                <label className="border border-dashed border-purple-500/30 rounded-lg p-3 flex flex-col items-center justify-center bg-purple-900/10 cursor-pointer hover:bg-purple-900/20 transition-colors text-center">
                  <ImageIcon className="w-5 h-5 mb-1 text-purple-400" />
                  <span className="text-[9px] font-bold text-purple-300 uppercase">{t('source_face')}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleConfigChange('source_face_file', e.target.files[0])} />
                </label>
                <label className="border border-dashed border-white/10 rounded-lg p-3 flex flex-col items-center justify-center bg-black/20 cursor-pointer hover:bg-white/5 transition-colors text-center">
                  <Video className="w-5 h-5 mb-1 text-gray-400" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase">{t('target_media')}</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleConfigChange('target_media_file', e.target.files[0])} />
                </label>
              </div>
            </CollapsibleSection>
          )}

          {/* NLP PROMPT */}
          <CollapsibleSection title={t('neural_language_parser')} icon={BrainCircuit} colorClass="text-emerald-500" defaultOpen={true}>
            <div className="space-y-3">
              <div>
                <label className="font-meta-code text-[9px] uppercase tracking-widest text-on-surface-variant block mb-1">{t('visual_directive')}</label>
                <textarea 
                  className="w-full bg-[#050507] border border-white/10 rounded-md p-2 text-xs font-mono text-on-surface focus:border-emerald-500/50 focus:ring-1 focus:outline-none resize-none" 
                  rows="3"
                  placeholder={engineMode === 'face_swap' ? t('optional_alignment_instructions') : t('describe_cinematic_composition')}
                  value={config.brief || ''}
                  onChange={(e) => handleConfigChange('brief', e.target.value)}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <SelectGroup label={t('director_influence')} id="dop" options={cinemaLibrary?.artStyles} value={config.dop} onChange={handleConfigChange} highlightClass="text-emerald-400" language={language} />
                <SelectGroup label={t('lighting_model')} id="lighting" options={cinemaLibrary?.lightingSchemes} value={config.lighting} onChange={handleConfigChange} language={language} />
              </div>
              <button onClick={handleEnhanceBrief} disabled={!config.brief || isEnhancing} className="w-full py-1.5 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 rounded text-[9px] uppercase tracking-widest font-bold text-emerald-400 flex justify-center items-center gap-1 transition-colors cursor-pointer disabled:opacity-50 mt-1">
                <Wand2 className="w-3 h-3"/> {isEnhancing ? t('enhancing') : t('auto_optimize_prompt')}
              </button>
            </div>
          </CollapsibleSection>

          {/* HIGGSFIELD MOTION VECTORS */}
          <CollapsibleSection title={t('physical_motion_vectors')} icon={Camera} colorClass="text-cyan-400" defaultOpen={true}>
            <div className="space-y-4">
              <label htmlFor="static-cam" className="flex items-center gap-2 text-[9px] font-meta-code uppercase tracking-widest bg-black/40 border border-white/5 px-2 py-1.5 rounded cursor-pointer hover:bg-white/5 transition">
                <input id="static-cam" type="checkbox" checked={staticCam} onChange={(e) => setStaticCam(e.target.checked)} className="accent-cyan-500" />
                {t('lock_camera_static_node')}
              </label>

              <div className={`space-y-4 transition-opacity duration-300 ${staticCam ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                {cameraSliders.map(cam => (
                  <div key={cam.id} className="group">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-cyan-300 transition">{t(cam.id)}</label>
                      <span className="text-[9px] font-mono bg-black px-1.5 py-0.5 rounded text-cyan-400 w-8 text-center border border-cyan-500/20">{vectorCam[cam.id] > 0 ? `+${vectorCam[cam.id]}` : vectorCam[cam.id]}</span>
                    </div>
                    <input 
                      type="range" min={cam.min} max={cam.max} step="1"
                      value={vectorCam[cam.id]} onChange={(e) => handleVectorChange(cam.id, e.target.value)}
                      className={`w-full ${cam.color} bg-white/10 h-1 rounded-lg appearance-none cursor-pointer`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>

          {/* RENDER FORMAT & RESOLUTION */}
          <CollapsibleSection title={t('format_resolution')} icon={Film} colorClass="text-emerald-400" defaultOpen={true}>
            <div className="space-y-3">
              <SelectGroup label={t('video_resolution')} id="resolution" options={cinemaLibrary?.resolutions?.master} value={config.resolution} onChange={handleConfigChange} language={language} />
              <SelectGroup label={t('frame_rate')} id="framerate" options={cinemaLibrary?.frameRates} value={config.framerate} onChange={handleConfigChange} language={language} />
            </div>
          </CollapsibleSection>

          {/* OPTICS & SENSOR */}
          <CollapsibleSection title={t('optics_sensor')} icon={Dices} colorClass="text-amber-500">
            <div className="space-y-3">
              <SelectGroup label={t('sensor_type')} id="sensor" options={cinemaLibrary?.cameras} value={config.sensor} onChange={handleConfigChange} language={language} />
              <div className="grid grid-cols-2 gap-2">
                <SelectGroup label={t('lens_mount')} id="lens" options={cinemaLibrary?.lenses} value={config.lens} onChange={handleConfigChange} language={language} />
                <SelectGroup label={t('aperture')} id="aperture" options={cinemaLibrary?.apertures} value={config.aperture} onChange={handleConfigChange} language={language} />
              </div>
            </div>
          </CollapsibleSection>
          
        </div>
      </aside>

      {/* CENTER: COMPILER OUTPUT */}
      <section className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="h-16 bg-surface-container-low/20 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-between px-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] shrink-0">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 opacity-50" />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface">{t('app_title_v3')}</div>
              <div className="text-[9px] font-meta-code uppercase tracking-widest text-red-400">{t('restricted_engineering_mode')}</div>
            </div>
          </div>
          <button 
            onClick={handleCompile}
            disabled={(!config.brief && engineMode !== 'face_swap') || isCompiling}
            className={`px-8 h-10 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.1)] ${
              (!config.brief && engineMode !== 'face_swap') 
                ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isCompiling ? <><RefreshCcw className="w-3 h-3 animate-spin"/> {t('injecting_payload')}</> : <><Play className="w-3 h-3 fill-current"/> {t('compile_sequence')}</>}
          </button>
        </div>

        <div className="flex-1 bg-[#050507] rounded-xl border border-white/5 overflow-hidden flex flex-col relative group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          
          <div className="h-10 bg-black/80 border-b border-white/10 flex items-center justify-between px-4 z-10 shrink-0">
            <span className="font-meta-code text-[10px] text-emerald-500">{t('terminal_output_log')}</span>
            <span className="font-meta-code text-[10px] text-gray-500">{t('tokens_allocated')}{tokens}</span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar font-meta-code text-xs leading-relaxed text-emerald-400/80 z-10">
            {(isCompiling || terminalLogs.length > 0) && (
              <div className="flex flex-col items-start gap-1 font-mono text-[11px] text-emerald-400">
                {terminalLogs.map((log, index) => (
                  <span key={index}>{log}</span>
                ))}
                {isCompiling && (
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-emerald-500/70 animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Processing execution thread...</span>
                  </div>
                )}
              </div>
            )}

            {!isCompiling && terminalLogs.length === 0 && !compiledPayload && (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-emerald-500">
                <Terminal className="w-16 h-16 mb-4 opacity-50" />
                <span className="text-[10px] uppercase tracking-widest">{t('system_idle_awaiting_config')}</span>
              </div>
            )}

            {compiledPayload && !isCompiling && (
              <div className="animate-fade-in space-y-6 mt-6 border-t border-white/5 pt-4">
                <div>
                  <span className="text-gray-500"># EXECUTED_COMMAND:</span>
                  <div className="mt-1 text-emerald-300 font-bold bg-black/50 p-3 rounded border border-emerald-500/20 break-words">
                    {compiledPayload.command}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-500"># COMPILED_METADATA_JSON:</span>
                  <pre className="mt-1 bg-black/50 p-4 rounded border border-white/5 text-gray-400 text-[10px] overflow-x-auto font-mono">
                    {JSON.stringify(compiledPayload, null, 2)}
                  </pre>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(compiledPayload, null, 2));
                      alert("JSON copied to clipboard!");
                    }}
                    className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-[9px] uppercase flex items-center gap-1 hover:bg-emerald-500/20 transition cursor-pointer"
                  >
                    <Copy className="w-3 h-3"/> {t('copy_json')}
                  </button>
                  <button 
                    onClick={() => {
                      setCompiledPayload(null);
                      setTerminalLogs([]);
                    }}
                    className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-[9px] uppercase flex items-center gap-1 hover:bg-red-500/20 transition cursor-pointer"
                  >
                    <RefreshCcw className="w-3 h-3"/> {t('clear_buffer')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CineStation;
