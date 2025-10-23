import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Building2, Hammer, Users, Shield, Award, CheckCircle2 } from "lucide-react";
import businessThreeImage from "@/assets/business-three.jpg";

const ConstructionServices = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${businessThreeImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in">
            Maitreya Construction
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in-up">
            Building excellence with quality craftsmanship and timeless design
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
              Our Construction Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From residential projects to commercial developments, we deliver excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Residential Construction</h3>
              <p className="text-muted-foreground">
                Custom homes and luxury villas designed and built to your specifications with premium materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Hammer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Commercial Projects</h3>
              <p className="text-muted-foreground">
                Office buildings, retail spaces, and commercial complexes built to modern standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Project Management</h3>
              <p className="text-muted-foreground">
                End-to-end project coordination ensuring timely delivery and quality control.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Renovation & Remodeling</h3>
              <p className="text-muted-foreground">
                Transform existing spaces with our expert renovation and modernization services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Interior Design</h3>
              <p className="text-muted-foreground">
                Complete interior design services creating aesthetically pleasing and functional spaces.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-gold rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy mb-4">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Rigorous quality checks and compliance with all safety and building regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-12 text-center">
              Our Construction Process
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-2">Consultation & Planning</h3>
                  <p className="text-muted-foreground">
                    We meet with you to understand your vision, requirements, and budget to create a comprehensive project plan.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-2">Design & Approvals</h3>
                  <p className="text-muted-foreground">
                    Our architects create detailed designs and obtain all necessary permits and regulatory approvals.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-2">Construction</h3>
                  <p className="text-muted-foreground">
                    Skilled craftsmen bring your project to life with regular progress updates and quality checks.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-navy mb-2">Handover & Support</h3>
                  <p className="text-muted-foreground">
                    Final inspection, documentation, and ongoing support to ensure your complete satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

export default ConstructionServices;
