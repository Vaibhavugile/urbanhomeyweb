import React from "react";
import "./MatchListingCards.css";

import { FaMapMarkerAlt } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";

/* ROOM IMAGES */
import Room1 from "./room1.jpg";
import Room2 from "./room2.jpg";
import Room3 from "./room3.jpg";

/* USER IMAGES */
import User1 from "./user1.jpg";
import User2 from "./user2.jpg";
import User3 from "./user3.jpg";

const getBadgeClass = (badge) => {
  if (badge === "HOT") return "badge-hot";
  if (badge === "NEW" || badge === "NEW LISTING") return "badge-new";
  if (badge === "TRENDING") return "badge-trending";
  if (badge === "POPULAR") return "badge-popular";
  return "";
};

function MatchListingCards() {
  const listings = [
    {
      image: Room1,
      location: "Kothrud, Pune",
      badge: "95% MATCH",
      type: "ROOM SHARE",
      title: "Kothrud Apartment",
      price: "₹8,500",
      users: "Priya & Sneha",
      avatar1: User1,
      avatar2: User2,
      tags: ["FEMALE ONLY", "WIFI"],
    },
    {
      image: Room2,
      location: "Koramangala, Bengaluru",
      badge: "NEW LISTING",
      type: "PRIVATE ROOM",
      title: "Koramangala Premium Flat",
      price: "₹14,000",
      users: "Rahul & Aman",
      avatar1: User2,
      avatar2: User3,
      tags: ["METRO", "AC"],
    },
    {
      image: Room3,
      location: "Gachibowli, Hyderabad",
      badge: "98% MATCH",
      type: "CO-LIVING",
      title: "Gachibowli Tech Stay",
      price: "₹16,000",
      users: "Neha & Riya",
      avatar1: User3,
      avatar2: User1,
      tags: ["POOL", "GYM"],
    },
    {
      image: Room1,
      location: "Salt Lake, Kolkata",
      badge: "HOT",
      type: "ROOM SHARE",
      title: "Salt Lake Shared Apartment",
      price: "₹9,500",
      users: "Karan & Vikram",
      avatar1: User1,
      avatar2: User3,
      tags: ["FOOD", "WIFI"],
    },
    {
      image: Room2,
      location: "Anna Nagar, Chennai",
      badge: "NEW",
      type: "PRIVATE ROOM",
      title: "Anna Nagar Executive Room",
      price: "₹11,500",
      users: "Arjun & Naveen",
      avatar1: User2,
      avatar2: User1,
      tags: ["BALCONY", "PARKING"],
    },
    {
      image: Room3,
      location: "Connaught Place, Delhi",
      badge: "96% MATCH",
      type: "ROOM SHARE",
      title: "Central Delhi Flat",
      price: "₹18,000",
      users: "Pooja & Nisha",
      avatar1: User3,
      avatar2: User2,
      tags: ["SECURITY", "METRO"],
    },
    {
      image: Room1,
      location: "Bandra, Mumbai",
      badge: "TRENDING",
      type: "PRIVATE ROOM",
      title: "Bandra Urban Flat",
      price: "₹22,000",
      users: "Aditya & Sahil",
      avatar1: User1,
      avatar2: User2,
      tags: ["WORKSPACE", "AC"],
    },
    {
      image: Room2,
      location: "Satellite, Ahmedabad",
      badge: "97% MATCH",
      type: "CO-LIVING",
      title: "Satellite Co-Living Space",
      price: "₹10,500",
      users: "Anjali & Meera",
      avatar1: User2,
      avatar2: User3,
      tags: ["GYM", "HOUSEKEEPING"],
    },
    {
      image: Room3,
      location: "Civil Lines, Jaipur",
      badge: "POPULAR",
      type: "PRIVATE ROOM",
      title: "Civil Lines Residency",
      price: "₹8,500",
      users: "Jay & Krunal",
      avatar1: User3,
      avatar2: User1,
      tags: ["WIFI", "PARKING"],
    },
    {
      image: Room1,
      location: "Hazratganj, Lucknow",
      badge: "94% MATCH",
      type: "ROOM SHARE",
      title: "Hazratganj Apartment",
      price: "₹7,500",
      users: "Rohit & Akash",
      avatar1: User1,
      avatar2: User2,
      tags: ["NON-SMOKER", "FOOD"],
    },
  ];

  return (
    <div className="listing-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {listings.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="listing-card">

              {/* IMAGE */}
              <div className="listing-image-section">
                <img src={item.image} alt="room" className="listing-image" />

                <div className={`listing-badge ${getBadgeClass(item.badge)}`}>
                  {item.badge}
                </div>

                <div className="listing-location">
                  <FaMapMarkerAlt />
                  <span>{item.location}</span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="listing-content">
                <span className="listing-type">{item.type}</span>

                <div className="listing-title-row">
                  <h2>{item.title}</h2>
                  <h3>{item.price}</h3>
                </div>

                <div className="listing-user-row">
                  <div className="listing-avatars">
                    <img src={item.avatar1} alt="user" />
                    <img src={item.avatar2} alt="user" />
                  </div>
                  <p>{item.users}</p>
                </div>

                <div className="listing-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MatchListingCards;