import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CLASSES, TN_CITIES } from "../data/mockData";

export default function StudentRegistration() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    className: "",
    city: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid =
    form.name && form.email && form.phone && form.className && form.city;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Registration successful! Welcome to EduConnect India.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-lg text-center"
        data-ocid="student_reg.success_state"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </motion.div>
        <h2 className="font-display text-2xl font-bold mb-3">
          Registration Successful!
        </h2>
        <p className="text-muted-foreground">
          Welcome to EduConnect India! You can now browse tutors, post
          requirements and book classes.
        </p>
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-10 max-w-xl"
      data-ocid="student_reg.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-teal flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">
              Student Registration
            </h1>
            <p className="text-muted-foreground">
              Find the perfect tutor for your learning goals
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>
              Register to connect with tutors across Tamil Nadu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-ocid="student_reg.input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-ocid="student_reg.input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98xxx xxxxx"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                data-ocid="student_reg.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Class *</Label>
                <Select
                  value={form.className}
                  onValueChange={(v) => setForm({ ...form, className: v })}
                >
                  <SelectTrigger data-ocid="student_reg.select">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Select
                  value={form.city}
                  onValueChange={(v) => setForm({ ...form, city: v })}
                >
                  <SelectTrigger data-ocid="student_reg.select">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {TN_CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="w-full h-12 gradient-teal text-white border-0 hover:opacity-90 text-base font-semibold"
              disabled={!isValid || loading}
              onClick={handleSubmit}
              data-ocid="student_reg.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
