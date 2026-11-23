import Link from 'next/link';
import Icon from '../components/icon';

const features = [
  { icon: 'sliders', title: 'Advanced configuration', body: 'Adjust app name, bundle ID, version details and supported signing options before you sign.' },
  { icon: 'shield', title: 'Certificate-aware workflow', body: 'Provide your P12 certificate, its password when required, and the matching provisioning profile.' },
  { icon: 'phone', title: 'OTA-ready results', body: 'Prepare an installation manifest and a Safari install link when the signing backend completes the job.' },
];

const steps = [
  { n: '01', title: 'Add your files', body: 'Choose an IPA, P12 certificate and mobile provisioning profile. An IPA URL can be used instead of a local IPA file.' },
  { n: '02', title: 'Configure your app', body: 'Customize app metadata, enable supported options and optionally add tweak files.' },
  { n: '03', title: 'Sign and install', body: 'The signing worker processes your request and returns the signed IPA with available download and OTA links.' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="page-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> iOS signing, made more straightforward</div>
            <h1>Your apps.<br/><span>Your settings.</span><br/>Your signature.</h1>
            <p className="hero-description">A focused IPA signing workspace with the controls you need — from certificate details to app customization and OTA-ready installation.</p>
            <div className="hero-buttons">
              <Link href="/sign" className="button button-primary button-large">Open IPA signer <Icon name="arrow" size={18}/></Link>
              <a href="#how-it-works" className="button button-secondary button-large">How it works</a>
            </div>
            <div className="hero-trust-row">
              <span><Icon name="lock" size={15}/> P12 password field</span>
              <span><Icon name="cloud" size={15}/> Direct file uploads</span>
              <span><Icon name="shield" size={15}/> Signed-job validation</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Preview of the Xsign signing interface">
            <div className="preview-orbit orbit-a"/><div className="preview-orbit orbit-b"/>
            <div className="preview-window">
              <div className="preview-window-top"><div className="preview-dots"><i/><i/><i/></div><span>XSIGN / SIGNING STUDIO</span><span className="preview-status"><b/> READY</span></div>
              <div className="preview-main">
                <div className="preview-title-row"><div><span className="preview-kicker">WORKSPACE</span><h3>Sign your IPA</h3></div><div className="preview-app-icon"><span className="brand-mark"><span/></span></div></div>
                <div className="preview-upload"><div className="preview-file-icon"><Icon name="file" size={20}/></div><div><strong>MyApplication.ipa</strong><small>IPA package · ready to configure</small></div><span className="preview-check"><Icon name="check" size={14}/></span></div>
                <div className="preview-fields"><div><small>APP NAME</small><strong>My Application</strong></div><div><small>BUNDLE IDENTIFIER</small><strong>com.example.myapp</strong></div></div>
                <div className="preview-options-title"><strong>Advanced options</strong><span>4 available</span></div>
                <div className="preview-option"><span>ProMotion support</span><span className="fake-toggle on"><i/></span></div>
                <div className="preview-option"><span>Game Mode support</span><span className="fake-toggle"><i/></span></div>
                <div className="preview-option"><span>Custom app metadata</span><span className="preview-option-state">EDIT</span></div>
                <div className="preview-cta"><span>Sign application</span><Icon name="arrow" size={15}/></div>
              </div>
            </div>
            <div className="float-chip float-chip-top"><span className="chip-icon"><Icon name="shield" size={17}/></span><span><b>Certificate ready</b><small>P12 + profile</small></span></div>
            <div className="float-chip float-chip-bottom"><span className="chip-icon chip-icon-light"><Icon name="bolt" size={17}/></span><span><b>OTA workflow</b><small>Manifest included</small></span></div>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <section className="feature-section section-pad">
        <div className="page-container">
          <div className="section-heading centered-heading"><span className="section-kicker">THE XSIGN WORKFLOW</span><h2>Everything important,<br/><span>in one signing flow.</span></h2><p>Keep the essentials together, with advanced controls available when you need them.</p></div>
          <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.title}><div className="feature-icon"><Icon name={feature.icon} size={22}/></div><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div>
        </div>
      </section>

      <section className="steps-section section-pad" id="how-it-works">
        <div className="page-container steps-layout">
          <div className="steps-intro"><span className="section-kicker">THREE SIMPLE STEPS</span><h2>From IPA to<br/><span>install-ready.</span></h2><p>Start with your application and signing credentials. Xsign organizes the remaining configuration into one clear workflow.</p><Link href="/sign" className="text-link">Go to the signer <Icon name="arrow" size={17}/></Link></div>
          <div className="steps-list">{steps.map((step) => <article className="step-item" key={step.n}><span className="step-number">{step.n}</span><div><h3>{step.title}</h3><p>{step.body}</p></div><Icon name="chevron" size={20}/></article>)}</div>
        </div>
      </section>

      <section className="cta-section">
        <div className="page-container cta-panel"><div className="cta-decoration"/><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Start with Xsign.</h2><p>Bring your IPA and signing credentials. Configure the details, then submit your signing job.</p></div><Link href="/sign" className="button button-white button-large">Open the signer <Icon name="arrow" size={18}/></Link></div>
      </section>
    </>
  );
}
