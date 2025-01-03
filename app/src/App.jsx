import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white flex flex-col">
        {/* Header */}
        <header className="bg-secondary py-4 shadow-lg">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">My Quiz App</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-secondary py-4 text-center">
          <p className="text-sm">&copy; 2024 My Quiz App. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}