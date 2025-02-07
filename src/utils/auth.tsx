import { jwtDecode } from "jwt-decode"

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export const setStoredToken = (token: string): void => {
  localStorage.setItem("token", token)
}

export const removeStoredToken = (): void => {
  localStorage.removeItem("token")
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp ? decodedToken.exp > currentTime : false
  } catch {
    return false
  }
}

export const getAuthorizationHeader = (): { Authorization: string } | Record<string, never> => {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

