import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLElement | null)[]>([]);
  const logoRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate navbar appearance on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      delay: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  }, []);

  // Sidebar animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    if (isSidebarOpen) {
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4 })
        .to(sidebarRef.current, { x: 0, opacity: 1, duration: 0.6 }, "<")
        .fromTo(
          linksRef.current,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        );
    } else {
      tl.to(linksRef.current, { opacity: 0, x: -20, stagger: 0.05, duration: 0.3 })
        .to(sidebarRef.current, { x: "-100%", opacity: 0, duration: 0.4 }, "-=0.1")
        .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
    }
  }, [isSidebarOpen]);

  // Scroll to contact helper
  const goToContact = () => {
    const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToContact, 300);
    } else {
      scrollToContact();
    }
    setIsSidebarOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hostel Stay", path: "/gokarna-stay" },
    { name: "Finance", path: "/finance-services" },
    { name: "Construction", path: "/construction-services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="relative flex justify-between items-center py-4">
          {/* Hamburger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gold hover:text-yellow-400 transition-all"
          >
            <Menu size={32} strokeWidth={2.5} />
          </button>

          {/* Logo */}
          <div className="w-full flex justify-end pr-6 items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span
                ref={logoRef}
                className="text-2xl font-serif font-bold text-gold tracking-wide"
              >
                Maitreya
              </span>
            </Link>

            {/* Desktop Contact */}
            <button
              onClick={goToContact}
              className={`hidden md:inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
                location.pathname === "/contact"
                  ? "text-yellow-400"
                  : "text-gold hover:text-yellow-400"
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-64 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl border-r border-yellow-500/20 transform -translate-x-full opacity-0 z-[60] rounded-tr-3xl rounded-br-3xl"
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-yellow-500/30">
          <h2 className="text-xl font-semibold text-gold tracking-wide">
            Menu
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
            className="text-gold hover:text-yellow-400 transition-all"
          >
            <X size={26} strokeWidth={2.5} />
          </button>
        </div>

        {/* Animated Links */}
        <div className="flex flex-col px-6 mt-6 space-y-5">
          {navLinks.map((link, i) =>
            link.name === "Contact" ? (
              <button
                key="contact-btn"
                ref={(el) => (linksRef.current[i] = el)}
                onClick={goToContact}
                className="text-base text-gray-300 font-medium tracking-wide transition-all hover:translate-x-1 hover:text-yellow-400 text-left"
              >
                Contact
              </button>
            ) : (
              <Link
                key={link.path}
                ref={(el) => (linksRef.current[i] = el)}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`text-base font-medium tracking-wide transition-all hover:translate-x-1 hover:text-yellow-400 ${
                  location.pathname === link.path
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            )
          )}

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
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </>
  );
};

export default Navbar;
