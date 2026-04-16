import { useState } from "react";
import Sidebar from "./Sidebar";
import { Package, TrendingDown, AlertTriangle, Search } from "lucide-react";

const products = [
  { id: 1, name: "Modern Velvet Sofa",      category: "Sofas",    sku: "SOF-001-NVY", stock: 24, reserved: 3,  available: 21, status: "In Stock",    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop" },
  { id: 2, name: "Scandinavian Dining Chair",category: "Chairs",   sku: "CHR-045-OAK", stock: 48, reserved: 8,  available: 40, status: "In Stock",    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop" },
  { id: 3, name: "Marble Coffee Table",     category: "Tables",   sku: "TBL-023-MRB", stock: 3,  reserved: 1,  available: 2,  status: "Low Stock",  image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=80&h=80&fit=crop" },
  { id: 4, name: "Industrial Floor Lamp",   category: "Lighting", sku: "LMP-089-BLK", stock: 31, reserved: 5,  available: 26, status: "In Stock",    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&h=80&fit=crop" },
  { id: 5, name: "Mid-Century Armchair",    category: "Chairs",   sku: "CHR-067-TAN", stock: 19, reserved: 2,  available: 17, status: "In Stock",    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop" },
  { id: 6, name: "Oak Dining Table",        category: "Tables",   sku: "TBL-112-OAK", stock: 2,  reserved: 0,  available: 2,  status: "Low Stock",  image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=80&h=80&fit=crop" },
  { id: 7, name: "Leather Lounge Chair",    category: "Chairs",   sku: "CHR-034-BRN", stock: 0,  reserved: 0,  available: 0,  status: "Out of Stock", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop" },
];

const statusStyle = (status) => {
  if (status === "In Stock")    return "bg-green-100 text-green-700";
  if (status === "Low Stock")   return "bg-yellow-100 text-yellow-700";
  if (status === "Out of Stock") return "bg-red-100 text-red-600";
};

const availableColor = (status) => {
  if (status === "In Stock")    return "text-[#C1714A]";
  if (status === "Low Stock")   return "text-[#C1714A]";
  if (status === "Out of Stock") return "text-[#C1714A]";
  return "text-[#C1714A]";
};

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockLevel, setStockLevel] = useState("All Stock Levels");
  const [selected, setSelected] = useState([]);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All Categories" || p.category === category;
    const matchStock = stockLevel === "All Stock Levels" || p.status === stockLevel;
    return matchSearch && matchCat && matchStock;
  });

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));

  return (
    <div className="min-h-screen bg-[#F5F0EB] overflow-x-hidden">

      <div className="w-64 fixed h-full z-10 left-0">
        <Sidebar />
      </div>

      <div className="ml-64 py-8 pr-8 pl-4 flex flex-col min-h-screen">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1410]">Inventory Management</h1>
          <p className="text-[#7A6A5F] mt-1">Track and manage your product inventory levels</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Stock",    value: 132, icon: <Package size={22} className="text-[#C1714A]" />,      bg: "bg-orange-100" },
            { label: "Reserved",       value: 20,  icon: <Package size={22} className="text-[#C1714A]" />,      bg: "bg-orange-100" },
            { label: "Low Stock",      value: 3,   icon: <TrendingDown size={22} className="text-yellow-600" />, bg: "bg-yellow-100", valColor: "text-yellow-600" },
            { label: "Out of Stock",   value: 1,   icon: <AlertTriangle size={22} className="text-red-500" />,   bg: "bg-red-100",    valColor: "text-red-500" },
          ].map(({ label, value, icon, bg, valColor }, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <p className="text-sm text-gray-500 font-medium">{label}</p>
                <h2 className={`text-3xl font-bold mt-1 ${valColor || "text-[#1C1410]"}`}>{value}</h2>
              </div>
              <div className={`w-12 h-12 ${bg} flex items-center justify-center rounded-xl`}>
                {icon}
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 text-gray-400">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["All Categories", "Sofas", "Chairs", "Tables", "Lighting"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none"
            value={stockLevel}
            onChange={(e) => setStockLevel(e.target.value)}
          >
            {["All Stock Levels", "In Stock", "Low Stock", "Out of Stock"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase text-xs">
                <th className="p-4 w-8">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-[#C1714A]"
                  />
                </th>
                <th className="p-4 text-left font-semibold">Product</th>
                <th className="p-4 text-left font-semibold">SKU</th>
                <th className="p-4 text-left font-semibold">Stock</th>
                <th className="p-4 text-left font-semibold">Reserved</th>
                <th className="p-4 text-left font-semibold">Available</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 last:border-none hover:bg-[#F9F6F3] transition-colors duration-150">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-[#C1714A]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-[#1C1410]">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{item.sku}</td>
                  <td className="p-4 font-bold text-[#1C1410]">{item.stock}</td>
                  <td className="p-4 text-gray-500">{item.reserved}</td>
                  <td className={`p-4 font-bold ${availableColor(item.status)}`}>{item.available}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${statusStyle(item.status)}`}>
                      {item.status === "Low Stock" && <TrendingDown size={12} />}
                      {item.status === "Out of Stock" && <AlertTriangle size={12} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="bg-[#C1714A] hover:bg-[#a85e3a] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors duration-200">
                      Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}