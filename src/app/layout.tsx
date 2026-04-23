import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import '@/styles/globals.scss'  // ← Import dari src/styles/
import '@/styles/theme.scss'    // ← Import dari src/styles/
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'ATMIFY - CV Builder dengan ATS Optimization',
  description: 'Format karir Anda dengan presisi dan lewati sistem ATS dengan mudah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}