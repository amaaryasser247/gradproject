import { useMemo, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronDown, ChevronUp, Eye, X } from "lucide-react"
import {
  calculateCatalogTotals,
  catalogProducts,
  formatCurrency,
  saveCatalog,
} from "./services/catalogService"
import api from "./services/api"

async function getProjectById(projectId) {
  const token = localStorage.getItem("token")
  const response = await fetch(`/api/Projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) throw new Error("Failed to fetch project")
  return { data: await response.json() }
}

const ROOM_IMAGE_URL =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80"

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
  "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&q=80",
]

const detectedItems = [
  {
    id: 1,
    label: "Table Lamp",
    category: "Lighting",
    crop: { x: 2, y: 30, width: 18, height: 55 },
    matchedProducts: [
      { id: "m101", name: "Cream Drum Shade Lamp", vendor: "Mobilia", price: 4200, category: "Lighting", dimensions: "H 55cm × Ø 30cm" },
      { id: "m102", name: "Linen Floor Lamp", vendor: "HomeBox", price: 3800, category: "Lighting", dimensions: "H 150cm × Ø 35cm" },
      { id: "m103", name: "Nordic Table Lamp", vendor: "IKEA Egypt", price: 2900, category: "Lighting", dimensions: "H 45cm × Ø 25cm" },
      { id: "m104", name: "Marble Base Lamp", vendor: "Decora", price: 5100, category: "Lighting", dimensions: "H 60cm × Ø 28cm" },
    ],
  },
  {
    id: 2,
    label: "Accent Armchair",
    category: "Seating",
    crop: { x: 5, y: 60, width: 22, height: 38 },
    matchedProducts: [
      { id: "m201", name: "Blue Velvet Armchair", vendor: "IKEA Egypt", price: 8500, category: "Seating", dimensions: "W 80cm × D 85cm × H 95cm" },
      { id: "m202", name: "Wing Chair - Teal", vendor: "Mobilia", price: 9200, category: "Seating", dimensions: "W 75cm × D 80cm × H 100cm" },
    ],
  },
  {
    id: 3,
    label: "Wall Art",
    category: "Decor",
    crop: { x: 30, y: 5, width: 40, height: 65 },
    matchedProducts: [
      { id: "m301", name: "Abstract Canvas Print", vendor: "ArtHouse", price: 2800, category: "Decor", dimensions: "W 90cm × H 120cm" },
      { id: "m302", name: "Watercolor Wall Art", vendor: "Decora", price: 3100, category: "Decor", dimensions: "W 80cm × H 100cm" },
      { id: "m303", name: "Framed Nature Art", vendor: "HomeBox", price: 1950, category: "Decor", dimensions: "W 60cm × H 80cm" },
    ],
  },
  {
    id: 4,
    label: "Window Curtains",
    category: "Textiles",
    crop: { x: 0, y: 0, width: 15, height: 75 },
    matchedProducts: [
      { id: "m401", name: "Sheer White Curtains", vendor: "HomeBox", price: 1500, category: "Textiles", dimensions: "W 140cm × H 260cm" },
      { id: "m402", name: "Linen Drape Panels", vendor: "IKEA Egypt", price: 1800, category: "Textiles", dimensions: "W 145cm × H 250cm" },
    ],
  },
  {
    id: 5,
    label: "Side Table",
    category: "Tables",
    crop: { x: 75, y: 55, width: 22, height: 42 },
    matchedProducts: [
      { id: "m501", name: "Round Marble Side Table", vendor: "Mobilia", price: 5600, category: "Tables", dimensions: "Ø 50cm × H 55cm" },
      { id: "m502", name: "Glass End Table", vendor: "HomeBox", price: 4100, category: "Tables", dimensions: "W 45cm × D 45cm × H 60cm" },
      { id: "m503", name: "Wooden Accent Table", vendor: "IKEA Egypt", price: 3200, category: "Tables", dimensions: "W 40cm × D 40cm × H 55cm" },
      { id: "m504", name: "Metal Frame Side Table", vendor: "Decora", price: 2750, category: "Tables", dimensions: "W 35cm × D 35cm × H 50cm" },
    ],
  },
]

function getProductImage(index) {
  return PRODUCT_IMAGES[index % PRODUCT_IMAGES.length]
}

function useCroppedImages(items, imageUrl) {
  const [croppedImgs, setCroppedImgs] = useState({})

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      const results = {}
      items.forEach((item) => {
        const THUMB = 80
        const canvas = document.createElement("canvas")
        canvas.width = THUMB
        canvas.height = THUMB
        const ctx = canvas.getContext("2d")

        const srcX = (item.crop.x / 100) * img.naturalWidth
        const srcY = (item.crop.y / 100) * img.naturalHeight
        const srcW = (item.crop.width / 100) * img.naturalWidth
        const srcH = (item.crop.height / 100) * img.naturalHeight

        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, THUMB, THUMB)
        results[item.id] = canvas.toDataURL("image/jpeg", 0.85)
      })
      setCroppedImgs(results)
    }
  }, [imageUrl]) // eslint-disable-line react-hooks/exhaustive-deps

  return croppedImgs
}

export default function ProjectDetails() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [project, setProject] = useState(null)
  const [projectLoading, setProjectLoading] = useState(true)
  const [projectError, setProjectError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchProject() {
      try {
        setProjectLoading(true)
        setProjectError(null)
        const { data } = await getProjectById(id)
        if (!cancelled) setProject(data)
      } catch {
        if (!cancelled) setProjectError("Failed to load project.")
      } finally {
        if (!cancelled) setProjectLoading(false)
      }
    }
    fetchProject()
    return () => { cancelled = true }
  }, [id])

  const [budget, setBudget] = useState(() => {
    const storedBudget = localStorage.getItem("casaMoodProjectBudget")
    return storedBudget ? Number(storedBudget) : 45000
  })

  const [products, setProducts] = useState([])
  const [realProducts, setRealProducts] = useState([])
  
  useEffect(() => {
    api.get('/Products/all').then(res => {
      console.log("Products API Response:", res.data);
      let items = res.data;
      if (res.data?.data) items = res.data.data;
      else if (res.data?.items) items = res.data.items;
      else if (res.data?.$values) items = res.data.$values;
      const fetched = Array.isArray(items) ? items : [];
      console.log("Extracted Real Products:", fetched);
      setRealProducts(fetched);
      
      if (fetched.length > 0) {
        setProducts(fetched.slice(0, 3).map(p => ({ ...p, id: p.id || p.productId, quantity: 1 })));
      }
    }).catch(err => {
      console.error("Failed to fetch products:", err);
    })
  }, [])

  const dynamicDetectedItems = useMemo(() => {
    if (!realProducts || realProducts.length === 0) return detectedItems;
    return detectedItems.map((item, idx) => {
      const subset = realProducts.slice(idx * 2, idx * 2 + 2);
      if (subset.length === 0) return item;
      return {
        ...item,
        matchedProducts: subset.map(rp => ({
          ...rp,
          id: rp.id || rp.productId,
          vendor: rp.vendor || "CASA MOOD",
          category: item.category,
        }))
      }
    });
  }, [realProducts])

  useEffect(() => {
    if (project?.budget != null) {
      setBudget(project.budget)
    }
  }, [project])

  useEffect(() => {
    if (project?.selectedProducts && Array.isArray(project.selectedProducts) && realProducts.length > 0) {
      // If the API returns pre-selected products, map them to the full product objects and set them as checked
      const apiSelected = project.selectedProducts.map(sp => {
        const fullProduct = realProducts.find(rp => (rp.id || rp.productId) === sp.productId)
        if (fullProduct) {
          const key = `${sp.id || "item"}-${fullProduct.id || fullProduct.productId}`
          setSelectedMatched(prev => ({ ...prev, [key]: true }))
          return { ...fullProduct, id: fullProduct.id || fullProduct.productId, quantity: sp.quantity || 1 }
        }
        return null
      }).filter(Boolean)
      
      if (apiSelected.length > 0) {
        setProducts(apiSelected)
      }
    }
  }, [project, realProducts])

  const [selectedMatched, setSelectedMatched] = useState({})
  const [expandedItem, setExpandedItem] = useState(null)
  const [viewProduct, setViewProduct] = useState(null)

  const croppedImgs = useCroppedImages(detectedItems, ROOM_IMAGE_URL)

  const totals = useMemo(
    () => calculateCatalogTotals(products, budget),
    [budget, products]
  )

  const toggleMatchedProduct = (detectedId, mp, productImg) => {
    const key = `${detectedId}-${mp.id}`
    setSelectedMatched((prev) => {
      const updated = { ...prev }
      if (updated[key]) {
        delete updated[key]
        setProducts((curr) => curr.filter((p) => p.id !== mp.id))
      } else {
        updated[key] = true
        setProducts((curr) => {
          if (curr.find((p) => p.id === mp.id)) return curr
          return [
            ...curr,
            {
              ...mp,
              quantity: 1,
              sku: `MAT-${mp.id}`,
              image: productImg,
            },
          ]
        })
      }
      return updated
    })
  }

  const getMatchedQuantity = (mpId) => {
    const found = products.find((p) => p.id === mpId)
    return found ? found.quantity : 1
  }

  const updateMatchedQuantity = (mpId, delta) => {
    setProducts((curr) =>
      curr.map((p) =>
        p.id === mpId
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    )
  }

  const generateCatalog = async () => {
    try {
      const payload = {
        projectId: id,
        selectedProducts: products.map(p => ({
          productId: p.id,
          quantity: p.quantity || 1
        }))
      };
      
      // إظهار رسالة للمستخدم لرؤية الداتا قبل إرسالها للتأكد من الهيكل
      console.log("Sending Payload to /api/Proposals:", payload);
      
      if (payload.selectedProducts.length === 0) {
        alert("Please select at least one product before generating the catalog.");
        return;
      }
      
      // Check if any selected product uses a fake ID (starts with "m")
      const hasFakeIds = payload.selectedProducts.some(sp => String(sp.productId).startsWith("m"));
      if (hasFakeIds) {
        alert("⚠️ WARNING: You are trying to send dummy/fake products (IDs like m101) to the API!\n\nThis happens because no real products were loaded from your database (api.get('/Products') is empty). The backend will throw a 400 Bad Request because 'm101' is not a valid GUID.\n\nPlease add real products to your database first!");
        return;
      }
      
      const { data } = await api.post('/Proposals', payload);
      const proposalId = data.id || data.proposalId || data; // fallback to data if it returns string
      navigate(`/dashboard/catalog/${proposalId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create proposal. " + (err.response?.data?.message || err.response?.statusText || err.message));
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#d97757]">AI Analysis Complete</p>
          {projectLoading ? (
            <div className="h-9 w-64 bg-gray-200 rounded-xl animate-pulse mt-1" />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">
              {project?.name || "Modern Living Room"}
            </h1>
          )}
          <p className="mt-1 text-gray-500">
            Project #{id}{project?.roomType ? ` | ${project.roomType}` : ""} | Select products and set your budget
          </p>
        </div>
        <button
          onClick={generateCatalog}
          className="rounded-full bg-[#d97757] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          Generate Catalog
        </button>
      </div>

      {/* AI Detection Results */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7cfc5] text-[#C1714A] font-bold">
            ✦
          </div>
          <div>
            <h2 className="text-xl font-semibold">AI Detection Results</h2>
            <p className="text-sm text-gray-500">{dynamicDetectedItems.length} items identified</p>
          </div>
        </div>

        <div className="relative">
          <img
            src={project?.imageUrl || project?.image || ROOM_IMAGE_URL}
            alt="Detected modern living room"
            className="h-96 w-full rounded-2xl object-cover"
          />
          <div className="absolute top-8 left-12 border-2 border-[#d97757] rounded-xl w-28 h-36 opacity-80 pointer-events-none">
            <span className="absolute -top-5 left-0 bg-[#d97757] text-white text-xs px-2 py-0.5 rounded-md">Lamp</span>
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 border-2 border-[#d97757] rounded-xl w-44 h-48 opacity-80 pointer-events-none">
            <span className="absolute -top-5 left-0 bg-[#d97757] text-white text-xs px-2 py-0.5 rounded-md">Wall Art</span>
          </div>
          <div className="absolute top-8 right-12 border-2 border-[#d97757] rounded-xl w-28 h-36 opacity-80 pointer-events-none">
            <span className="absolute -top-5 left-0 bg-[#d97757] text-white text-xs px-2 py-0.5 rounded-md">Lamp</span>
          </div>
          <div className="absolute bottom-8 left-14 border-2 border-blue-400 rounded-xl w-24 h-20 opacity-80 pointer-events-none">
            <span className="absolute -top-5 left-0 bg-blue-400 text-white text-xs px-2 py-0.5 rounded-md">Chair</span>
          </div>
          <div className="absolute bottom-8 right-14 border-2 border-blue-400 rounded-xl w-24 h-20 opacity-80 pointer-events-none">
            <span className="absolute -top-5 left-0 bg-blue-400 text-white text-xs px-2 py-0.5 rounded-md">Chair</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">

          {/* Matched Products */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <div>
                <h2 className="text-xl font-bold text-[#1C1410]">Matched Products</h2>
                <p className="text-sm text-[#7A6A5F]">
                  Products matched from detected items in your room photo
                </p>
              </div>
              <span className="bg-[#d97757]/10 text-[#d97757] text-xs font-bold px-3 py-1.5 rounded-full">
                {dynamicDetectedItems.length} detected
              </span>
            </div>

            <div className="divide-y overflow-y-auto" style={{ maxHeight: "420px" }}>
              {dynamicDetectedItems.map((item) => {
                const isExpanded = expandedItem === item.id
                const selectedCount = item.matchedProducts.filter(
                  (mp) => selectedMatched[`${item.id}-${mp.id}`]
                ).length
                const thumbSrc = croppedImgs[item.id]

                return (
                  <div key={item.id} className="p-5">
                    <div
                      className="flex items-center gap-4 cursor-pointer select-none"
                      onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-100">
                        {thumbSrc ? (
                          <img
                            src={thumbSrc}
                            alt={`croppedimg-${item.label}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full animate-pulse bg-gray-200 rounded-xl" />
                        )}
                        <div className="absolute inset-0 border-2 border-[#d97757] rounded-xl opacity-50 pointer-events-none" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800">{item.label}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {item.category}
                          </span>
                          {selectedCount > 0 && (
                            <span className="text-xs bg-[#d97757]/10 text-[#d97757] font-semibold px-2 py-0.5 rounded-full">
                              {selectedCount} selected
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-sm text-[#d97757] font-medium shrink-0">
                        <span>{item.matchedProducts.length} matches</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 ml-20 space-y-2">
                        {item.matchedProducts.map((mp, mpIdx) => {
                          const key = `${item.id}-${mp.id}`
                          const isChecked = !!selectedMatched[key]
                          const productImg = getProductImage(mpIdx + item.id)

                          return (
                            <div
                              key={mp.id}
                              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                isChecked
                                  ? "border-[#d97757] bg-[#d97757]/5"
                                  : "border-gray-100 bg-gray-50"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleMatchedProduct(item.id, mp, productImg)}
                                className="w-4 h-4 accent-[#d97757] shrink-0 cursor-pointer"
                              />
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                <img
                                  src={productImg}
                                  alt={mp.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">
                                  {mp.name}
                                </p>
                                <p className="text-xs text-gray-400">{mp.vendor}</p>
                              </div>
                              <span className="text-sm font-bold text-[#d97757] shrink-0">
                                {formatCurrency(mp.price)}
                              </span>
                              {isChecked && (
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => updateMatchedQuantity(mp.id, -1)}
                                    className="w-6 h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:border-[#d97757] hover:text-[#d97757] transition text-sm font-bold flex items-center justify-center"
                                  >
                                    −
                                  </button>
                                  <span className="w-6 text-center text-sm font-semibold text-gray-800">
                                    {getMatchedQuantity(mp.id)}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => updateMatchedQuantity(mp.id, 1)}
                                    className="w-6 h-6 rounded-md border border-gray-200 bg-white text-gray-500 hover:border-[#d97757] hover:text-[#d97757] transition text-sm font-bold flex items-center justify-center"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => setViewProduct({ ...mp, image: productImg })}
                                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-[#d97757] hover:border-[#d97757] transition shrink-0"
                                aria-label={`View details for ${mp.name}`}
                              >
                                <Eye size={15} />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1C1410]">Budget Input</h2>
            <p className="mt-1 text-sm text-[#7A6A5F]">
              Enter the available budget for this catalog.
            </p>
            <label className="mt-5 flex items-center gap-3 rounded-2xl border bg-[#fffaf7] px-4 py-3">
              <span className="font-semibold text-[#C1714A]">EGP</span>
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="w-full bg-transparent text-xl font-bold outline-none"
              />
            </label>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1C1410]">Live Pricing</h2>
            <div className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Subtotal" value={formatCurrency(totals.subtotal)} />
              <SummaryRow label="VAT (14%)" value={formatCurrency(totals.tax)} />
              <SummaryRow label="Delivery & installation" value={formatCurrency(totals.fees)} />
              <hr />
              <SummaryRow label="Final total" value={formatCurrency(totals.total)} strong />
              <div
                className={`rounded-2xl p-4 font-bold ${
                  totals.isOverBudget ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                }`}
              >
                {totals.isOverBudget
                  ? `Over budget by ${formatCurrency(Math.abs(totals.remainingBudget))}`
                  : `${formatCurrency(totals.remainingBudget)} remaining`}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Product Detail Popup */}
      {viewProduct && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setViewProduct(null)}
        >
          <div
            className="bg-white rounded-2xl w-80 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-gray-800 truncate pr-2">{viewProduct.name}</h3>
              <button
                onClick={() => setViewProduct(null)}
                className="rounded-full p-1 hover:bg-gray-100 transition text-gray-400"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="w-full h-48 overflow-hidden bg-gray-100">
              <img
                src={viewProduct.image}
                alt={viewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vendor</span>
                <span className="font-semibold text-gray-800">{viewProduct.vendor}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-700">{viewProduct.category}</span>
              </div>
              {viewProduct.dimensions && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="text-gray-700 font-medium">{viewProduct.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price</span>
                <span className="font-bold text-[#d97757]">{formatCurrency(viewProduct.price)}</span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={() => setViewProduct(null)}
                className="w-full rounded-xl bg-[#d97757] py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        strong ? "text-lg font-bold text-[#C1714A]" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}