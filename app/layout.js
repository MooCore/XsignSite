import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL('https://xsign.example');

const socialTitle = 'Xsign — iOS IPA Signing';
const socialDescription = 'Sign and customize iOS IPA apps with your own certificate, provisioning profile and optional app settings.';
const socialImage = '/xsign-twitter-card.png';

export const metadata = {
  metadataBase: siteUrl,
  title: { default: socialTitle, template: '%s | Xsign' },
  description: socialDescription,
  applicationName: 'Xsign',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/xsign-icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    siteName: 'Xsign',
    type: 'website',
    url: '/',
    images: [{ url: socialImage, width: 1200, height: 630, alt: 'Xsign — iOS IPA Signing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description: socialDescription,
    images: [{ url: socialImage, alt: 'Xsign — iOS IPA Signing' }],
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
