import Link from 'next/link';

export default function Brand({ footer = false }) {
  return (
    <Link href="/" className={`brand${footer ? ' brand-footer' : ''}`} aria-label="Xsign home">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      <span className="brand-word">Xsign</span>
    </Link>
  );
}
