import React from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/" className="header-title">
          Quiz-world
        </Link>
      </h1>
    </header>
  );
};

export default Header;