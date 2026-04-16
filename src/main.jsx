import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import App from "./App"
import Login from "./Login"
import SignUp from "./SignUp"
import Upload from "./Upload"
import MyProjects from "./MyProjects"
import DashboardLayout from "./DashboardLayout"
import ProjectDetails from "./ProjectDetails"
import Catalog from "./Catalog"

import AddProduct from "./AddProduct"
import Products from "./Products"
import Categories from "./Categories"
import Analytics from "./Analytics"
import Inventory from "./inventory"
import VendorProfile from "./VendorProfile"
import VendorLayout from "./VendorLayout"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 🔥 Vendor System */}
      <Route path="/vendor" element={<VendorLayout />}>

        {/* 👇 default لما تدخل vendor */}
       <Route index element={<Navigate to="products" replace />} />

        {/* 👇 مهم: من غير / */}
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="profile" element={<VendorProfile />} />

      </Route>

      {/* 🔥 Fix لو حد دخل لينكات غلط */}
      <Route path="/products" element={<Navigate to="/vendor/products" />} />
      <Route path="/add-product" element={<Navigate to="/vendor/add-product" />} />
      <Route path="/categories" element={<Navigate to="/vendor/categories" />} />

      {/* 🔵 Dashboard القديم */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="upload" element={<Upload />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="project/:id" element={<ProjectDetails />} />
        <Route path="catalog/:id" element={<Catalog />} />
      </Route>

    </Routes>
  </BrowserRouter>
)