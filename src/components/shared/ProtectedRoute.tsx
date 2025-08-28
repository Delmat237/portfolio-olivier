// src/components/shared/ProtectedRoute.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingSpinner from './LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      // Vérifier le token d'authentification
      const token = localStorage.getItem('admin-token')
      const tokenExpiry = localStorage.getItem('admin-token-expiry')
      
      if (!token || !tokenExpiry) {
        setIsAuthenticated(false)
        return
      }

      // Vérifier si le token n'est pas expiré
      if (Date.now() > parseInt(tokenExpiry)) {
        localStorage.removeItem('admin-token')
        localStorage.removeItem('admin-token-expiry')
        setIsAuthenticated(false)
        return
      }

      setIsAuthenticated(true)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Vérification de l'authentification..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}