import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Camera,
  FileText,
  Mail,
  Plus,
  Printer,
  Send,
  Share2,
  Trash2,
} from "lucide-react"
import api from "./services/api"
import {
  buildShareUrl,
  calculateCatalogTotals,
  catalogProducts,
  formatCurrency,
  sendCatalogEmail,
  saveCatalog,
  deleteCatalog,
} from "./services/catalogService"

export default function Catalog() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [catalogName, setCatalogName] = useState("Loading Proposal...")
  const [budget, setBudget] = useState(0)
  const [products, setProducts] = useState([])
  const [roomType, setRoomType] = useState("Room")
  const [projectId, setProjectId] = useState(id)
  const [createdAt, setCreatedAt] = useState(new Date().toISOString())
  
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const emailInputRef = useRef(null)

  useEffect(() => {
    async function loadProposal() {
      try {
        const [proposalRes, productsRes] = await Promise.all([
          api.get(`/Proposals/${id}`),
          api.get('/Products/all').catch(() => ({ data: [] }))
        ]);
        
        const data = proposalRes.data;
        console.log("Proposal API Response:", data);
        setCatalogName(data.name || "Interior Proposal")
        setBudget(data.budget || data.customerBudget || 0)
        setRoomType(data.roomType || "Living Room")
        setProjectId(data.projectId || id)
        setCreatedAt(data.createdAt || new Date().toISOString())
        
        // Supporting both 'items' and 'propertyItems' as per user request
        let mappedProducts = []
        const rawItems = data.propertyItems || data.items || data.selectedProducts || data.products || []
        
        console.log("Full PropertyItems/Items received:", rawItems);
        
        if (Array.isArray(rawItems)) mappedProducts = rawItems
        
        // Extract real products from Products/all response
        let allProducts = productsRes.data;
        if (productsRes.data?.data) allProducts = productsRes.data.data;
        else if (productsRes.data?.items) allProducts = productsRes.data.items;
        else if (productsRes.data?.$values) allProducts = productsRes.data.$values;
        if (!Array.isArray(allProducts)) allProducts = [];
        
        // Map and Sort by matchScore (descending)
        const processed = mappedProducts.map((p, index) => {
          const pId = String(p.productId || p.ProductId || p.id || p.Id || "");
          const fullProduct = allProducts.find(rp => 
            pId && String(rp.id || rp.productId || rp.Id || rp.ProductId) === pId
          ) || {};
          
          const pInfo = p.product || p.Product || {};
          
          return {
            ...fullProduct,
            ...pInfo,
            ...p,
            id: pId || `item-${index}`,
            name: p.productName || p.ProductName || pInfo.name || pInfo.Name || fullProduct.name || "Unknown Product",
            matchedName: p.matchedName || p.MatchedName || p.matchName || "",
            image: p.imageUrl || p.ImageUrl || pInfo.image || pInfo.imageUrl || p.image || fullProduct.image || "",
            price: p.estimatedPrice || p.EstimatedPrice || p.price || p.Price || pInfo.price || fullProduct.price || 0,
            quantity: p.quantity || p.Quantity || 1,
            unit: p.unit || p.Unit || "unit",
            matchScore: Number(p.matchScore || p.MatchScore || 0),
            category: p.category || p.Category || p.categoryName || p.CategoryName || fullProduct.category || ""
          }
        }).sort((a, b) => b.matchScore - a.matchScore);

        setProducts(processed)
      } catch (err) {
        console.error(err)
        setError("Failed to load the proposal from the server.")
      } finally {
        setIsFetching(false)
      }
    }
    loadProposal()
  }, [id])

  const totals = useMemo(
    () => calculateCatalogTotals(products, budget),
    [budget, products]
  )

  const catalog = {
    id,
    name: catalogName,
    budget: Number(budget) || 0,
    products,
    createdAt,
  }
  const shareUrl = buildShareUrl(id)
  const availableProducts = catalogProducts.filter(
    (product) => !products.some((item) => item.id === product.id)
  )

  const updateQuantity = (productId, quantity) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, Number(quantity) || 1) }
          : product
      )
    )
  }

  const removeProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId))
  }

  const addProduct = (product) => {
    setProducts((current) => [...current, { ...product, quantity: 1 }])
  }

  const updateProductImage = (productId, file) => {
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setProducts((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, image: imageUrl } : product
      )
    )
    setStatus("Product image updated")
  }

  const persistCatalog = () => {
    saveCatalog(catalog)
    setStatus("Catalog saved")
  }

  const handleEmail = async () => {
    setError("")
    setStatus("")
    if (!email || !email.includes("@")) {
      setError("Enter a valid email address before sending.")
      emailInputRef.current?.focus()
      return
    }

    setIsLoading(true)
    try {
      saveCatalog(catalog)
      await sendCatalogEmail({ email, catalog, totals, shareUrl })
      setStatus(`Catalog sent to ${email}`)
    } catch {
      setError("Email backend is not configured yet. Add a POST /api/send-catalog-email endpoint to send real emails.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyLink = async () => {
    setError("")
    try {
      await navigator.clipboard.writeText(shareUrl)
      setStatus("Catalog link copied")
    } catch {
      setError("Copy failed. Select and copy the link manually.")
    }
  }

  const nativeShare = async () => {
    setError("")
    const shareData = {
      title: catalogName,
      text: `View this CASA MOOD catalog: ${catalogName}`,
      url: shareUrl,
    }

    if (!navigator.share) {
      await copyLink()
      return
    }

    try {
      await navigator.share(shareData)
      setStatus("Catalog shared")
    } catch {
      setError("Sharing was cancelled or unavailable.")
    }
  }

  const printCatalog = (mode = "print") => {
    setStatus(mode === "pdf" ? "Use Save as PDF in the print dialog" : "Print dialog opened")
    saveCatalog(catalog)
    window.print()
  }

  const handleDeleteCatalog = () => {
    deleteCatalog(id)
    navigate("/dashboard/catalogs")
  }

  if (isFetching) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#e7cfc5] border-t-[#d97757]"></div>
        <p className="font-semibold text-[#7A6A5F]">Loading Proposal Details...</p>
      </div>
    )
  }

  return (
    <div className="catalog-print-area space-y-8">
      <div className="no-print flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#d97757]">Professional Catalog</p>
          <input
            value={catalogName}
            onChange={(event) => setCatalogName(event.target.value)}
            className="mt-1 w-full rounded-2xl border bg-white px-4 py-3 text-3xl font-bold text-[#1C1410] lg:min-w-120"
          />
          <p className="mt-2 text-[#7A6A5F]">
            {roomType} | Project #{projectId || id}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={persistCatalog} className="rounded-full border px-4 py-2 font-semibold">
            Save
          </button>
          <button onClick={handleDeleteCatalog} className="rounded-full border px-4 py-2 font-semibold text-red-500">
            Delete
          </button>
          <button onClick={handleEmail} className="flex items-center gap-2 rounded-full border px-4 py-2 font-semibold">
            <Mail size={16} /> Email
          </button>
          <button onClick={nativeShare} className="flex items-center gap-2 rounded-full border px-4 py-2 font-semibold">
            <Share2 size={16} /> Share
          </button>
          <button onClick={() => printCatalog("print")} className="flex items-center gap-2 rounded-full border px-4 py-2 font-semibold">
            <Printer size={16} /> Print
          </button>
          <button onClick={() => printCatalog("pdf")} className="flex items-center gap-2 rounded-full bg-[#d97757] px-5 py-2 font-semibold text-white shadow-sm">
            <FileText size={16} /> Export PDF
          </button>
        </div>
      </div>

      {(status || error) && (
        <div
          className={`no-print rounded-2xl px-4 py-3 text-sm ${
            error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
          }`}
        >
          {error || status}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#1C1410]">CASA MOOD</h2>
              <p className="text-[#7A6A5F]">Interior Design Catalog</p>
              <div className="mt-6 grid gap-2 text-sm text-[#1C1410] sm:grid-cols-2">
                <p><span className="font-semibold">Room:</span> {roomType}</p>
                <p><span className="font-semibold">Style:</span> Modern</p>
                <p><span className="font-semibold">Created:</span> {new Date(catalog.createdAt).toLocaleDateString()}</p>
                <p><span className="font-semibold">Items:</span> {products.length} products</p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#fffaf7] p-5 md:w-80">
              <label className="text-sm font-semibold text-[#7A6A5F]">Available Budget</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-white px-4 py-3">
                <span className="font-semibold text-[#C1714A]">EGP</span>
                <input
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="w-full bg-transparent text-xl font-bold outline-none"
                />
              </div>
              <p
                className={`mt-3 text-sm font-semibold ${
                  totals.isOverBudget ? "text-red-600" : "text-green-700"
                }`}
              >
                {totals.isOverBudget
                  ? `Over budget by ${formatCurrency(Math.abs(totals.remainingBudget))}`
                  : `${formatCurrency(totals.remainingBudget)} remaining`}
              </p>
            </div>
          </div>
        </div>

        <PricingSummary totals={totals} budget={budget} productCount={products.length} />
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1410]">Selected Products</h2>
            <p className="text-sm text-[#7A6A5F]">
              Quantity changes update totals, fees, and budget instantly.
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            {availableProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addProduct(product)}
                className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold text-[#C1714A]"
              >
                <Plus size={14} /> {product.category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="relative">
                <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
                <label className="no-print absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#C1714A] shadow-sm transition hover:bg-[#fff7f4]">
                  <Camera size={16} />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => updateProductImage(product.id, event.target.files[0])}
                  />
                </label>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#d97757]">
                      {product?.category || "Product"}
                      {product?.matchScore > 0 && (
                        <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px]">
                          {product.matchScore}% Match
                        </span>
                      )}
                    </p>
                    <h3 className="text-lg font-bold text-[#1C1410]">{product?.name}</h3>
                    {product?.matchedName && (
                      <p className="text-xs text-blue-600 font-medium italic">Matched: {product.matchedName}</p>
                    )}
                    <p className="text-sm text-[#7A6A5F]">by {product?.vendor || "Vendor"}</p>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="no-print rounded-full border p-2 text-red-500 hover:bg-red-50 transition"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-[#7A6A5F]">
                  <span>SKU</span>
                  <span className="text-right text-[#1C1410]">{product?.sku || "N/A"}</span>
                  <span>Material</span>
                  <span className="text-right text-[#1C1410]">{product?.material || "N/A"}</span>
                  <span>Dimensions</span>
                  <span className="text-right text-[#1C1410]">{product?.dimensions || "N/A"}</span>
                </div>

                <div className="grid gap-3 rounded-2xl bg-[#fffaf7] p-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-[#7A6A5F]">Est. Price</p>
                    <p className="font-bold text-[#C1714A]">{formatCurrency(product?.price)}</p>
                  </div>
                  <label>
                    <span className="text-xs text-[#7A6A5F]">Quantity ({product?.unit || "unit"})</span>
                    <input
                      type="number"
                      min="1"
                      value={product?.quantity}
                      onChange={(event) => updateQuantity(product.id, event.target.value)}
                      className="mt-1 w-full rounded-xl border bg-white px-3 py-2 font-semibold outline-none focus:border-[#C1714A]"
                    />
                  </label>
                  <div>
                    <p className="text-xs text-[#7A6A5F]">Line total</p>
                    <p className="font-bold text-[#1C1410]">
                      {formatCurrency(product.price * product.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="no-print">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1C1410]">Send Catalog to Email</h2>
          <p className="mt-1 text-sm text-[#7A6A5F]">
            Opens a ready-to-send email with the catalog preview, pricing summary, and share link.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border bg-[#fffaf7] px-4 py-3">
              <Mail size={18} className="text-[#C1714A]" />
              <input
                ref={emailInputRef}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="client@example.com"
                className="w-full bg-transparent outline-none"
              />
            </label>
            <button
              onClick={handleEmail}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#d97757] px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              <Send size={18} /> {isLoading ? "Preparing..." : "Send to Email"}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function PricingSummary({ totals, budget, productCount }) {
  return (
    <aside className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-[#1C1410]">Dynamic Pricing</h2>
      <div className="mt-5 space-y-3 text-sm">
        <SummaryRow label={`Subtotal (${productCount} products)`} value={formatCurrency(totals.subtotal)} />
        <SummaryRow label="VAT (14%)" value={formatCurrency(totals.tax)} />
        <SummaryRow label="Delivery & installation" value={formatCurrency(totals.fees)} />
        <hr />
        <SummaryRow label="Final total" value={formatCurrency(totals.total)} strong />
        <SummaryRow label="Budget" value={formatCurrency(budget)} />
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
    </aside>
  )
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${strong ? "text-lg font-bold text-[#C1714A]" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}
