import api from "./api"

// GET /api/Vendors
export async function getVendors() {
  try {
    const { data } = await api.get("/Vendors")
    return { success: true, data }
  } catch (error) {
    error.service = "vendors.getAll"
    throw error
  }
}