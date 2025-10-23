import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.to(sidebarRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
  }, [isSidebarOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gokarna Stay", path: "/gokarna-stay" },
    { name: "Finance", path: "/finance-services" },
    { name: "Construction", path: "/construction-services" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex justify-between items-center py-4">
          {/* Hamburger (left corner) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            title="Open menu"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold hover:text-yellow-400 transition-all"
          >
            <Menu size={32} strokeWidth={2.5} />
          </button>

          {/* Logo */}
          <div className="w-full flex justify-end pr-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-serif font-bold text-gold">
                Maitreya
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar (animated) */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-64 bg-[#0a0a0a]/80 backdrop-blur-xl shadow-2xl border-r border-yellow-500/20 transform -translate-x-full opacity-0 z-[60] rounded-tr-3xl rounded-br-3xl"
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-yellow-500/30">
          <h2 className="text-xl font-semibold text-gold tracking-wide">
            Menu
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
            title="Close menu"
            className="text-gold hover:text-yellow-400 transition-all"
          >
            <X size={26} strokeWidth={2.5} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-6 mt-6 space-y-5">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`text-base font-medium tracking-wide transition-all duration-200 hover:translate-x-1 hover:text-yellow-400 ${
                location.pathname === link.path
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Button
            variant="outline"
            className="mt-6 border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300 shadow-md hover:shadow-yellow-400/50"
            asChild
          >
            <Link to="/#contact" onClick={() => setIsSidebarOpen(false)}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;
