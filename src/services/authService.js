import api from "./api"  

function extractToken(data) {
  return (
    data?.token ||
    data?.jwt ||
    data?.accessToken ||
    data?.access_token ||
    data?.data?.token ||
    null
  )
}

export async function registerUser(payload) {
  try {
    const isFormData = payload instanceof FormData

    // Axios will automatically append the boundary for multipart/form-data in the browser.
    const { data } = await api.post("/Auth/register", payload)

    const token = extractToken(data)

    if (token) {
      localStorage.setItem("token", token)
    }

    return { success: true, data }
  } catch (error) {
    error.service = "auth.register"
    throw error
  }
}

export async function loginUser(credentials) {
  try {
    const { data } = await api.post("/Auth/login", {
      email: credentials.email,
      password: credentials.password,
    })

    const token = extractToken(data)

    if (token) {
      localStorage.setItem("token", token)
    }

    return { success: true, data }
  } catch (error) {
    error.service = "auth.login"
    throw error
  }
}

export function logoutUser() {
  localStorage.removeItem("token")
  localStorage.removeItem("refreshToken")
}

export function getToken() {
  return localStorage.getItem("token")
}

export function isAuthenticated() {
  return !!getToken()
}