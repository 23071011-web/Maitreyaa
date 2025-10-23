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
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Insert into database - handle optional phone field
      const dataToInsert = {
        name: validatedData.name,
        email: validatedData.email,
        business: validatedData.business,
        message: validatedData.message,
        ...(validatedData.phone && { phone: validatedData.phone }),
      };

      // @ts-ignore - Type will be regenerated after migration
      const { error } = await supabase
        .from("contact_inquiries")
        .insert([dataToInsert]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
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
    <section id="contact" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let us help you plan your perfect experience with Maitreya
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">
                    Bangalore ,(Karnataka)
                    Postalcode: 560090
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Mail className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    hello@maitreya.ind.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-navy mb-2">Call Us</h3>
                  <p className="text-muted-foreground">+91 87224 68233</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div>
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="border-gold/30 focus:border-gold"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="border-gold/30 focus:border-gold"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="border-gold/30 focus:border-gold"
                />
              </div>
              <div>
                <select
               
  value={formData.business}
  onChange={(e) =>
    setFormData({ ...formData, business: e.target.value })
  }
  required
  aria-label="Select Business"
  className="w-full px-3 py-2 border border-gold/30 rounded-md focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
>
  <option value="">Select Business</option>
  <option value="Gokarna Stay">Gokarna Stay</option>
  <option value="Maitreya Finance">Maitreya Finance</option>
  <option value="Maitreya Construction">Maitreya Construction</option>
  <option value="General Inquiry">General Inquiry</option>
</select>

              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="border-gold/30 focus:border-gold resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-navy hover:bg-gold/90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
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
