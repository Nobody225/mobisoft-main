import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// Types pour l'utilisateur
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'merchant' | 'admin'
}

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'user' | 'merchant' | 'admin'
    companyName?: string
    businessType?: string
    businessCategory?: string
    address?: string
    phone?: string
    website?: string
    description?: string
    department?: string
    position?: string
  }) => Promise<void>
  signInWithGoogle: () => Promise<void>
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Props pour le provider
interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider pour la gestion de l'authentification
 * Gère l'état de connexion de l'utilisateur et les actions d'authentification
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('africahub-user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du statut d\'authentification:', error)
        localStorage.removeItem('africahub-user')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Fonction de connexion (simulation)
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Données utilisateur simulées
      const userData: User = {
        id: '1',
        name: 'Utilisateur Test',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        role: 'user'
      }
      
      setUser(userData)
      localStorage.setItem('africahub-user', JSON.stringify(userData))
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw new Error('Échec de la connexion')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de déconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem('africahub-user')
  }

  // Fonction d'inscription (simulation)
  const register = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    role: 'user' | 'merchant' | 'admin'
    companyName?: string
    businessType?: string
    businessCategory?: string
    address?: string
    phone?: string
    website?: string
    description?: string
    department?: string
    position?: string
  }): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Données utilisateur simulées
      const newUser: User = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role
      }
      
      setUser(newUser)
      localStorage.setItem('africahub-user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      throw new Error('Échec de l\'inscription')
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction de connexion avec Google (simulation)
  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true)
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Données utilisateur simulées
      const userData: User = {
        id: '1',
        name: 'Utilisateur Google',
        email: 'user@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        role: 'user'
      }
      
      setUser(userData)
      localStorage.setItem('africahub-user', JSON.stringify(userData))
    } catch (error) {
      console.error('Erreur lors de la connexion avec Google:', error)
      throw new Error('Échec de la connexion avec Google')
    } finally {
      setIsLoading(false)
    }
  }

  // Valeur du contexte
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    signInWithGoogle
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * Doit être utilisé à l'intérieur d'un AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}

// Export par défaut du provider
export default AuthProvider
