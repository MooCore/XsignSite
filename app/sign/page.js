import Link from 'next/link';
import { Suspense } from 'react';
import SigningForm from '../../components/signing-form';
import Icon from '../../components/icon';

export const metadata = {
  title: 'IPA Signer',
  description: 'Sign iOS IPA files with your certificate, provisioning profile and optional app settings using Xsign.',
};

const steps = [
  ['1', 'Add your IPA', 'Choose an IPA file or paste a direct download URL.'],
  ['2', 'Add signing files', 'Upload your P12 certificate, its password if required, and the matching mobileprovision profile.'],
  ['3', 'Customize and sign', 'Open Advanced for optional app changes, then start the signing job.'],
  ['4', 'Install or download', 'When signing is complete, use the OTA install link or download the signed IPA.'],
];

export default function SignPage() {
  return (
    <section className="x-signer-page">
      <div className="page-container x-signer-container">
        <Link href="/" className="x-signer-back"><Icon name="chevron" size={15}/> Back to home</Link>
        <header className="x-signer-heading">
          <span className="x-signer-kicker">XSIGN / TOOLS</span>
          <h1>IPA Signer</h1>
          <p>Sign your iOS apps with your own certificate and provisioning profile.</p>
        </header>
        <Suspense fallback={<div className="loading-panel">Loading signer…</div>}><SigningForm /></Suspense>

        <div className="x-signer-info-grid">
          <section className="x-signer-info-card">
            <h2>About</h2>
            <p>Xsign takes an IPA file and your signing credentials, then prepares a signed application. You can use the default settings or open Advanced to customize supported app properties.</p>
            <a href="https://discord.gg/Fapt85usjU" target="_blank" rel="noreferrer">Need help? Join the Xsign Discord <Icon name="arrow" size={14}/></a>
          </section>
          <section className="x-signer-info-card x-signer-howto">
            <h2>How to use</h2>
            <ol>{steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol>
          </section>
        </div>
      </div>
    </section>
  );
}
