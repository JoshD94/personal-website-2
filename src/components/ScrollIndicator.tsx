import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're at or near the top of the page
      if (window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Initial check in case page loads at a scrolled position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-24 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-sm sm:text-lg text-gray-500">Discover More</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce delay-0"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce delay-150"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
