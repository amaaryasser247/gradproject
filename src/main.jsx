import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./index.css"

const App = lazy(() => import("./App"))
const Login = lazy(() => import("./Login"))
const SignUp = lazy(() => import("./SignUp"))
const Upload = lazy(() => import("./Upload"))
const MyProjects = lazy(() => import("./MyProjects"))
const MyCatalogs = lazy(() => import("./MyCatalogs"))
const DashboardLayout = lazy(() => import("./DashboardLayout"))
const ProjectDetails = lazy(() => import("./ProjectDetails"))
const Catalog = lazy(() => import("./Catalog"))
const ProtectedRoute = lazy(() => import("./ProtectedRoute"))
const NotFound = lazy(() => import("./NotFound"))

const AddProduct = lazy(() => import("./AddProduct"))
const Products = lazy(() => import("./Products"))
const Categories = lazy(() => import("./Categories"))
const Analytics = lazy(() => import("./Analytics"))
const Inventory = lazy(() => import("./Inventory"))
const VendorProfile = lazy(() => import("./VendorProfile"))
const VendorLayout = lazy(() => import("./VendorLayout"))
const EditProduct = lazy(() => import("./EditProduct"))
const ProductPreview = lazy(() => import("./ProductsPreview"))
const Store = lazy(() => import("./Store"))

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-[#d97757] border-t-transparent rounded-full animate-spin"></div>
  </div>
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>

        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />


        <Route path="/vendor" element={<ProtectedRoute><VendorLayout /></ProtectedRoute>}>


        <Route index element={<Navigate to="products" replace />} />


          <Route path="products" element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<VendorProfile />} />
          <Route path="/vendor/edit-product" element={<EditProduct />} />
          <Route path="/vendor/product-preview" element={<ProductPreview />} />
      <Route path="store" element={<Store />} />


        </Route>


        <Route path="/products" element={<Navigate to="/vendor/products" />} />
        <Route path="/add-product" element={<Navigate to="/vendor/add-product" />} />
        <Route path="/categories" element={<Navigate to="/vendor/categories" />} />


        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="upload" element={<Upload />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="catalogs" element={<MyCatalogs />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="catalog/:id" element={<Catalog />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)
