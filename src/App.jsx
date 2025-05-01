import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <SidebarProvider defaultOpen={false}> 
          <AppSidebar />
          <SidebarTrigger />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </SidebarProvider>
        {/* Konten utama */}
      </div>
    </Router>
  );
}

export default App;
