import { toast } from "@/hooks/use-toast"

const API_BASE_URL = "http://localhost:8080/api/v1"

export class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    }

    try {
      // DEVELOPMENT MODE - Return mock data instead of actual API calls
      console.log(`Mock API call to: ${endpoint}`)

      // Mock responses for different endpoints

      const response = await fetch(url, { ...options, headers })

      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem("auth_token")
        localStorage.removeItem("auth_user")
        window.location.href = "/login"
        return null
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
      
    } catch (error) {
      console.error("API request failed:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  async getCycles() {
    return this.request("/cycles")
  }

  async createCycle(cycleData: any) {
    return this.request("/cycles", {
      method: "POST",
      body: JSON.stringify(cycleData),
    })
  }

  async updateCycle(cycleId: string, cycleData: any) {
    return this.request(`/cycles/${cycleId}`, {
      method: "PUT",
      body: JSON.stringify(cycleData),
    })
  }

  async getPrediction(cycleId: string) {
    return this.request(`/cycles/${cycleId}/predict`)
  }

  
}

export const apiClient = new ApiClient()
