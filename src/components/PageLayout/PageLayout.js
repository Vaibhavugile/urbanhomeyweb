import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PageLayout = ({ children }) => {
  return (
    <>
      
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default PageLayout;