export const metadata = { title: 'Terms of Service', description: 'Xsign terms of service template.' };

export default function TermsPage() {
  return (
    <section className="legal-page section-pad">
      <div className="page-container legal-container">
        <span className="section-kicker">LEGAL</span>
        <h1>Terms of <span>Service.</span></h1>
        <p className="legal-updated">Last updated: November 23, 2026</p>
        <div className="legal-notice"><strong>Owner review required before launch.</strong> This is a starter terms template, not legal advice. Replace bracketed details, select the governing jurisdiction, confirm service capabilities and have the final terms reviewed for your business and intended markets.</div>
        <article className="legal-content">
          <h2>1. Agreement</h2>
          <p>These Terms of Service ("Terms") govern your access to and use of Xsign (the "Service"), operated by <strong>[Your legal name or business name]</strong> ("Xsign", "we", "us" or "our"). By accessing or using the Service, you agree to these Terms. If you do not agree, do not use the Service.</p>
          <h2>2. Eligibility and account responsibility</h2>
          <p>You must be legally able to enter into a binding agreement and satisfy the minimum age requirements that apply in your location. You are responsible for the accuracy of information you submit and for keeping your credentials secure.</p>
          <h2>3. Authorization and ownership</h2>
          <p>You may upload or modify an application, certificate, provisioning profile, icon or tweak only when you own it or have permission and legal authority to do so. You are responsible for confirming that your use complies with applicable law, software licences, developer agreements and the rights of third parties.</p>
          <h2>4. Signing credentials</h2>
          <p>You are responsible for safeguarding P12 certificates, certificate passwords and provisioning profiles. Do not submit credentials issued to another person or organization without permission. You must have the right to use the certificate and profile for the application and devices involved.</p>
          <h2>5. Acceptable use</h2>
          <p>You must not use Xsign to distribute malware, spyware, stolen applications, unauthorized modifications, harmful code or content that violates another person's rights. You must not attempt to bypass service security, overload the Service, interfere with other users, reverse engineer restricted components or use the Service for unlawful activity.</p>
          <h2>6. Signing and installation limitations</h2>
          <p>Xsign does not guarantee that an application will install, launch, remain signed, pass review or work on every device or iOS version. Signing results depend on the certificate, provisioning profile, entitlements, app structure, Apple platform requirements and device configuration. OTA installation does not bypass platform signing, device-registration or trust requirements. ProMotion and Game Mode options only add supported app metadata; they do not guarantee a particular frame rate or system behavior.</p>
          <h2>7. Files, processing and deletion</h2>
          <p>You retain your rights in files you submit. You grant Xsign a limited permission to receive, store, inspect, transform and process those files only as needed to provide and secure the Service. Files are intended to be temporary, but exact retention and deletion periods must be stated in the Privacy Policy and implemented by the operator. Do not use the Service as permanent file storage.</p>
          <h2>8. Third-party services</h2>
          <p>The Service may depend on hosting, storage and infrastructure providers. Those providers may have their own terms and availability limits. Xsign is not responsible for third-party services outside its reasonable control.</p>
          <h2>9. Availability and changes</h2>
          <p>We may change, suspend or discontinue all or part of the Service, including features, supported file types, upload limits and processing availability. We do not promise uninterrupted or error-free operation.</p>
          <h2>10. Intellectual property</h2>
          <p>The Service's branding, interface and original materials are owned by or licensed to <strong>[Your legal name or business name]</strong>. These Terms do not transfer ownership of your uploaded files or grant you rights to third-party software.</p>
          <h2>11. Disclaimers</h2>
          <p>To the maximum extent permitted by applicable law, the Service is provided "as is" and "as available" without warranties of any kind, whether express, implied or statutory. Nothing in these Terms excludes a warranty or right that cannot legally be excluded.</p>
          <h2>12. Limitation of liability</h2>
          <p>To the maximum extent permitted by applicable law, <strong>[Your legal name or business name]</strong> will not be liable for indirect, incidental, special, consequential or punitive damages, loss of data, loss of profits, app removal, certificate revocation or device incompatibility arising from use of the Service. Insert any legally required liability limits and exceptions after review.</p>
          <h2>13. Indemnity</h2>
          <p>To the extent permitted by law, you are responsible for claims arising from your files, your lack of authorization, your misuse of signing credentials or your violation of these Terms or another person's rights. Have this section reviewed for enforceability in your jurisdiction.</p>
          <h2>14. Suspension and termination</h2>
          <p>We may suspend or restrict access when reasonably necessary to protect the Service, users or third parties, address abuse, comply with law or enforce these Terms. You may stop using the Service at any time.</p>
          <h2>15. Governing law</h2>
          <p>These Terms are governed by the laws of <strong>[Province/state and country]</strong>, excluding conflict-of-law rules, except where mandatory consumer-protection laws provide otherwise. Specify the appropriate courts and dispute process after legal review.</p>
          <h2>16. Changes to these Terms</h2>
          <p>We may revise these Terms from time to time. The revised version will be posted on this page with an updated date. Continued use after changes take effect means you accept the revised Terms to the extent permitted by law.</p>
          <h2>17. Contact</h2>
          <p>Operator: <strong>[Your legal name or business name]</strong><br/>Contact email: <strong>[your contact email]</strong><br/>Address, where required: <strong>[your business address]</strong></p>
        </article>
      </div>
    </section>
  );
}
