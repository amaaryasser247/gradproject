import api from "./api"

// GET /api/Categories
export async function getCategories() {
  try {
    const { data } = await api.get("/Categories")
    return { success: true, data }
  } catch (error) {
    error.service = "categories.getAll"
    throw error
  }
}

// POST /api/Categories
export async function createCategory(name) {
  try {
    const { data } = await api.post("/Categories", { name })
    return { success: true, data }
  } catch (error) {
    error.service = "categories.create"
    throw error
  }
}