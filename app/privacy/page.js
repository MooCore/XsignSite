export const metadata = { title: 'Privacy Policy', description: 'Xsign privacy policy template.' };

export default function PrivacyPage() {
  return (
    <section className="legal-page section-pad">
      <div className="page-container legal-container">
        <span className="section-kicker">LEGAL</span>
        <h1>Privacy <span>Policy.</span></h1>
        <p className="legal-updated">Last updated: November 23, 2026</p>
        <div className="legal-notice"><strong>Owner review required before launch.</strong> This is a starter policy for the planned Xsign workflow, not legal advice. Replace the bracketed operator/contact details and ensure the statements match the deployed backend, storage configuration, retention schedule and analytics tools before making the site public.</div>
        <article className="legal-content">
          <h2>1. Who operates Xsign</h2>
          <p>Xsign ("we", "us" or "our") is operated by <strong>[Your legal name or business name]</strong>. For privacy questions or requests, contact <strong>[your privacy contact email]</strong>.</p>
          <h2>2. Information processed</h2>
          <p>Depending on the features you use, Xsign may process:</p>
          <ul><li>IPA files, app icons, tweak files and related application metadata;</li><li>P12 certificate files, provisioning profiles and the P12 password you submit for a signing job;</li><li>signing-job identifiers, status, timestamps, error details and generated output links;</li><li>technical request information such as IP address, browser information and security logs collected by the hosting or backend providers.</li></ul>
          <h2>3. How information is used</h2>
          <p>Information is used to authenticate and protect service requests, receive files, validate signing inputs, process the signing job, return the result, troubleshoot errors, prevent abuse and maintain the service.</p>
          <h2>4. Certificates and passwords</h2>
          <p>Your P12 certificate and provisioning profile are sensitive signing materials. The Xsign web interface sends the P12 password to the signing API only when you submit a job; the interface does not intentionally store it in browser local storage. The backend must be configured not to write passwords, certificate contents or authorization headers to application logs. Do not upload credentials unless you are authorized to use them.</p>
          <h2>5. File storage and retention</h2>
          <p>Uploaded files and signing outputs are intended to be held in private object storage for processing and delivery. The production backend must enforce a documented retention period, delete expired objects and remove temporary working files. <strong>Before launch, insert the actual retention periods here for source IPAs, certificates, provisioning profiles, tweak files, signed IPAs, manifests, logs and backups.</strong> Do not rely on this draft as proof that automatic deletion is already active.</p>
          <h2>6. Service providers</h2>
          <p>The planned hosting arrangement may use Vercel for the website, Render for API and signing workers, and Tigris for object storage. Those providers may process technical data to deliver their services. Update this section if you add analytics, error reporting, payment, email or other third-party services.</p>
          <h2>7. Sharing and disclosure</h2>
          <p>We do not intend to sell uploaded signing files or certificate passwords. Information may be disclosed to service providers that support Xsign, when required by law, to protect users or the service, or as part of a business transfer. Specify any additional sharing before launch.</p>
          <h2>8. Security</h2>
          <p>We intend to use HTTPS, restricted object access, short-lived upload links, access controls and limited logging. No internet service can guarantee absolute security. The operator must verify these controls in the deployed environment.</p>
          <h2>9. Your choices and requests</h2>
          <p>Depending on the laws that apply to you, you may have rights to request access, correction or deletion of personal information. Send requests to <strong>[your privacy contact email]</strong>. We may need to verify your identity and retain limited records where legally permitted or required.</p>
          <h2>10. Children</h2>
          <p>Xsign is not designed for children who are below the minimum age required to use the service under applicable law. Do not submit another person's personal information or signing credentials without authorization.</p>
          <h2>11. International processing</h2>
          <p>Your information may be processed in countries where our hosting and storage providers operate. Add any required transfer disclosures and safeguards for the jurisdictions in which you offer Xsign.</p>
          <h2>12. Changes</h2>
          <p>We may update this policy as the service changes. The date at the top indicates when this page was last revised. Material changes should be communicated where required by law.</p>
          <h2>13. Contact</h2>
          <p>Privacy contact: <strong>[your privacy contact email]</strong><br/>Operator: <strong>[Your legal name or business name]</strong><br/>Business address, where required: <strong>[your business address]</strong></p>
        </article>
      </div>
    </section>
  );
}
