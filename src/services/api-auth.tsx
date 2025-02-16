import axios from "axios"
import { getAuthorizationHeader } from "@/utils/auth" // Import the getAuthorizationHeader function
import type { User } from "@/types/user" // Import the User type

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
})

api.interceptors.request.use((config) => {
  const authHeader = getAuthorizationHeader()
  if (config.headers) {
    Object.entries(authHeader).forEach(([key, value]) => {
      config.headers!.set(key, value as string);
    });
  }
  return config
})

export const authApi = {
  login: (identifier: string, password: string) => api.post("/login", { identifier, password }),

  getCurrentUser: () => api.get("/user"),

  // Add other auth-related API calls here
}

export const userApi = {
  updateProfile: (userData: Partial<User>) => api.put("/user", userData),

  // Add other user-related API calls here
}

// Add other API services as needed

export default api

