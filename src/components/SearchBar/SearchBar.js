import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-wrapper">
      <div className="search-box">
        <Search className="search-icon" size={28} />

        <input
          type="text"
          placeholder="Search areas..."
        />
      </div>

      <button className="filter-btn">
        <SlidersHorizontal size={30} />
      </button>
    </div>
  );
};

export default SearchBar;