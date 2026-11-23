import Link from 'next/link';
import Icon from '../components/icon';

const features = [
  { icon: 'upload', title: 'Simple file uploads', description: 'Upload an IPA or provide a direct download URL, then add your signing files.' },
  { icon: 'sliders', title: 'Advanced options', description: 'Customize app details, display settings and supported tweak files when needed.' },
  { icon: 'phone', title: 'OTA installation', description: 'Get an install link and direct IPA download after the signing job completes.' },
];

export default function HomePage() {
  return (
    <>
      <section className="x-home-hero">
        <div className="page-container x-home-grid">
          <div className="x-home-copy">
            <span className="x-home-kicker"><i/> WEB IPA SIGNER</span>
            <h1>Sign your iOS apps <span>with ease.</span></h1>
            <p>Xsign is a straightforward IPA signing tool. Add your app, certificate and provisioning profile, then customize only what you need.</p>
            <div className="x-home-actions">
              <Link href="/sign" className="button button-primary button-large">Open IPA signer <Icon name="arrow" size={17}/></Link>
              <a href="https://discord.gg/Fapt85usjU" className="button button-secondary button-large" target="_blank" rel="noreferrer">Discord support</a>
            </div>
            <div className="x-home-trust"><Icon name="shield" size={15}/> Use certificates and provisioning profiles you are authorized to use.</div>
          </div>

          <div className="x-home-preview" aria-label="Xsign signer preview">
            <div className="x-preview-top"><span className="x-preview-brand"><span className="x-preview-mark">X</span> Xsign</span><span className="x-preview-status"><i/> Ready</span></div>
            <div className="x-preview-body">
              <div className="x-preview-title"><div><small>TOOL</small><h2>IPA Signer</h2></div><span className="x-preview-file-icon"><Icon name="file" size={19}/></span></div>
              <div className="x-preview-upload"><span><Icon name="upload" size={18}/></span><div><strong>Choose .ipa file</strong><small>or paste a direct IPA URL</small></div></div>
              <div className="x-preview-files"><div><small>CERTIFICATE</small><strong><Icon name="file" size={13}/> .p12 file</strong></div><div><small>PROFILE</small><strong><Icon name="file" size={13}/> .mobileprovision</strong></div></div>
              <div className="x-preview-advanced"><Icon name="sliders" size={15}/> Advanced options <Icon name="chevron" size={14}/></div>
              <div className="x-preview-sign">Sign IPA <Icon name="arrow" size={15}/></div>
            </div>
          </div>
        </div>
      </section>

      <section className="x-home-features">
        <div className="page-container">
          <div className="x-home-section-heading"><span>XSIGN TOOLS</span><h2>Everything you need to sign</h2><p>A simple workflow, with extra controls available when you need them.</p></div>
          <div className="x-home-feature-grid">
            {features.map((feature) => <article className="x-home-feature" key={feature.title}><span className="x-feature-icon"><Icon name={feature.icon} size={18}/></span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
          </div>
          <div className="x-home-bottom-cta"><div><strong>Ready to sign an app?</strong><span>Open the signer to get started.</span></div><Link href="/sign" className="button button-primary">Go to signer <Icon name="arrow" size={16}/></Link></div>
        </div>
      </section>
    </>
  );
}
