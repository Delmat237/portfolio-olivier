// src/hooks/useAuth.ts
'use client'

import { useState, useCallback } from 'react'

interface User {
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin-token')
      const tokenExpiry = localStorage.getItem('admin-token-expiry')
      const userStr = localStorage.getItem('admin-user')

      if (!token || !tokenExpiry || !userStr) {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false })
        return
      }

      // Vérifier l'expiration du token
      if (Date.now() > parseInt(tokenExpiry)) {
        logout()
        return
      }

      const user = JSON.parse(userStr)
      setAuthState({ user, isAuthenticated: true, isLoading: false })
    } catch (error) {
      console.error('Error checking auth:', error)
      logout()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Identifiants incorrects')
      }

      const { user, token, expiresIn } = await response.json()
      const expiry = Date.now() + expiresIn

      // Sauvegarder dans localStorage
      localStorage.setItem('admin-token', token)
      localStorage.setItem('admin-token-expiry', expiry.toString())
      localStorage.setItem('admin-user', JSON.stringify(user))

      setAuthState({ user, isAuthenticated: true, isLoading: false })
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de connexion' 
      }
    }
  }

  const logout = useCallback(() => {
    localStorage.removeItem('admin-token')
    localStorage.removeItem('admin-token-expiry')
    localStorage.removeItem('admin-user')
    setAuthState({ user: null, isAuthenticated: false, isLoading: false })
  }, [])

  return {
    ...authState,
    login,
    logout,
    checkAuth
  }
}