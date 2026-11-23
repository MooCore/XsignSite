'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Brand from './brand';
import Icon from './icon';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/sign', label: 'IPA Signer' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ];

  return (
    <header className="site-header">
      <div className="header-inner page-container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'nav-link active' : 'nav-link'}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/sign" className="button button-primary button-small">Start signing <Icon name="arrow" size={16}/></Link>
          <button type="button" className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={21}/>
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav page-container" aria-label="Mobile navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={pathname === link.href ? 'mobile-nav-link active' : 'mobile-nav-link'}>{link.label}<Icon name="chevron" size={17}/></Link>)}</nav>}
    </header>
  );
}
