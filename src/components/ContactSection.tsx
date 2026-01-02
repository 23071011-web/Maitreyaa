// @ts-nocheck
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  business: z.string().trim().min(1, "Please select a business"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const dataToInsert = {
        name: validatedData.name,
        email: validatedData.email,
        business: validatedData.business,
        message: validatedData.message,
        ...(validatedData.phone && { phone: validatedData.phone }),
      };

      const { error } = await supabase
        .from("contact_inquiries")
        .insert([dataToInsert]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error sending message",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-cream via-white to-gold/10 overflow-hidden"
    >
      {/* Decorative gradient shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gold/20 blur-3xl rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-navy/10 blur-3xl rounded-full animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let us help you plan your perfect experience with <span className="font-semibold text-gold">Maitreya</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-10 animate-fade-up">
              <div className="flex items-start space-x-5 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gold/15 p-3 rounded-xl">
                  <MapPin className="text-gold" size={26} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1 text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Bangalore, Karnataka <br /> Postal Code: 560090
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-5 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gold/15 p-3 rounded-xl">
                  <Mail className="text-gold" size={26} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1 text-lg">Email Us</h3>
                  <p className="text-muted-foreground">hello@maitreya.ind.in</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 hover:translate-x-1 transition-transform duration-300">
                <div className="bg-gold/15 p-3 rounded-xl">
                  <Phone className="text-gold" size={26} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-1 text-lg">Call Us</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    +91 87224 68233 <br /> +91 77959 96542
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="backdrop-blur-md bg-white/70 border border-gold/30 p-8 rounded-2xl shadow-xl space-y-6 animate-fade-up"
            >
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/50"
              />

              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/50"
              />

              <Input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/50"
              />

              <select
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                required
                aria-label="Select Business"
                className="w-full px-3 py-2 border border-gold/30 rounded-md bg-white text-gray-800 focus:border-gold focus:ring-2 focus:ring-gold/50 transition-all"
              >
                <option value="">Select Requirement</option>
                <option value="Gokarna Stay">Hostel Stay</option>
                <option value="Maitreya Finance">Maitreya Finance</option>
                <option value="Maitreya Construction">Maitreya Realities and Equities</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>

              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/50 resize-none"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-navy font-semibold hover:bg-gold/90 transition-all rounded-xl py-3 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;


# AI edit: change ui and add new feature 
