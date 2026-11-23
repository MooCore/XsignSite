'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './icon';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FilePicker({ label, hint, accept, file, onChange, multiple = false, required = false, compact = false }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const files = file ? (multiple ? Array.from(file) : [file]) : [];
  const update = (list) => onChange(multiple ? Array.from(list || []) : (list?.[0] || null));

  return (
    <div className={`field-block${compact ? ' field-block-compact' : ''}`}>
      <div className="field-heading"><label>{label}{required && <span className="required-mark"> *</span>}</label>{hint && <span className="field-hint">{hint}</span>}</div>
      <div className={`file-drop${dragging ? ' dragging' : ''}${files.length ? ' has-file' : ''}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); update(event.dataTransfer.files); }}>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(event) => update(event.target.files)} aria-label={label} />
        {files.length ? <div className="selected-files">{files.map((selected, index) => <div className="selected-file" key={`${selected.name}-${index}`}><span className="selected-file-icon"><Icon name="file" size={17}/></span><span className="selected-file-info"><strong>{selected.name}</strong><small>{formatBytes(selected.size)}</small></span><button type="button" className="remove-file" onClick={() => { if (multiple) update(files.filter((_, i) => i !== index)); else update(null); }}>Remove</button></div>)}</div> : <button type="button" className="file-pick-content" onClick={() => inputRef.current?.click()}><span className="upload-icon"><Icon name="upload" size={21}/></span><span><strong>Choose a file <em>or drop it here</em></strong><small>{hint || 'Select a file from your device'}</small></span></button>}
        {files.length > 0 && <button type="button" className="add-more-files" onClick={() => inputRef.current?.click()}>{multiple ? 'Add more files' : 'Replace file'}</button>}
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, hint, type = 'text', required = false, autoComplete = 'off' }) {
  return <div className="field-block"><div className="field-heading"><label>{label}{required && <span className="required-mark"> *</span>}</label>{hint && <span className="field-hint">{hint}</span>}</div><input className="text-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} /></div>;
}

function Switch({ label, description, checked, onChange, tag }) {
  return <label className="switch-row"><span className="switch-copy"><span className="switch-title">{label}{tag && <span className="switch-tag">{tag}</span>}</span>{description && <small>{description}</small>}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><span className="switch-control" aria-hidden="true"><i/></span></label>;
}

async function readError(response) {
  try {
    const body = await response.json();
    return body.message || body.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

async function uploadOne(file, purpose, onProgress) {
  const presignResponse = await fetch(`${API_BASE}/v1/uploads/presign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    body: JSON.stringify({ fileName: file.name, contentType: file.type || 'application/octet-stream', size: file.size, purpose }),
  });
  if (!presignResponse.ok) throw new Error(await readError(presignResponse));
  const presign = await presignResponse.json();
  if (!presign.uploadUrl || !presign.objectKey) throw new Error('The signing API returned an incomplete upload response.');
  onProgress?.(`Uploading ${file.name}…`);
  const headers = { ...(presign.headers || {}) };
  if (!Object.keys(headers).some((key) => key.toLowerCase() === 'content-type')) headers['Content-Type'] = file.type || 'application/octet-stream';
  const putResponse = await fetch(presign.uploadUrl, { method: 'PUT', headers, body: file, credentials: 'omit' });
  if (!putResponse.ok) throw new Error(`Could not upload ${file.name} (${putResponse.status}). Check Tigris CORS and the upload URL configuration.`);
  return presign.objectKey;
}

