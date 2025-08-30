import type { Metadata,Viewport } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import AuthProvider from "@/contexts/AuthContext";


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});


export const metadata: Metadata = {
title: 'Olivier Mogonel - Ingénieur Génie Civil & Mathématiques',
  description: 'Portfolio professionnel d\'Olivier Mogonel, étudiant ingénieur en Génie Civil à l\'École Nationale Supérieure Polytechnique de Yaoundé et Master en Mathématiques option Analyse et Applications.',
  keywords: [
    'Olivier Mogonel',
    'Génie Civil',
    'Mathématiques',
    'Ingénieur',
    'École Nationale Supérieure Polytechnique',
    'Yaoundé',
    'Cameroun',
    'Analyse et Applications',
    'Portfolio'
  ],
  authors: [{ name: 'AZANGUE LEONEL' }],
  creator: 'AZANGUE LEONEL',
  metadataBase: new URL('https://olivier-mogonel.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://olivier-mogonel.vercel.app',
    title: 'Olivier Mogonel - Ingénieur Génie Civil & Mathématiques',
    description: 'Portfolio professionnel d\'Olivier Mogonel, étudiant ingénieur spécialisé en Génie Civil et Mathématiques appliquées.',
    siteName: 'Portfolio Olivier Mogonel'
    
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olivier Mogonel - Ingénieur Génie Civil & Mathématiques',
    description: 'Portfolio professionnel d\'Olivier Mogonel, étudiant ingénieur spécialisé en Génie Civil et Mathématiques appliquées.',

  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6'
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-sky-50">
          {/* Patterns de fond */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-sky-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          </div>
          
          {/* Contenu principal */}
          <div className="relative z-10">
            <AuthProvider>{children}</AuthProvider>
          </div>
        </div>
        
        {/* Toaster pour les notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  )
}
