import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import AuthProvider from '@/providers/auth-provider';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Monetra | Master Your Wealth',
  description: 'Track expenses, visualize wealth growth, and get personalized financial advice. The intelligent companion for your money.',
  keywords: ['finance', 'wealth tracker', 'expense tracking', 'personal finance', 'budgeting', 'money management'],
  authors: [{ name: 'Monetra Team' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://monetra.dev',
    title: 'Monetra | Master Your Wealth',
    description: 'Track expenses, visualize wealth growth, and get personalized financial advice. The intelligent companion for your money.',
    siteName: 'Monetra',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monetra | Master Your Wealth',
    description: 'Track expenses, visualize wealth growth, and get personalized financial advice. The intelligent companion for your money.',
    creator: '@monetra_dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
