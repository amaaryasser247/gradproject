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

function getProductImage(product) {
  return product?.imageUrl || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
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

  const [budget, setBudget] = useState(0)
  const [products, setProducts] = useState([])
  const [selectedMatched, setSelectedMatched] = useState({})
  const [expandedItem, setExpandedItem] = useState(null)
  const [viewProduct, setViewProduct] = useState(null)

  useEffect(() => {
    if (project) {
      if (project.customerBudget != null) {
        setBudget(project.customerBudget)
      }
      
      // If there's an existing proposal or selected products, initialize them
      if (project.selectedProducts && Array.isArray(project.selectedProducts)) {
        const seen = new Set()
        const selected = []
        const matchedKeys = {}
        
        project.selectedProducts.forEach(sp => {
          const product = sp.product || sp
          if (!product) return
          
          const productId = product.id || product.productId || product.ProductId || product.Id
          const name = (product.name || product.Name || "").trim().toLowerCase()
          const price = product.price || product.Price || 0
          
          // Extremely aggressive deduplication: Name + Price is enough
          const dedupeKey = `${name}-${price}`
          
          if (!seen.has(dedupeKey)) {
            seen.add(dedupeKey)
            const mapKey = `${sp.id || sp.productId || "item"}-${productId || dedupeKey}`
            matchedKeys[mapKey] = true
            selected.push({ 
              ...product, 
              id: productId || dedupeKey, 
              name: name,
              price: price,
              quantity: sp.quantity || 1 
            })
          }
        })
        
        setSelectedMatched(matchedKeys)
        setProducts(selected)
      }
    }
  }, [project])

  const dynamicDetectedItems = useMemo(() => {
    if (!project?.detectedObjects) return []
    
    const seenProductKeys = new Set()

    return project.detectedObjects.map((obj, idx) => {
      // Filter recommendations by similarity score >= 50% (0.5)
      // and deduplicate products globally using a robust key
      const uniqueRecommendations = []
      
      if (obj.recommendations) {
        obj.recommendations.forEach(rec => {
          const product = rec.product
          if (!product) return

          const productId = product.id || product.productId || product.ProductId || product.Id
          const name = (product.name || product.Name || "").trim().toLowerCase()
          const price = product.price || product.Price || 0
          const score = rec.similarity_Score || 0
          
          // Extremely aggressive deduplication: Name + Price is enough
          const dedupeKey = `${name}-${price}`
          
          if (score >= 0.5 && !seenProductKeys.has(dedupeKey)) {
            seenProductKeys.add(dedupeKey)
            uniqueRecommendations.push({
              ...product,
              id: productId || dedupeKey,
              name: name,
              price: price,
              vendor: product.brand || product.Brand || "CASA MOOD",
              similarity: score
            })
          }
        })
      }

      return {
        id: obj.id || idx,
        label: obj.type.charAt(0).toUpperCase() + obj.type.slice(1),
        category: obj.type,
        cropUrl: obj.crop_Url,
        matchedProducts: uniqueRecommendations
      }
    })
  }, [project])
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
      const productList = products.map(p => ({
        productId: p.id || p.productId || p.ProductId || p.Id,
        ProductId: p.id || p.productId || p.ProductId || p.Id,
        quantity: p.quantity || 1,
        Quantity: p.quantity || 1
      }));

      const payload = {
        projectId: id,
        ProjectId: id,
        products: productList,
        selectedProducts: productList,
        items: productList,
        Items: productList
      };
      
      console.log("Sending Robust Proposal Payload:", payload);
      
      const { data } = await api.post('/Proposals', payload);
      const proposalId = data.id || data.proposalId || data.ProposalId || data; 
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
          {projectLoading ? (
            <div className="w-full h-96 bg-gray-100 animate-pulse rounded-2xl flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-[#d97757] border-t-transparent animate-spin" />
              <p className="text-[#d97757] font-medium animate-pulse">Loading analysis image...</p>
            </div>
          ) : (
            <img
              src={project?.detection_Image_Url || project?.imageUrl || project?.image}
              alt="Detected room"
              className="w-full h-auto rounded-2xl shadow-inner border border-gray-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80";
              }}
            />
          )}

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
                const thumbSrc = item.cropUrl

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
                        <span>{item.matchedProducts.length || 0} matches</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 ml-20 space-y-2">
                        {item.matchedProducts.length === 0 ? (
                          <div className="p-4 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50">
                            <p className="text-sm text-gray-400 italic">
                              No high-confidence matches found (Similarity {">"} 50%)
                            </p>
                          </div>
                        ) : (
                          item.matchedProducts.map((mp) => {
                            const key = `${item.id}-${mp.id}`
                            const isChecked = !!selectedMatched[key]
                            const productImg = getProductImage(mp)

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
                          })
                        )}
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
                <span className="font-semibold text-gray-800">{viewProduct.vendor || "CASA MOOD"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-700">{viewProduct.category || "General"}</span>
              </div>
              {viewProduct.material && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Material</span>
                  <span className="text-gray-700 font-medium">{viewProduct.material}</span>
                </div>
              )}
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
              {viewProduct.description && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-400 text-[10px] uppercase font-bold mb-1 tracking-wider">Description</p>
                  <p className="text-gray-600 text-xs leading-relaxed max-h-24 overflow-y-auto">
                    {viewProduct.description}
                  </p>
                </div>
              )}
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