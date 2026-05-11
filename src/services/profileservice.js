import api from "./api"

// GET /api/Profile
export async function getProfile() {
  try {
    const { data } = await api.get("/Profile")
    return { success: true, data }
  } catch (error) {
    error.service = "profile.get"
    throw error
  }
}

// PUT /api/Profile
export async function updateProfile(profileData) {
  try {
    const payload = {
      vendorName: profileData.vendorName || "",
      location: profileData.location || "",
      phoneNumber: profileData.phoneNumber || "",
      bio: profileData.bio || "",
      logoImageUrl: profileData.logoImageUrl || "",
    }

    const { data } = await api.put("/Profile", payload)
    return { success: true, data }
  } catch (error) {
    error.service = "profile.update"
    throw error
  }
}