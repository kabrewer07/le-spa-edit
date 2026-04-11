import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Le Spa Edit — Curated Spa Discovery',
  description: 'Thoughtfully curated spa experiences in Sonoma County and beyond.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // data-theme="dark"
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          try {
            var saved = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var isDark = saved ? saved === 'dark' : prefersDark;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
          } catch(e) {}
        })();
      `}} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}