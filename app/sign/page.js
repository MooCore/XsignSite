import { Suspense } from 'react';
import SigningForm from '../../components/signing-form';

export const metadata = {
  title: 'IPA Signer',
  description: 'Sign iOS IPA files with your certificate, provisioning profile and optional app settings using Xsign.',
};

export default function SignPage() {
  return (
    <section className="sign-page simple-sign-page">
      <div className="page-container sign-container simple-sign-container">
        <div className="simple-sign-heading">
          <span className="simple-eyebrow">XSIGN IPA SIGNER</span>
          <h1>Sign your IPA</h1>
          <p>Add your IPA, certificate and provisioning profile below. Open advanced options only when you need to customize the app.</p>
        </div>
        <Suspense fallback={<div className="loading-panel">Loading signer…</div>}><SigningForm /></Suspense>
      </div>
    </section>
  );
}
