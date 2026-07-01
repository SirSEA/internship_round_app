import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-cream-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-cream-50 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-800 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cream-50" />
            </div>
            <span className="text-base font-bold text-green-800">LifeCircle</span>
          </div>
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
