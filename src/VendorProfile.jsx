import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Globe,
  Camera,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Trash2,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");

  const [form, setForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@casamood.com",
    phone: "+20 100 123 4567",
    location: "Cairo, Egypt",
    storeName: "Casa Mood Store",
    website: "www.casamood.com",
    bio: "Passionate furniture vendor with over 10 years of experience in modern and Scandinavian design.",
  });

  const tabs = [
    { id: "personal",  label: "Personal Info",   icon: User },
    { id: "store",     label: "Store Settings",  icon: Store },
    { id: "security",  label: "Security",        icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing",   label: "Billing",         icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0EB] overflow-x-hidden">

      <div className="w-64 fixed h-full z-10 left-0">
        <Sidebar />
      </div>

      <div className="ml-64 py-8 pr-8 pl-4 flex flex-col min-h-screen">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1C1410]">Profile</h1>
          <p className="text-[#7A6A5F] mt-1">Manage your account settings and preferences</p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-[#C1714A] flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#C1714A] rounded-full flex items-center justify-center text-white shadow-md hover:bg-[#a85e3a] transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#1C1410]">John Doe</h2>
            <p className="text-[#7A6A5F]">Vendor · Casa Mood Store</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Mail size={14} /> john.doe@casamood.com
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin size={14} /> Cairo, Egypt
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="text-center px-6 py-3 bg-[#F5F0EB] rounded-2xl">
              <p className="text-2xl font-bold text-[#C1714A]">47</p>
              <p className="text-xs text-gray-500 mt-1">Products</p>
            </div>
            <div className="text-center px-6 py-3 bg-[#F5F0EB] rounded-2xl">
              <p className="text-2xl font-bold text-[#C1714A]">694</p>
              <p className="text-xs text-gray-500 mt-1">Orders</p>
            </div>
            <div className="text-center px-6 py-3 bg-[#F5F0EB] rounded-2xl">
              <p className="text-2xl font-bold text-[#C1714A]">4.8★</p>
              <p className="text-xs text-gray-500 mt-1">Rating</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 flex-1">

          {/* TABS */}
          <div className="w-56 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex flex-col gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    activeTab === id
                      ? "bg-[#C1714A] text-white shadow-sm"
                      : "text-gray-600 hover:bg-[#F5F0EB]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}

              <div className="mt-2 pt-2 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 w-full">
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1">

            {/* PERSONAL INFO */}
            {activeTab === "personal" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1C1410] mb-6">Personal Information</h3>
                <div className="grid grid-cols-2 gap-5">

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">First Name</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <User size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Last Name</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <User size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Email Address</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <Mail size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Phone Number</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <Phone size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Location</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <MapPin size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Bio</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm text-[#1C1410] resize-none"
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-[#C1714A] hover:bg-[#a85e3a] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* STORE SETTINGS */}
            {activeTab === "store" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1C1410] mb-6">Store Settings</h3>
                <div className="flex flex-col gap-5">

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Store Name</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <Store size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.storeName}
                        onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Website</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                      <Globe size={16} className="text-gray-400" />
                      <input
                        className="flex-1 outline-none text-sm text-[#1C1410]"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-1 block">Store Status</label>
                    <div className="flex gap-3">
                      {["Active", "Vacation Mode", "Inactive"].map((s) => (
                        <button
                          key={s}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                            s === "Active"
                              ? "bg-[#C1714A] text-white border-[#C1714A]"
                              : "border-gray-200 text-gray-500 hover:bg-[#F5F0EB]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-[#C1714A] hover:bg-[#a85e3a] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1C1410] mb-6">Security Settings</h3>
                <div className="flex flex-col gap-5">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
                      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3">
                        <Lock size={16} className="text-gray-400" />
                        <input type="password" className="flex-1 outline-none text-sm text-[#1C1410]" placeholder="••••••••" />
                      </div>
                    </div>
                  ))}

                  <div className="bg-[#F5F0EB] rounded-xl p-4 flex items-center gap-3">
                    <Shield size={20} className="text-[#C1714A]" />
                    <div>
                      <p className="text-sm font-semibold text-[#1C1410]">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="ml-auto bg-[#C1714A] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#a85e3a] transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-[#C1714A] hover:bg-[#a85e3a] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1C1410] mb-6">Notification Preferences</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "New Orders",          desc: "Get notified when you receive a new order" },
                    { label: "Low Stock Alerts",    desc: "Alert when product stock falls below threshold" },
                    { label: "Payment Received",    desc: "Notify when a payment is processed" },
                    { label: "Product Reviews",     desc: "Get notified about new product reviews" },
                    { label: "Promotions & Offers", desc: "Receive updates about platform promotions" },
                  ].map(({ label, desc }, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-[#F9F6F3] transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-[#1C1410]">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#C1714A] rounded-full transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BILLING */}
            {activeTab === "billing" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-[#1C1410] mb-6">Billing & Payments</h3>

                <div className="bg-linear-to-r from-[#C1714A] to-[#a85e3a] rounded-2xl p-6 text-white mb-6">
                  <p className="text-sm opacity-80 mb-1">Current Plan</p>
                  <h4 className="text-2xl font-bold">Vendor Pro</h4>
                  <p className="text-sm opacity-80 mt-1">$29/month · Renews on May 14, 2026</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase">Payment Methods</h4>
                  {[
                    { type: "Visa",       last4: "4242", expiry: "12/26" },
                    { type: "Mastercard", last4: "8891", expiry: "08/25" },
                  ].map(({ type, last4, expiry }, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-[#F9F6F3] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5F0EB] rounded-xl flex items-center justify-center">
                          <CreditCard size={18} className="text-[#C1714A]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1C1410]">{type} •••• {last4}</p>
                          <p className="text-xs text-gray-400">Expires {expiry}</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">Remove</button>
                    </div>
                  ))}
                  <button className="mt-2 border-2 border-dashed border-[#C1714A] text-[#C1714A] font-semibold text-sm py-3 rounded-xl hover:bg-orange-50 transition-colors">
                    + Add Payment Method
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}