import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ label, options = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (option) => {
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown-container">
      {/* Dropdown Button */}
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/close state
      >
        {label}
        <span className="dropdown-arrow">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleItemClick(option)} // Pass the selected option
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;