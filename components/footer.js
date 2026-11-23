import Link from 'next/link';
import Brand from './brand';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-top">
        <div className="footer-about">
          <Brand footer />
          <p>Prepare, customize and sign your iOS apps with a clear, streamlined workflow.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Explore</span>
          <Link href="/">Home</Link>
          <Link href="/sign">IPA Signer</Link>
        </div>
        <div className="footer-links">
          <span className="footer-label">Legal</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="page-container footer-bottom">
        <span>© {new Date().getFullYear()} Xsign. All rights reserved.</span>
        <span>Independent signing utility. Not affiliated with Apple.</span>
      </div>
    </footer>
  );
}