export default function SigningForm() {
  const [ipaFile, setIpaFile] = useState(null);
  const [ipaUrl, setIpaUrl] = useState('');
  const [p12File, setP12File] = useState(null);
  const [p12Password, setP12Password] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [tweakFiles, setTweakFiles] = useState([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [appName, setAppName] = useState('');
  const [bundleId, setBundleId] = useState('');
  const [appVersion, setAppVersion] = useState('');
  const [buildNumber, setBuildNumber] = useState('');
  const [minimumIOS, setMinimumIOS] = useState('');
  const [proMotion, setProMotion] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [removeExtensions, setRemoveExtensions] = useState(false);
  const [removeWatchApp, setRemoveWatchApp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [jobId, setJobId] = useState('');

  const selectedFileCount = useMemo(() => [ipaFile, p12File, profileFile, iconFile, ...tweakFiles].filter(Boolean).length, [ipaFile, p12File, profileFile, iconFile, tweakFiles]);

  useEffect(() => {
    if (!jobId || !API_BASE) return undefined;
    let cancelled = false;
    let timeout;
    const poll = async () => {
      try {
        const response = await fetch(`${API_BASE}/v1/signing/jobs/${encodeURIComponent(jobId)}`, { cache: 'no-store', credentials: 'omit' });
        if (!response.ok) throw new Error(await readError(response));
        const body = await response.json();
        if (cancelled) return;
        const nextProgress = Number(body.progress ?? (body.status === 'completed' ? 100 : 0));
        setProgress(Math.max(0, Math.min(100, nextProgress)));
        setStage(body.stage || body.status || 'Processing');
        if (body.status === 'completed') {
          setResult(body.result || {});
          setBusy(false);
          setStage('Signing completed');
          setProgress(100);
          return;
        }
        if (body.status === 'failed' || body.status === 'cancelled') {
          setError(body.error || 'The signing job did not complete.');
          setBusy(false);
          return;
        }
        timeout = setTimeout(poll, 2200);
      } catch (pollError) {
        if (cancelled) return;
        setError(pollError.message || 'Unable to check signing status.');
        setBusy(false);
      }
    };
    poll();
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [jobId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); setResult(null); setJobId(''); setProgress(0);
    if (!API_BASE) { setError('The signing API is not configured yet. Add NEXT_PUBLIC_API_BASE_URL to the Vercel project settings after deploying the Render backend.'); return; }
    if (!ipaFile && !ipaUrl.trim()) { setError('Choose an IPA file or enter an IPA URL.'); return; }
    if (ipaFile && ipaUrl.trim()) { setError('Use either an uploaded IPA file or an IPA URL, not both.'); return; }
    if (!p12File || !profileFile) { setError('Upload both your P12 certificate and mobile provisioning profile.'); return; }
    if (ipaUrl.trim()) {
      try { const parsed = new URL(ipaUrl.trim()); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); }
      catch { setError('Enter a valid HTTP or HTTPS IPA URL.'); return; }
    }

    setBusy(true); setStage('Preparing uploads');
    try {
      let ipaObjectKey = null;
      if (ipaFile) ipaObjectKey = await uploadOne(ipaFile, 'ipa', setStage);
      const p12ObjectKey = await uploadOne(p12File, 'p12', setStage);
      const mobileprovisionObjectKey = await uploadOne(profileFile, 'mobileprovision', setStage);
      const iconObjectKey = iconFile ? await uploadOne(iconFile, 'app-icon', setStage) : null;
      const tweakObjectKeys = [];
      for (const file of tweakFiles) tweakObjectKeys.push(await uploadOne(file, 'tweak', setStage));

      setStage('Creating signing job');
      const createResponse = await fetch(`${API_BASE}/v1/signing/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        body: JSON.stringify({
          inputs: { ipaObjectKey, ipaUrl: ipaUrl.trim() || null, p12ObjectKey, mobileprovisionObjectKey, iconObjectKey, tweakObjectKeys },
          p12Password,
          options: { appName: appName.trim() || null, bundleId: bundleId.trim() || null, appVersion: appVersion.trim() || null, buildNumber: buildNumber.trim() || null, minimumIOS: minimumIOS.trim() || null, proMotion, gameMode, removeExtensions, removeWatchApp },
        }),
      });
      if (!createResponse.ok) throw new Error(await readError(createResponse));
      const created = await createResponse.json();
      if (!created.jobId) throw new Error('The signing API did not return a job ID.');
      setJobId(created.jobId);
      setStage(created.stage || 'Queued for signing');
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit the signing job.');
      setBusy(false);
    }
  };

  const resetForm = () => {
    setIpaFile(null); setIpaUrl(''); setP12File(null); setP12Password(''); setProfileFile(null); setIconFile(null); setTweakFiles([]);
    setAppName(''); setBundleId(''); setAppVersion(''); setBuildNumber(''); setMinimumIOS(''); setProMotion(false); setGameMode(false); setRemoveExtensions(false); setRemoveWatchApp(false);
    setBusy(false); setStage(''); setProgress(0); setError(''); setResult(null); setJobId('');
  };

  return (
    <div className="signing-layout signing-layout-simple">
      <form className="signing-form" onSubmit={handleSubmit}>
        <section className="form-card signing-panel">
          <div className="signing-panel-heading">
            <div>
              <h2>Signing files</h2>
              <p>IPA, certificate and provisioning profile</p>
            </div>
            <span className="required-caption">* Required</span>
          </div>

          <div className="signing-file-section">
            <FilePicker label="IPA file" hint=".ipa file" accept=".ipa,application/octet-stream" file={ipaFile} onChange={setIpaFile} />
            <div className="or-divider"><span>OR USE AN IPA URL</span></div>
            <FormField label="IPA URL" value={ipaUrl} onChange={setIpaUrl} placeholder="https://example.com/application.ipa" hint="Optional — use instead of an uploaded IPA" />
          </div>

          <div className="signing-file-section signing-credentials-section">
            <FilePicker label="P12 certificate" hint=".p12 or .pfx certificate file" accept=".p12,.pfx,application/x-pkcs12" file={p12File} onChange={setP12File} required />
            <div className="field-block password-field-block">
              <div className="field-heading"><label htmlFor="p12-password">P12 password</label><span className="field-hint">Only needed for a password-protected certificate</span></div>
              <div className="password-input-wrap">
                <input id="p12-password" className="text-input" type={showPassword ? 'text' : 'password'} value={p12Password} onChange={(event) => setP12Password(event.target.value)} placeholder="Enter P12 password" autoComplete="new-password" />
                <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide P12 password' : 'Show P12 password'}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={17}/></button>
              </div>
              <div className="privacy-hint"><Icon name="lock" size={13}/> Sent with the signing request and not saved in browser storage.</div>
            </div>
            <FilePicker label="Mobileprovision" hint=".mobileprovision profile" accept=".mobileprovision,application/octet-stream" file={profileFile} onChange={setProfileFile} required />
          </div>

          <section className="advanced-inline">
            <button type="button" className="advanced-heading advanced-heading-compact" onClick={() => setAdvancedOpen(!advancedOpen)} aria-expanded={advancedOpen}>
              <span className="advanced-heading-copy"><Icon name="sliders" size={17}/><span><strong>Advanced options</strong><small>App details, display settings and tweaks</small></span></span>
              <span className={`accordion-chevron${advancedOpen ? ' expanded' : ''}`}><Icon name="chevron" size={17}/></span>
            </button>
            {advancedOpen && <div className="advanced-content advanced-content-compact">
              <div className="subsection-heading"><h3>App information</h3><span>Leave blank to keep detected values</span></div>
              <div className="form-grid-two">
                <FormField label="App name" value={appName} onChange={setAppName} placeholder="My App"/>
                <FormField label="Bundle identifier" value={bundleId} onChange={setBundleId} placeholder="com.example.app"/>
                <FormField label="App version" value={appVersion} onChange={setAppVersion} placeholder="1.0.0"/>
                <FormField label="Build number" value={buildNumber} onChange={setBuildNumber} placeholder="1"/>
                <FormField label="Minimum iOS version" value={minimumIOS} onChange={setMinimumIOS} placeholder="15.0" hint="Only set a value supported by the app"/>
              </div>
              <div className="subsection-heading subsection-spaced"><h3>Display and gaming</h3><span>Optional Info.plist settings</span></div>
              <div className="switch-list">
                <Switch label="ProMotion support" description="Add the high-refresh-rate support property. This does not force 120 FPS." checked={proMotion} onChange={setProMotion}/>
                <Switch label="Game Mode support" description="Declare Game Mode support for compatible iOS versions." checked={gameMode} onChange={setGameMode}/>
              </div>
              <div className="subsection-heading subsection-spaced"><h3>Application contents</h3><span>Optional cleanup</span></div>
              <div className="switch-list">
                <Switch label="Remove app extensions" description="Ask the signing worker to remove embedded app extensions where supported." checked={removeExtensions} onChange={setRemoveExtensions}/>
                <Switch label="Remove bundled Watch app" description="Ask the signing worker to remove the embedded Watch app where supported." checked={removeWatchApp} onChange={setRemoveWatchApp}/>
              </div>
              <div className="subsection-heading subsection-spaced"><h3>Additional files</h3><span>Optional icon and tweaks</span></div>
              <FilePicker label="App icon" hint="PNG or JPG · square image recommended" accept=".png,.jpg,.jpeg,image/png,image/jpeg" file={iconFile} onChange={setIconFile} compact/>
              <div className="tweak-upload-space"><FilePicker label="Add Tweaks (.deb / .dylib)" hint="Select one or more .deb or .dylib files" accept=".deb,.dylib,application/octet-stream" file={tweakFiles} onChange={setTweakFiles} multiple compact/></div>
            </div>}
          </section>

          {error && <div className="form-alert form-alert-error" role="alert"><Icon name="info" size={17}/><span>{error}</span></div>}
          {busy && <div className="progress-card" aria-live="polite"><div className="progress-head"><span><i className="progress-spinner"/>{stage || 'Processing'}</span><strong>{progress}%</strong></div><div className="progress-track"><i style={{ width: `${progress}%` }}/></div><small>{jobId ? `Job ID: ${jobId}` : 'Preparing your files for the signing worker.'}</small></div>}
          {result && <div className="result-card" role="status"><div className="result-icon"><Icon name="check" size={19}/></div><div className="result-content"><h3>Your signed IPA is ready</h3><p>Signing completed successfully. Use the available links below.</p><div className="result-links">{(result.installUrl || result.otaUrl) && <a className="button button-primary" href={result.installUrl || result.otaUrl}>Install via OTA <Icon name="phone" size={15}/></a>}{(result.downloadUrl || result.ipaUrl) && <a className="button button-secondary" href={result.downloadUrl || result.ipaUrl} target="_blank" rel="noreferrer">Download IPA <Icon name="arrow" size={15}/></a>}{result.manifestUrl && <a className="result-text-link" href={result.manifestUrl} target="_blank" rel="noreferrer">View manifest</a>}</div></div></div>}
          <div className="submit-row submit-row-compact">
            <div className="submit-note"><Icon name="lock" size={13}/><span>{selectedFileCount} file{selectedFileCount === 1 ? '' : 's'} selected</span></div>
            <button type="submit" className="button button-primary button-large submit-button" disabled={busy}>{busy ? <><i className="button-spinner"/> Signing…</> : <>Sign application <Icon name="arrow" size={17}/></>}</button>
          </div>
          {result && <button type="button" className="start-another-button" onClick={resetForm}>Start another signing job</button>}
        </section>
      </form>
    </div>
  );
}
