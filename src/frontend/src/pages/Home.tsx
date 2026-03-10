import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Home as HomeIcon,
  Laptop,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import TutorCard from "../components/TutorCard";
import { MOCK_TUTORS, TN_CITIES } from "../data/mockData";

const STATS = [
  { label: "Verified Tutors", value: "500+", icon: Users },
  { label: "Cities in TN", value: "15+", icon: MapPin },
  { label: "Subjects", value: "14+", icon: BookOpen },
  { label: "Happy Students", value: "2000+", icon: Star },
];

const FEATURED_SUBJECTS = [
  { name: "Maths", emoji: "📐" },
  { name: "Science", emoji: "🔬" },
  { name: "English", emoji: "📚" },
  { name: "Tamil", emoji: "🕉️" },
  { name: "Computer Science", emoji: "💻" },
  { name: "Physics", emoji: "⚡" },
  { name: "Chemistry", emoji: "🧪" },
  { name: "Biology", emoji: "🧬" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => navigate({ to: "/tutors" });
  const featuredTutors = MOCK_TUTORS.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" data-ocid="home.section">
        <div className="absolute inset-0 pattern-dots opacity-40" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.42 0.11 195 / 0.08) 0%, oklch(0.76 0.16 62 / 0.06) 100%)",
          }}
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 gradient-saffron text-white border-0 text-xs px-3 py-1">
                🎓 Tamil Nadu's #1 Tutor Platform
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                Find the Perfect{" "}
                <span className="text-gradient-teal">Tutor</span>
                <br />
                for Your Child
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Connect with qualified tutors across Tamil Nadu for online and
                home tuition. Classes 1–12, all subjects, verified teachers.
              </p>
              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9 h-12"
                    placeholder="Search subject, city or tutor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    data-ocid="home.search_input"
                  />
                </div>
                <Button
                  className="h-12 px-6 gradient-teal text-white border-0 hover:opacity-90"
                  onClick={handleSearch}
                  data-ocid="home.primary_button"
                >
                  Search
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  "Online Tutors",
                  "Home Tutors",
                  "NEET Prep",
                  "Board Exams",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => navigate({ to: "/tutors" })}
                    className="text-xs px-3 py-1.5 bg-white border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img
                src="/assets/generated/hero-educonnect.dim_1200x500.jpg"
                alt="EduConnect India Tutors"
                className="w-full rounded-3xl shadow-xl object-cover h-80"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full gradient-teal flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold">500+ Tutors</div>
                  <div className="text-[10px] text-muted-foreground">
                    Verified & Approved
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-sm">4.8</span>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Avg Rating
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-white py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map(({ label, value, icon: Icon }) => (
              <motion.div key={label} variants={item} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="h-10 w-10 rounded-xl gradient-teal flex items-center justify-center">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="font-display font-bold text-2xl text-foreground">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Find by Tuition Type */}
      <section
        className="py-14 container mx-auto px-4"
        data-ocid="home.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold mb-2">
            How Would You Like to Learn?
          </h2>
          <p className="text-muted-foreground">
            Choose the tuition format that suits your schedule
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link to="/tutors" data-ocid="home.card">
            <Card className="card-hover cursor-pointer border-2 hover:border-primary transition-colors overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Laptop className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  Online Tuition
                </h3>
                <p className="text-muted-foreground text-sm">
                  Learn from top tutors via video calls. Flexible scheduling.
                </p>
                <Badge className="mt-4 bg-blue-50 text-blue-700 border-0">
                  {
                    MOCK_TUTORS.filter(
                      (t) =>
                        t.tuitionType === "online" || t.tuitionType === "both",
                    ).length
                  }{" "}
                  Tutors Available
                </Badge>
              </CardContent>
            </Card>
          </Link>
          <Link to="/tutors" data-ocid="home.card">
            <Card className="card-hover cursor-pointer border-2 hover:border-primary transition-colors overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  Home Tuition
                </h3>
                <p className="text-muted-foreground text-sm">
                  Expert tutors come to your home across Tamil Nadu cities.
                </p>
                <Badge className="mt-4 bg-green-50 text-green-700 border-0">
                  {
                    MOCK_TUTORS.filter(
                      (t) =>
                        t.tuitionType === "offline" || t.tuitionType === "both",
                    ).length
                  }{" "}
                  Tutors Available
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Find by Gender */}
      <section className="py-8 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold mb-1">
                Find Tutors by Gender
              </h2>
              <p className="text-muted-foreground text-sm">
                Many parents prefer specific gender tutors for their children
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/tutors">
                <Button
                  variant="outline"
                  className="gap-2 border-pink-200 text-pink-700 hover:bg-pink-50"
                  data-ocid="home.secondary_button"
                >
                  👩 Female Tutors (
                  {MOCK_TUTORS.filter((t) => t.gender === "female").length})
                </Button>
              </Link>
              <Link to="/tutors">
                <Button
                  variant="outline"
                  className="gap-2 border-sky-200 text-sky-700 hover:bg-sky-50"
                  data-ocid="home.secondary_button"
                >
                  👨 Male Tutors (
                  {MOCK_TUTORS.filter((t) => t.gender === "male").length})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Find by City */}
      <section
        className="py-14 container mx-auto px-4"
        data-ocid="home.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold mb-2">
            Find Tutors by City
          </h2>
          <p className="text-muted-foreground">
            We cover all major cities across Tamil Nadu
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {TN_CITIES.map((city) => (
            <motion.div key={city} variants={item}>
              <Link to="/tutors">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-border shadow-xs hover:shadow-card hover:border-primary hover:text-primary transition-all text-sm font-medium"
                  data-ocid="home.button"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {city}
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Find by Subject */}
      <section className="py-14 bg-accent/20" data-ocid="home.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold mb-2">
              Browse by Subject
            </h2>
            <p className="text-muted-foreground">
              Expert tutors for every subject from Class 1 to 12
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURED_SUBJECTS.map(({ name, emoji }, idx) => (
              <Link key={name} to="/tutors">
                <Card
                  className="card-hover cursor-pointer"
                  data-ocid={`home.item.${idx + 1}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{emoji}</div>
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {
                        MOCK_TUTORS.filter((t) => t.subjects.includes(name))
                          .length
                      }{" "}
                      tutors
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section
        className="py-14 container mx-auto px-4"
        data-ocid="home.section"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Featured Tutors</h2>
            <p className="text-muted-foreground mt-1">
              Top-rated tutors across Tamil Nadu
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tutors" data-ocid="home.secondary_button">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {featuredTutors.map((tutor, idx) => (
            <motion.div key={tutor.id} variants={item}>
              <TutorCard tutor={tutor} index={idx + 1} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-14" data-ocid="home.section">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl gradient-teal p-10 text-center text-white">
            <h2 className="font-display text-3xl font-bold mb-3">
              Are You a Tutor?
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">
              Join 500+ qualified tutors on EduConnect India and grow your
              student base across Tamil Nadu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                asChild
              >
                <Link to="/register-tutor" data-ocid="home.primary_button">
                  Register as Tutor
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact" data-ocid="home.secondary_button">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
