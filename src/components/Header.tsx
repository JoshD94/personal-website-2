import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll events to add shadow only when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about", isExternal: false },
    { name: "Experience", href: "#experience", isExternal: false },
    { name: "Projects", href: "#projects", isExternal: false },
    { name: "Technical Skills", href: "#skills", isExternal: false },
    { name: "Activities", href: "#activities", isExternal: false },
    { name: "Awards", href: "#awards", isExternal: false },
    { name: "Contact", href: "#contact", isExternal: false },
    {
      name: "Resume",
      href: "https://drive.google.com/file/d/1rURpeqlz-s0BHR177Ffj5PwhDxAmUh1W/view?usp=sharing",
      isExternal: true,
    },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal: boolean
  ) => {
    if (isExternal) return; // Don't prevent default for external links

    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Close mobile menu after clicking a link
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-header-bg z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <nav className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          <span
            onClick={scrollToTop}
            className="text-lg sm:text-xl font-semibold cursor-pointer transition-colors text-foreground truncate"
          >
            Joshua Dirga
          </span>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href, item.isExternal)}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="text-foreground hover:opacity-80 text-sm font-medium transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            ))}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-foreground" />
              ) : (
                <Moon size={20} className="text-foreground" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Theme Toggle Button for Small Devices */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 mr-1 sm:mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-foreground" />
              ) : (
                <Moon size={18} className="text-foreground" />
              )}
            </button>
            
            {/* Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:opacity-80 focus:outline-none"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-card-bg shadow-md z-50">
            <div className="flex flex-col py-1 sm:py-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href, item.isExternal)}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="px-4 py-2.5 sm:py-3 text-foreground hover:opacity-80 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm sm:text-base font-medium transition-colors cursor-pointer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;