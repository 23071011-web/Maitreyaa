import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const elems = footerRef.current.querySelectorAll<HTMLElement>(".animate-footer");

    gsap.fromTo(
      elems,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-gradient-to-t from-[#f5e1a4] via-[#f9e9b9] to-[#fff7e3] text-black py-20"
    >
      {/* Decorative Background Circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-100/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="animate-footer">
            <h3 className="text-3xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-500 mb-4">
              Maitreya
            </h3>
            <p className="text-black/70 text-sm leading-relaxed">
              Creating exceptional experiences across luxury hospitality and premium services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-footer">
            <h4 className="font-semibold mb-4 text-lg text-black">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "Hostel Stay", to: "/gokarna-stay" },
                { name: "Finance", to: "/finance-services" },
                { name: "Construction", to: "/construction-services" },
                { name: "Contact", to: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-black/70 hover:text-yellow-600 transition-transform duration-300 hover:translate-x-2"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="animate-footer">
            <h4 className="font-semibold mb-4 text-lg text-black">Follow Us</h4>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-black hover:text-yellow-600 transition-transform duration-300 hover:scale-125"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                className="text-black hover:text-yellow-600 transition-transform duration-300 hover:scale-125"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                className="text-black hover:text-yellow-600 transition-transform duration-300 hover:scale-125"
                aria-label="Twitter"
              >
                <Twitter size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-black/20 pt-8 text-center text-sm text-black/80 animate-footer">
          <p>&copy; {new Date().getFullYear()} Maitreya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
