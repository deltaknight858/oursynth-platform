import type { Metadata } from 'next'
import ResponsiveNav from '@/components/ResponsiveNav'
import CommandCenter from '@packages/ui/src/components/CommandCenter';
import GlobalBottomNavBar from '@packages/ui/src/components/GlobalBottomNavBar'
import StyledComponentsRegistry from '@/lib/styled-components-registry'
import './globals.css'

export const metadata: Metadata = {
  title: 'OurSynth',
  description: 'Advanced audio synthesis platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className="app-background"
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          background: 'var(--background-primary)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-primary)',
        }}
      >
        <StyledComponentsRegistry>
          <div className="app-container" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <ResponsiveNav />
            <main style={{
              flex: 1,
              padding: 'var(--spacing-md)',
            }}>
              {children}
            </main>
            <CommandCenter appContext="studio" />
            <GlobalBottomNavBar />
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
