import Sidebar from "./Sidebar";
import {
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Eye,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-[#F5F0EB]">

      {/* SIDEBAR (بدون أي تعديل) */}
      <div className="w-64 fixed h-full z-10">
        <Sidebar />
      </div>

      {/* CONTENT */}
      {/* استخدمنا flex-1 بدل w-full عشان المحتوى يتوزع على المساحة المتبقية بالظبط */}
      <div className="flex-1 ml-64 p-8 lg:p-10 flex flex-col">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1410]">
            Analytics
          </h1>
          <p className="text-[#7A6A5F] mt-1">
            Track your business performance and insights
          </p>
        </div>

        {/* STATS */}
        {/* خلينا الجريد متجاوب أكتر عشان يملأ المساحة بشكل أحسن */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* CARD 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
              <h2 className="text-2xl font-bold text-[#1C1410] mt-1">$359.8K</h2>
              <p className="text-green-600 text-sm mt-1 font-medium">
                +18% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-xl">
              <TrendingUp className="text-[#C1714A]" />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Orders</p>
              <h2 className="text-2xl font-bold text-[#1C1410] mt-1">694</h2>
              <p className="text-green-600 text-sm mt-1 font-medium">
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-xl">
              <ShoppingCart className="text-[#C1714A]" />
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500 font-medium">Avg Order Value</p>
              <h2 className="text-2xl font-bold text-[#1C1410] mt-1">$518</h2>
              <p className="text-green-600 text-sm mt-1 font-medium">
                +5% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-xl">
              <BarChart3 className="text-[#C1714A]" />
            </div>
          </div>

          {/* CARD 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm text-gray-500 font-medium">Page Views</p>
              <h2 className="text-2xl font-bold text-[#1C1410] mt-1">89.2K</h2>
              <p className="text-green-600 text-sm mt-1 font-medium">
                +23% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 flex items-center justify-center rounded-xl">
              <Eye className="text-[#C1714A]" />
            </div>
          </div>
        </div>

        {/* TABLE */}
        {/* ضفنا flex-1 عشان الجدول ياخد باقي المساحة الطولية براحته */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 w-full overflow-hidden">

          <h2 className="text-xl font-bold mb-6 text-[#1C1410]">
            Top Performing Products
          </h2>

          {/* HEADER */}
          <div className="grid grid-cols-3 text-sm text-gray-500 pb-4 border-b px-2 font-medium">
            <span>Product</span>
            <span className="text-center">Units Sold</span>
            <span className="text-right">Revenue</span>
          </div>

          {/* ROWS */}
          <div className="mt-2">
            {[
              {
                name: "Modern Velvet Sofa",
                units: 48,
                revenue: "$62,352",
              },
              {
                name: "Scandinavian Chair",
                units: 124,
                revenue: "$30,876",
              },
              {
                name: "Marble Coffee Table",
                units: 36,
                revenue: "$32,364",
              },
              {
                name: "Industrial Lamp",
                units: 67,
                revenue: "$12,663",
              },
            ].map((item, i) => (
              <div
                key={i}
                // ضفنا hover effect للصفوف وبادينج أحسن عشان الشكل يكون أشيك
                className="grid grid-cols-3 py-4 px-2 border-b border-gray-50 last:border-none items-center transition-colors duration-200 hover:bg-[#F9F6F3] rounded-lg cursor-default"
              >
                <span className="text-[#1C1410] font-medium">
                  {item.name}
                </span>

                <span className="text-center text-gray-700">
                  {item.units}
                </span>

                <span className="text-right text-[#C1714A] font-semibold">
                  {item.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}