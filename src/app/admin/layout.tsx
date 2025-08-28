// src/app/admin/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administration - Olivier Mogonel',
  description: 'Panel d\'administration du portfolio',
  robots: {
    index: false,
    follow: false
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-sky-200">
      {children}
    </div>
  )
}