import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "support@educonnectindia.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98400 12345",
    sub: "Mon–Sat, 9AM–6PM",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "No. 12, Anna Salai, Chennai – 600 002",
    sub: "Tamil Nadu, India",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Monday – Saturday",
    sub: "9:00 AM – 6:00 PM IST",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! We'll get back to you soon.");
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main data-ocid="contact.page">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have a question? We're here to help students, parents and tutors
              across Tamil Nadu.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-bold mb-6">
              Get in Touch
            </h2>
            {CONTACT_INFO.map(({ icon: Icon, label, value, sub }) => (
              <Card key={label} className="card-hover">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-teal flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className="text-foreground text-sm mt-0.5">
                      {value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {sub}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">
              Send a Message
            </h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                {sent ? (
                  <div
                    className="text-center py-8"
                    data-ocid="contact.success_state"
                  >
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="font-display font-bold text-lg">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      We'll reply to you within 24 hours.
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-4"
                      onClick={() => setSent(false)}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="cname">Your Name</Label>
                      <Input
                        id="cname"
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cemail">Email Address</Label>
                      <Input
                        id="cemail"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cmsg">Message</Label>
                      <Textarea
                        id="cmsg"
                        placeholder="How can we help you?"
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      className="w-full gradient-teal text-white border-0 hover:opacity-90"
                      disabled={!form.name || !form.email || !form.message}
                      onClick={handleSubmit}
                      data-ocid="contact.submit_button"
                    >
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
