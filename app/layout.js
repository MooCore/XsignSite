import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

export const metadata = {
  title: {
    default: 'Xsign — iOS IPA Signing',
    template: '%s | Xsign',
  },
  description: 'A streamlined workspace for configuring and signing iOS IPA applications.',
  applicationName: 'Xsign',
  icons: { icon: '/xsign-mark.svg', shortcut: '/xsign-mark.svg' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://xsign.example'),
  openGraph: {
    title: 'Xsign — iOS IPA Signing',
    description: 'Configure, sign and prepare iOS apps for installation.',
    siteName: 'Xsign',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
