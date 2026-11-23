import Link from 'next/link';
import Icon from '../components/icon';

const highlights = [
  ['1', 'Upload your files', 'Add your IPA, P12 certificate and mobile provisioning profile.'],
  ['2', 'Set your options', 'Adjust app details and optional signing settings when needed.'],
  ['3', 'Sign and install', 'Submit the job and use the download or OTA link when it is ready.'],
];

export default function HomePage() {
  return (
    <>
      <section className="simple-home-hero">
        <div className="page-container simple-home-content">
          <span className="simple-eyebrow">iOS IPA SIGNING</span>
          <h1>Sign your iOS apps with <span>Xsign.</span></h1>
          <p>Upload your app and signing credentials, customize the details you need, and prepare an IPA for installation.</p>
          <div className="simple-home-actions">
            <Link href="/sign" className="button button-primary button-large">Open IPA signer <Icon name="arrow" size={17}/></Link>
            <a href="https://discord.gg/Fapt85usjU" className="button button-secondary button-large" target="_blank" rel="noreferrer">Discord support</a>
          </div>
          <div className="simple-home-note"><Icon name="shield" size={16}/> Use certificates and provisioning profiles you are authorized to use.</div>
        </div>
      </section>

      <section className="simple-steps-section">
        <div className="page-container">
          <div className="simple-section-heading">
            <span className="simple-eyebrow">HOW IT WORKS</span>
            <h2>A straightforward signing process</h2>
          </div>
          <div className="simple-step-grid">
            {highlights.map(([number, title, description]) => (
              <article className="simple-step-card" key={number}>
                <span className="simple-step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
