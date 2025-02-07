import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { User } from "../types/user"
import { authApi } from "@/services/api-auth"
import { getStoredToken, setStoredToken, removeStoredToken } from "@/utils/auth"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authApi.login(email, password)
      const { token, user: userData } = response.data
      setUser(userData)
      setStoredToken(token)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    removeStoredToken()
  }, [])

  useEffect(() => {
    const token = getStoredToken()
    if (token) {
      authApi
        .getCurrentUser()
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.error("Error fetching current user:", error)
          removeStoredToken()
        })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

