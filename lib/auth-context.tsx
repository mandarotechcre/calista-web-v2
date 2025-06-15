"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

type User = {
  userId: string
  username: string
  apiKey: string
  authorities: { authority: string }[]
} | null

type AuthContextType = {
  user: User
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  register: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const initializeAuth = () => {
        try {
          const storedToken = localStorage.getItem("token")
          const storedUser = localStorage.getItem("user")
          
          if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
          }
        } catch (error) {
          console.error("Initialization error:", error)
        } finally {
          setIsLoading(false)
        }
      }
      initializeAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/login", {
        username,
        password
      })
      
      if (response.data.data?.jwt) {
        const { jwt, user } = response.data.data
        localStorage.setItem("token", jwt)
        localStorage.setItem("user", JSON.stringify(user))
        setToken(jwt)
        setUser(user)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
        username,
        password
      })
      
      if (response.status === 201) {
        toast({
          title: "Registration Successful",
          description: "Account created successfully",
        })
        return true
      }
      return false
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed")
      }
      throw new Error("An unknown error occurred")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
    router.push("/login")
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      register,
      logout, 
      isAuthenticated,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}