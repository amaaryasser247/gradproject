import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  Sofa,
  Armchair,
  Table,
  BedDouble,
  Lamp,
  Sparkles,
  Boxes,
  TreePalm,
} from "lucide-react";

const categories = [
  { id: 1, name: "Sofas", products: 245, growth: 12 },
  { id: 2, name: "Chairs", products: 312, growth: 8 },
  { id: 3, name: "Tables", products: 189, growth: 15 },
  { id: 4, name: "Beds", products: 156, growth: 5 },
  { id: 5, name: "Lighting", products: 203, growth: 18 },
  { id: 6, name: "Decor", products: 179, growth: 7 },
  { id: 7, name: "Storage", products: 124, growth: 10 },
  { id: 8, name: "Outdoor", products: 98, growth: 22 },
];

const iconMap = {
  Sofas: Sofa,
  Chairs: Armchair,
  Tables: Table,
  Beds: BedDouble,
  Lighting: Lamp,
  Decor: Sparkles,
  Storage: Boxes,
  Outdoor: TreePalm,
};

export default function Categories() {
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catList, setCatList] = useState(categories);

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    setCatList((prev) => [
      ...prev,
      { id: Date.now(), name: newCategory.trim(), products: 0, growth: 0 },
    ]);
    setNewCategory("");
    setShowModal(false);
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <div className="ml-64 w-full min-h-screen bg-[#F5F0EB] py-10 px-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1C1410]">
            Product Categories
          </h1>
          <p className="text-sm text-[#7A6A5F] mt-1">
            Organize and manage your product categories
          </p>
        </div>

        {/* ✅ GRID 3 Columns */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {catList.map((cat, index) => {
            const Icon = iconMap[cat.name];

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                className={`bg-white rounded-2xl p-6 border border-[#C1714A1A] transition ${
                  hovered === cat.id
                    ? "shadow-xl -translate-y-1"
                    : "shadow-sm"
                }
                
                ${index >= 6 ? "col-span-1 md:col-span-1 lg:col-span-1" : ""}
                `}
              >
                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F3E8E2] mb-4">
                  {Icon && <Icon className="text-[#C1714A]" size={22} />}
                </div>

                {/* TEXT */}
                <h3 className="font-bold text-lg mb-2">{cat.name}</h3>

                <p className="text-sm text-gray-500">
                  {cat.products} products
                </p>

                {cat.growth > 0 && (
                  <p className="text-green-500 text-sm mt-1">
                    +{cat.growth}%
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* PANEL */}
        <div className="bg-white rounded-2xl px-8 py-7 flex justify-between items-center border shadow-sm">
          <div>
            <h2 className="font-bold mb-1">Category Management</h2>
            <p className="text-sm text-gray-500">
              Add or manage categories
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#C1714A] text-white px-6 py-3 rounded-lg"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="border p-2 mb-3 w-full"
            />

            <button
              onClick={handleAdd}
              className="bg-[#C1714A] text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}