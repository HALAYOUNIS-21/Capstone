import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "../Styles/notfound.css"; // Import your CSS styles

export default function NotFound() {
  const navigate = useNavigate();

  // ✅ Navigate back to the Home page
  const handleGoHome = () => {
    navigate("/"); // Redirects to the homepage
  };

  return (
    <div className="notfound-container">
      {/* ✅ Global Header */}
      <Header />

      {/* ✅ 404 Error Image */}
      <img
        src="/images/404.png" // Assuming the image is in public/images
        alt="404 Error"
        className="notfound-icon"
      />

      {/* ✅ Error Title */}
      <h1 className="notfound-title">Error</h1>

      {/* ✅ Submessage */}
      <p className="notfound-subtitle">Oops, something went wrong</p>

      {/* ✅ Go to Home Button */}
      <button onClick={handleGoHome} className="reload-button">
        Reload
      </button>
    </div>
  );
}