import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Pages/Dashboard'
import Settings from './components/Pages/Settings'
import Users from './components/Pages/Users'
import { Products } from './components/Pages/Products'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './components/Authentication.jsx/AdminLogin'

const App = () => {
   return (
   <BrowserRouter>
      <Routes>
        <Route path="/Admin/Login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products"  element={<Products />} />
          <Route path="/Users"     element={<Users />} />
          <Route path="/Settings"  element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/Admin/Login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
