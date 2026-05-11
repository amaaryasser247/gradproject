import api from "./api"

// POST /api/Projects
export async function createProject(projectData) {
  try {
    const formData = new FormData()
    formData.append("Name", projectData.name)
    formData.append("RoomType", projectData.roomType)
    formData.append("Budget", projectData.budget)

    if (projectData.image) {
      formData.append("Image", projectData.image)
    }

    const { data } = await api.post("/Projects", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    return { success: true, data }
  } catch (error) {
    error.service = "projects.create"
    throw error
  }
}

// GET /api/Projects
export async function getProjects() {
  try {
    const { data } = await api.get("/Projects")
    return { success: true, data }
  } catch (error) {
    error.service = "projects.getAll"
    throw error
  }
}

// GET /api/Projects/{projectId}
export async function getProjectById(projectId) {
  try {
    const { data } = await api.get(`/Projects/${projectId}`)
    return { success: true, data }
  } catch (error) {
    error.service = "projects.getById"
    throw error
  }
}