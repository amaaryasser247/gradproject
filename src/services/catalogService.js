import api from "./api"

export const TAX_RATE = 0.14
export const SERVICE_FEE = 500

export const catalogProducts = [
  {
    id: "sofa-grey",
    name: "Modern 3-Seater Sofa - Grey",
    category: "Seating",
    vendor: "Mobilia",
    sku: "SOF-001",
    material: "Fabric, Wood",
    dimensions: "220 x 90 x 85 cm",
    price: 18500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=80",
  },
  {
    id: "coffee-marble",
    name: "Marble Top Coffee Table",
    category: "Tables",
    vendor: "Home Center",
    sku: "TBL-045",
    material: "Marble, Metal",
    dimensions: "120 x 60 x 45 cm",
    price: 4200,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80",
  },
  {
    id: "arc-lamp",
    name: "Designer Arc Floor Lamp",
    category: "Lighting",
    vendor: "Design Hub",
    sku: "LMP-022",
    material: "Metal, Fabric",
    dimensions: "180 x 40 cm",
    price: 2800,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80",
  },
  {
    id: "persian-rug",
    name: "Persian Style Area Rug",
    category: "Decor",
    vendor: "Furniture Egypt",
    sku: "RUG-018",
    material: "Wool",
    dimensions: "200 x 300 cm",
    price: 5500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=900&q=80",
  },
  {
    id: "oak-console",
    name: "Oak Media Console",
    category: "Storage",
    vendor: "Casa Woods",
    sku: "STR-114",
    material: "Oak, Brass",
    dimensions: "180 x 42 x 55 cm",
    price: 7600,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80",
  },
]

export const seedCatalogs = [
  {
    id: "1",
    name: "Modern Living Room",
    projectId: "1",
    roomType: "Living Room",
    style: "Modern, Contemporary",
    budget: 45000,
    createdAt: "2026-05-09",
    products: catalogProducts.slice(0, 4),
  },
  {
    id: "2",
    name: "Scandinavian Bedroom",
    projectId: "2",
    roomType: "Bedroom",
    style: "Scandinavian",
    budget: 38000,
    createdAt: "2026-05-07",
    products: [catalogProducts[0], catalogProducts[1], catalogProducts[4]],
  },
  {
    id: "3",
    name: "Executive Office",
    projectId: "3",
    roomType: "Office",
    style: "Executive Modern",
    budget: 65000,
    createdAt: "2026-05-02",
    products: catalogProducts.map((product) => ({
      ...product,
      quantity: product.id === "arc-lamp" ? 2 : 1,
    })),
  },
]

export function formatCurrency(value) {
  return `${Math.max(0, Math.round(Number(value) || 0)).toLocaleString()} EGP`
}

export function calculateCatalogTotals(products, budget = 0) {
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )
  const tax = Math.round(subtotal * TAX_RATE)
  const fees = products.length > 0 ? SERVICE_FEE : 0
  const total = subtotal + tax + fees
  const remainingBudget = Number(budget || 0) - total

  return {
    subtotal,
    tax,
    fees,
    total,
    remainingBudget,
    isOverBudget: remainingBudget < 0,
  }
}

export function getCatalogs() {
  const stored = getStoredCatalogs()
  const storedIds = new Set(stored.map((catalog) => catalog.id))
  const deletedIds = new Set(getDeletedCatalogIds())
  return [
    ...stored,
    ...seedCatalogs.filter(
      (catalog) => !storedIds.has(catalog.id) && !deletedIds.has(catalog.id)
    ),
  ]
}

export function getCatalogById(id) {
  return getCatalogs().find((catalog) => catalog.id === id) || seedCatalogs[0]
}

export function saveCatalog(catalog) {
  const catalogs = getStoredCatalogs()
  const nextCatalogs = [
    { ...catalog, updatedAt: new Date().toISOString() },
    ...catalogs.filter((item) => item.id !== catalog.id),
  ]
  localStorage.setItem("casaMoodCatalogs", JSON.stringify(nextCatalogs))
}

export function deleteCatalog(catalogId) {
  const catalogs = getStoredCatalogs().filter((catalog) => catalog.id !== catalogId)
  const deletedIds = new Set(getDeletedCatalogIds())

  if (seedCatalogs.some((catalog) => catalog.id === catalogId)) {
    deletedIds.add(catalogId)
  }

  localStorage.setItem("casaMoodCatalogs", JSON.stringify(catalogs))
  localStorage.setItem("casaMoodDeletedCatalogs", JSON.stringify([...deletedIds]))
}

export function getStoredCatalogs() {
  try {
    return JSON.parse(localStorage.getItem("casaMoodCatalogs") || "[]")
  } catch {
    return []
  }
}

export function getDeletedCatalogIds() {
  try {
    return JSON.parse(localStorage.getItem("casaMoodDeletedCatalogs") || "[]")
  } catch {
    return []
  }
}

export async function sendCatalogEmail({ email, catalog, totals, shareUrl }) {
  try {
    const { data } = await api.post("/send-catalog-email", {
      to: email,
      subject: `CASA MOOD Catalog: ${catalog.name}`,
      catalog,
      totals,
      shareUrl,
      body: buildEmailBody(catalog, totals, shareUrl),
    })

    return data || {}
  } catch {
    throw new Error("Email service is not configured")
  }
}

export function buildShareUrl(catalogId) {
  const origin = window.location.origin
  return `${origin}/dashboard/catalog/${catalogId}?shared=true`
}

export function buildEmailBody(catalog, totals, shareUrl) {
  const productLines = catalog.products
    .map(
      (product) =>
        `- ${product.name} | Qty ${product.quantity} | ${formatCurrency(product.price)} each | ${formatCurrency(product.price * product.quantity)}`
    )
    .join("\n")

  return [
    `CASA MOOD Catalog: ${catalog.name}`,
    "",
    `Budget: ${formatCurrency(catalog.budget)}`,
    `Subtotal: ${formatCurrency(totals.subtotal)}`,
    `Taxes: ${formatCurrency(totals.tax)}`,
    `Fees: ${formatCurrency(totals.fees)}`,
    `Final total: ${formatCurrency(totals.total)}`,
    `Remaining budget: ${totals.remainingBudget >= 0 ? formatCurrency(totals.remainingBudget) : `Over by ${formatCurrency(Math.abs(totals.remainingBudget))}`}`,
    "",
    "Products:",
    productLines,
    "",
    `Preview link: ${shareUrl}`,
  ].join("\n")
}
