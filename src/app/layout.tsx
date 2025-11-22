import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: 'Axiom Trade - Token Discovery',
  description: 'Real-time token trading table with live price updates and advanced filtering',
  keywords: 'crypto, tokens, trading, axiom, defi, blockchain',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
