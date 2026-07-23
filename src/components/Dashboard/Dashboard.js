import React from "react";

import Footer from "../Footer/Footer";
import MatchListingCards from "../MatchListingCards/MatchListingCards";
import RecentMatchesHeader from "../RecentMatchesHeader/RecentMatchesHeader";
import OptionCards from "../OptionCards/OptionCards";
import HeroSection from "../HeroSection/HeroSection";
import Header from "../Header/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <HeroSection/>
      <OptionCards/>
      <RecentMatchesHeader/>
      <MatchListingCards/>
      

      <Footer />
    </>
  );
};

export default Dashboard;