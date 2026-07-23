import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ Agar sessionStorage mein scrollTo hai toh top par mat jao
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (!scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;