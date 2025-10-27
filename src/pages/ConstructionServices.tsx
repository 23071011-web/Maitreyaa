import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import {
  Building2,
  Hammer,
  Users,
  Shield,
  Award,
  CheckCircle2,
} from "lucide-react";
import businessThreeImage from "@/assets/business-three.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ConstructionServices = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });

    // Hero Animations
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".hero-subtext",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );
    gsap.to(".hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-bg",
        scrub: 1.2,
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <Navbar />

      {/* 🏗️ Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${businessThreeImage})`,
            filter: "brightness(0.8)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1930cc] to-[#0a1930a0]" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
            Maitreya Construction
          </h1>
          <p className="hero-subtext text-xl md:text-2xl font-light text-gray-200">
            Building excellence with integrity, innovation, and craftsmanship
          </p>
        </div>
      </section>

      {/* 🧱 Services Section */}
      <section className="py-28 bg-[#ffffff]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1930] mb-4">
              Our Core Construction Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Delivering reliable, high-quality, and sustainable construction
              solutions for every client.
            </p>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {[
              {
                icon: Building2,
                title: "Residential Construction",
                desc: "Bespoke homes and luxury villas crafted with premium materials and precise workmanship.",
              },
              {
                icon: Hammer,
                title: "Commercial Projects",
                desc: "Offices, malls, and industrial sites built with cutting-edge technology and design.",
              },
              {
                icon: Users,
                title: "Project Management",
                desc: "End-to-end project planning, budgeting, and on-site supervision for timely delivery.",
              },
              {
                icon: Shield,
                title: "Renovation & Remodeling",
                desc: "Modernize your spaces with elegant transformations and upgraded architecture.",
              },
              {
                icon: Award,
                title: "Interior Design",
                desc: "From concept to completion, we create spaces that blend aesthetics with function.",
              },
              {
                icon: CheckCircle2,
                title: "Quality Assurance",
                desc: "Strict compliance, safety checks, and ISO-grade quality processes.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-200 rounded-2xl p-10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={i * 120}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#c6a667] to-[#e2c98d] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#0a1930] mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚙️ Our Process */}
      <section className="py-28 bg-gradient-to-b from-[#f8f8f8] to-[#ffffff]">
        <div className="container mx-auto px-6">
          <div
            className="max-w-4xl mx-auto text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1930] mb-12">
              Our Construction Process
            </h2>
          </div>

          <div className="space-y-12 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Consultation & Planning",
                desc: "Understanding your needs, defining scope, and creating a transparent project plan.",
              },
              {
                step: "02",
                title: "Design & Approvals",
                desc: "Detailed blueprints and compliance documentation prepared by certified architects.",
              },
              {
                step: "03",
                title: "Execution & Supervision",
                desc: "Real-time progress monitoring and skilled craftsmanship for perfect delivery.",
              },
              {
                step: "04",
                title: "Handover & Aftercare",
                desc: "Final inspection, documentation, and post-project maintenance support.",
              },
            ].map(({ step, title, desc }, i) => (
              <div
                key={i}
                className="flex items-start gap-6"
                data-aos="fade-right"
                data-aos-delay={i * 150}
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#c6a667] to-[#e2c98d] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#0a1930] mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌐 Contact & Footer */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ConstructionServices;
