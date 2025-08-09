import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
// import GlobalBottomNavBar from 'packages/ui/src/components/GlobalBottomNavBar';
// import CommandCenter from 'packages/ui/src/components/CommandCenter';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          {/* <CommandCenter appContext="domains" /> */}
          {/* <GlobalBottomNavBar /> */}
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  )
}
