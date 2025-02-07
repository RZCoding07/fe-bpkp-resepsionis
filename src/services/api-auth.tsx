import axios from "axios"
import { getAuthorizationHeader } from "@/utils/auth" // Import the getAuthorizationHeader function
import type { User } from "@/types/user" // Import the User type

const api = axios.create({
  baseURL: "https://your-api-url.com", // Replace with your API URL
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
  login: (email: string, password: string) => api.post("/login", { email, password }),

  getCurrentUser: () => api.get("/user"),

  // Add other auth-related API calls here
}

export const userApi = {
  updateProfile: (userData: Partial<User>) => api.put("/user", userData),

  // Add other user-related API calls here
}

// Add other API services as needed

export default api

