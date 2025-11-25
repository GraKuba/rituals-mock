import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import MobileFrame from '@/components/mobile-frame'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rituals - Self-Care Moments',
  description: 'Discover premium self-care rituals and luxury wellness products from Rituals. Transform your daily moments into meaningful rituals.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <MobileFrame>
            {children}
          </MobileFrame>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
