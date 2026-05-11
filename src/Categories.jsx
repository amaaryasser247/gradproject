import { useEffect, useState } from "react";
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
  Package,
  Trash2,
  Image as ImageIcon,
  Wind
} from "lucide-react";
import { getApiErrorMessage } from "./services/api";
import { createCategory, getCategories } from "./services/categoryService";

const fallbackCategories = [
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
  "Sofas": Sofa,
  "Chairs": Armchair,
  "Tables": Table,
  "Beds": BedDouble,
  "Lighting": Lamp,
  "Decor": Sparkles,
  "Storage": Boxes,
  "Outdoor": TreePalm,
  "Mirrors": ImageIcon,
  "Curtains": Wind,
};

function getIconForCategory(name) {
  const normalizedName = (name || "").trim().toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (key.toLowerCase() === normalizedName) {
      return Icon;
    }
  }
  return Package; // Default icon
}

function unwrapList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.categories)) return data.categories;
  return [];
}

function normalizeCategory(category) {
  return {
    ...category,
    id: category.id ?? category.categoryId ?? Date.now(),
    name: category.name ?? category.categoryName ?? "Untitled Category",
    products: category.productsCount ?? category.productCount ?? category.products ?? 0,
    growth: category.growth ?? 0,
  };
}

export default function Categories() {
  const [hovered, setHovered] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [catList, setCatList] = useState(fallbackCategories);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        const apiCategories = unwrapList(data).map(normalizeCategory);

        if (apiCategories.length > 0) {
          setCatList(apiCategories);
        }
      } catch (error) {
        setError(getApiErrorMessage(error, "Showing sample categories because categories could not be loaded."));
      }
    }

    loadCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;

    const isPredefined = fallbackCategories.some(c => c.name.toLowerCase() === newCategory.trim().toLowerCase());

    // Only call the API if it's a completely new category not in the defaults
    if (!isPredefined) {
      try {
        await createCategory(newCategory.trim());
      } catch (error) {
        // Silent catch to prevent console clutter
      }
    }

    // Always add to UI
    const existingDefault = fallbackCategories.find(c => c.name.toLowerCase() === newCategory.trim().toLowerCase());
    const category = existingDefault || normalizeCategory({ name: newCategory.trim() });
    
    setCatList((prev) => [...prev, category]);
    setNewCategory("");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    // There is no DELETE endpoint in the API, so we just remove it from the UI for now.
    setCatList((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div className="flex">

      
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      
      <div className="ml-64 w-full min-h-screen bg-[#F5F0EB] py-10 px-10">

        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1C1410]">
            Product Categories
          </h1>
          <p className="text-sm text-[#7A6A5F] mt-1">
            Organize and manage your product categories
          </p>
          {error && (
            <p className="text-sm text-red-500 mt-3">{error}</p>
          )}
        </div>

        
        <div className="bg-white rounded-2xl px-8 py-7 flex justify-between items-center border shadow-sm mb-10">
          <div>
            <h2 className="font-bold mb-1">Category Management</h2>
            <p className="text-sm text-gray-500">
              Add or manage categories
            </p>
          </div>

          <button
            onClick={() => {
              setNewCategory("");
              setShowModal(true);
            }}
            className="bg-[#C1714A] text-white px-6 py-3 rounded-lg hover:bg-[#a15f3e] transition"
          >
            + Add Category
          </button>
        </div>

        
        <div className="grid grid-cols-3 gap-6 mb-10">
          {catList.map((cat, index) => {
            const Icon = getIconForCategory(cat.name);

            return (
              <div
                key={`${cat.id}-${index}`}
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
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F3E8E2]">
                    {Icon && <Icon className="text-[#C1714A]" size={22} />}
                  </div>
                  
                  {hovered === cat.id && (
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Delete Category"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                
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
      </div>

      
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-8 rounded-2xl w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            
            <label className="block text-sm font-medium mb-2">Category Name</label>
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Chairs, Lighting..."
              className="border border-gray-300 p-3 mb-6 w-full rounded-lg outline-none focus:border-[#C1714A]"
              autoFocus
            />

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-[#C1714A] text-white px-6 py-2 rounded-lg hover:bg-[#a15f3e] transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
