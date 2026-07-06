import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Communities from "./pages/Communities";
import CommunityHub from "./pages/CommunityHub";
import Map from "./pages/Map";
import Events from "./pages/Events";
import Funds from "./pages/Funds";
import Marketplace from "./pages/Marketplace";
import Investments from "./pages/Investments";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="lc-dash-mobile-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lc-dash-menu-btn"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-xl font-bold text-brand tracking-[0.02em] uppercase">ROUND</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/communities"
          element={
            <DashboardLayout>
              <Communities />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/community/:id"
          element={
            <DashboardLayout>
              <CommunityHub />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/map"
          element={
            <DashboardLayout>
              <Map />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <DashboardLayout>
              <Events />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/funds"
          element={
            <DashboardLayout>
              <Funds />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/marketplace"
          element={
            <DashboardLayout>
              <Marketplace />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/investments"
          element={
            <DashboardLayout>
              <Investments />
            </DashboardLayout>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
