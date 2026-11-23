import { Suspense } from 'react';
import SigningForm from '../../components/signing-form';

export const metadata = {
  title: 'IPA Signer',
  description: 'Upload an IPA and signing credentials, configure app options, and submit a signing job with Xsign.',
};

export default function SignPage() {
  return (
    <section className="sign-page section-pad">
      <div className="page-container sign-container">
        <div className="sign-page-heading">
          <span className="section-kicker">XSIGN SIGNING STUDIO</span>
          <h1>Sign your <span>IPA.</span></h1>
          <p>Provide your app and signing credentials, then adjust the options you need. Your P12 password is requested separately and is not saved in this browser.</p>
        </div>
        <Suspense fallback={<div className="loading-panel">Loading signer…</div>}><SigningForm /></Suspense>
      </div>
    </section>
  );
}
