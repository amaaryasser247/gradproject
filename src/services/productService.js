import api from "./api"

export async function getProducts() {
  try {
    const { data } = await api.get("/Products/all")
    return data
  } catch (error) {
    error.service = "products.list"
    throw error
  }
}

export async function getAllProducts() {
  try {
    const { data } = await api.get("/Products/all")
    return data
  } catch (error) {
    error.service = "products.all"
    throw error
  }
}

export async function getProductById(id) {
  try {
    const { data } = await api.get(`/Products/${id}`)
    return data
  } catch (error) {
    error.service = "products.detail"
    throw error
  }
}

export async function createProduct(productData) {
  try {
    const { data } = await api.post("/Products", productData)
    return data
  } catch (error) {
    error.service = "products.create"
    throw error
  }
}

export async function updateProduct(id, productData) {
  try {
    const { data } = await api.put(`/Products/${id}`, productData)
    return data
  } catch (error) {
    error.service = "products.update"
    throw error
  }
}

export async function deleteProduct(id) {
  try {
    const { data } = await api.delete(`/Products/${id}`)
    return data
  } catch (error) {
    error.service = "products.delete"
    throw error
  }
}
