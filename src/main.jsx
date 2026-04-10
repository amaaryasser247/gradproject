import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from "./App"
import Login from "./Login"
import SignUp from "./SignUp"
import Upload from "./Upload"
import MyProjects from "./MyProjects"
import DashboardLayout from "./DashboardLayout"
import ProjectDetails from "./ProjectDetails"
import Catalog from "./Catalog";
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <Routes>

      <Route path="/" element={<App />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<SignUp />} />

      <Route path="/upload" element={<Upload />} />
          <Route path="/dashboard" element={<DashboardLayout />}>

  <Route path="upload" element={<Upload />} />
  <Route path="projects" element={<MyProjects />} />
  <Route path="project/:id" element={<ProjectDetails />} />
  <Route path="catalog/:id" element={<Catalog />} />

</Route>

    </Routes>


  </BrowserRouter>
)

