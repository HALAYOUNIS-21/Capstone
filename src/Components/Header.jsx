// src/Components/Header.jsx

import React from "react";
import "../Components/Header.css";  // ✅ Correct path to the header styles

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Quiz-world</h1>
    </header>
  );
};

export default Header;