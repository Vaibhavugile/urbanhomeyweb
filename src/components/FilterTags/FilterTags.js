import React from "react";

import "./FilterTags.css";

import {
  Wallet,
  MapPinned,
  Pencil
} from "lucide-react";

const FilterTags = () => {

  return (

    <div className="tags-container">

      {/* BUDGET */}

      <button className="tag-btn">

        <Wallet size={28} />

        <span>Budget</span>

      </button>

      {/* LOCATION */}

      <button className="tag-btn">

        <MapPinned size={28} />

        <span>Location</span>

      </button>

      {/* LIFESTYLE */}

      <button className="tag-btn">

        <Pencil size={28} />

        <span>Lifestyle</span>

      </button>

    </div>

  );
};

export default FilterTags;