import React, { useRef } from "react";
import "./SuggestedMatches.css";

import { Heart } from "lucide-react";

import profile1 from "./profile2.jpg";
import profile2 from "./profile1.jpg";
import profile3 from "./profile3.jpg";
import profile4 from "./profile4.jpg";
import profile5 from "./profile5.jpg";

const SuggestedMatches = () => {
  const sliderRef = useRef(null);

  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    sliderRef.current.classList.add("dragging");
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const matches = [
    {
      id: 1,
      name: "Alex",
      age: 24,
      match: "92%",
      role: "LISTER",
      image: profile1,
    },
    {
      id: 2,
      name: "Priya",
      age: 27,
      match: "89%",
      role: "RENTER",
      image: profile2,
    },
    {
      id: 3,
      name: "Sophia",
      age: 25,
      match: "95%",
      role: "LISTER",
      image: profile3,
    },
    {
      id: 4,
      name: "Emma",
      age: 26,
      match: "91%",
      role: "RENTER",
      image: profile4,
    },
    {
      id: 5,
      name: "Olivia",
      age: 23,
      match: "94%",
      role: "LISTER",
      image: profile5,
    },
  ];

  return (
    <section className="matches-section">
      <div className="matches-header">
        <h1>Suggested Matches</h1>

        <button>View All</button>
      </div>

      <div
        ref={sliderRef}
        className="matches-container"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {matches.map((item) => (
          <div className="match-card" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="overlay"></div>

            <div className="role-tag">{item.role}</div>

            <div className="card-content">
              <h2>
                {item.name}, {item.age}
              </h2>

              <div className="match-score">
                <Heart size={14} fill="currentColor" />
                {item.match} Match
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedMatches;