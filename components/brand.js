import Link from 'next/link';

export default function Brand({ footer = false }) {
  return (
    <Link href="/" className={`brand${footer ? ' brand-footer' : ''}`} aria-label="Xsign home">
      <img className="brand-logo" src="/xsign-logo.webp" alt="Xsign" width="58" height="58" />
    </Link>
  );
}
