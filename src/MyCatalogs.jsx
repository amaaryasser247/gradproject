import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Filter, Plus, Search, Trash2 } from "lucide-react"
import {
  calculateCatalogTotals,
  catalogProducts,
  deleteCatalog,
  formatCurrency,
  getCatalogs,
  saveCatalog,
} from "./services/catalogService"

export default function MyCatalogs() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [catalogs, setCatalogs] = useState(() => getCatalogs())
  const [message, setMessage] = useState("")

  const handleCreateCatalog = () => {
    const id = `catalog-${Date.now()}`
    const newCatalog = {
      id,
      projectId: id,
      name: "New Catalog",
      roomType: "Living Room",
      style: "Modern",
      budget: 45000,
      createdAt: new Date().toISOString(),
      products: catalogProducts.slice(0, 3),
    }

    saveCatalog(newCatalog)
    navigate(`/dashboard/catalog/${id}`)
  }

  const handleDeleteCatalog = (event, catalogId, catalogName) => {
    event.preventDefault()
    event.stopPropagation()

    deleteCatalog(catalogId)
    setCatalogs(getCatalogs())
    setMessage(`Catalog "${catalogName}" deleted.`)
  }

  const filteredCatalogs = useMemo(() => {
    return catalogs.filter((catalog) => {
      const totals = calculateCatalogTotals(catalog.products, catalog.budget)
      const matchesSearch = catalog.name.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        filter === "All" ||
        (filter === "Within Budget" && !totals.isOverBudget) ||
        (filter === "Over Budget" && totals.isOverBudget)

      return matchesSearch && matchesFilter
    })
  }, [catalogs, filter, search])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#d97757]">Catalog Library</p>
          <h1 className="text-3xl font-bold text-[#1C1410]">My Catalogs</h1>
          <p className="mt-1 text-[#7A6A5F]">
            Review generated catalogs, compare budgets, and reopen pricing.
          </p>
        </div>

        <button
          onClick={handleCreateCatalog}
          className="flex w-fit items-center gap-2 rounded-full bg-[#d97757] px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <Plus size={18} />
          Create Catalog
        </button>
      </div>

      <div className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm lg:grid-cols-[1fr_220px]">
        <label className="flex items-center gap-3 rounded-2xl border bg-[#fffaf7] px-4 py-3">
          <Search size={18} className="text-[#C1714A]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search catalogs..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <label className="flex items-center gap-3 rounded-2xl border bg-[#fffaf7] px-4 py-3">
          <Filter size={18} className="text-[#C1714A]" />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option>All</option>
            <option>Within Budget</option>
            <option>Over Budget</option>
          </select>
        </label>
      </div>

      {message && (
        <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {message}
        </div>
      )}

      {filteredCatalogs.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#1C1410]">No catalogs found</h2>
          <p className="mt-2 text-sm text-[#7A6A5F]">
            Try a different search term or budget filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredCatalogs.map((catalog) => {
            const totals = calculateCatalogTotals(catalog.products, catalog.budget)

            return (
              <Link
                key={catalog.id}
                to={`/dashboard/catalog/${catalog.id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid gap-5 p-5 md:grid-cols-[180px_1fr]">
                  <div className="grid grid-cols-2 gap-2">
                    {catalog.products.slice(0, 4).map((product) => (
                      <img
                        key={product.id}
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-bold text-[#1C1410] group-hover:text-[#d97757]">
                          {catalog.name}
                        </h2>
                        <p className="mt-1 flex items-center gap-2 text-sm text-[#7A6A5F]">
                          <Calendar size={14} />
                          Created {new Date(catalog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          totals.isOverBudget
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {totals.isOverBudget ? "Over budget" : "Within budget"}
                      </span>
                      <button
                        onClick={(event) => handleDeleteCatalog(event, catalog.id, catalog.name)}
                        className="rounded-full border p-2 text-red-500 transition hover:bg-red-50"
                        aria-label={`Delete ${catalog.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-5 space-y-2">
                      {catalog.products.slice(0, 3).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="truncate text-[#1C1410]">
                            {product.quantity}x {product.name}
                          </span>
                          <span className="shrink-0 font-semibold text-[#C1714A]">
                            {formatCurrency(product.price * product.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-[#fffaf7] p-4 text-sm">
                      <div>
                        <p className="text-[#7A6A5F]">Products</p>
                        <p className="font-bold text-[#1C1410]">{catalog.products.length}</p>
                      </div>
                      <div>
                        <p className="text-[#7A6A5F]">Budget</p>
                        <p className="font-bold text-[#1C1410]">{formatCurrency(catalog.budget)}</p>
                      </div>
                      <div>
                        <p className="text-[#7A6A5F]">Total</p>
                        <p className="font-bold text-[#C1714A]">{formatCurrency(totals.total)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
