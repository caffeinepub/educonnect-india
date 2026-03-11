import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Home as HomeIcon,
  Laptop,
  MapPin,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import TutorCard from "../components/TutorCard";
import { CLASSES, MOCK_TUTORS, SUBJECTS, TN_CITIES } from "../data/mockData";

const STATS = [
  { label: "Verified Tutors", value: "500+", icon: Users },
  { label: "Cities in TN", value: "15+", icon: MapPin },
  { label: "Subjects", value: "14+", icon: BookOpen },
  { label: "Happy Students", value: "2000+", icon: Star },
];

const TRENDING_SUBJECTS = [
  { name: "Maths", emoji: "📐", trend: "+34%" },
  { name: "Physics", emoji: "⚡", trend: "+28%" },
  { name: "Chemistry", emoji: "🧪", trend: "+22%" },
  { name: "Biology", emoji: "🧬", trend: "+41%" },
  { name: "Computer Science", emoji: "💻", trend: "+55%" },
  { name: "English", emoji: "📚", trend: "+19%" },
  { name: "Tamil", emoji: "🕉️", trend: "+15%" },
  { name: "Social Science", emoji: "🌍", trend: "+12%" },
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
  const [subject, setSubject] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => navigate({ to: "/tutors" });
  const featuredTutors = MOCK_TUTORS.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden" data-ocid="home.section">
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.12 195 / 0.10) 0%, oklch(0.65 0.18 62 / 0.08) 100%)",
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
                🎓 Tamil Nadu&apos;s #1 Tutor Platform
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                Find the Best Tutors in{" "}
                <span className="text-gradient-teal">Tamil Nadu</span> for
                Online &amp; Home Tuition
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Connect with verified tutors across Tamil Nadu for Classes 1–12.
                All subjects. Online &amp; Home tuition available.
              </p>

              {/* 3-field structured search */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-3 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="h-11" data-ocid="home.select">
                      <SelectValue placeholder="📚 Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="h-11" data-ocid="home.select">
                      <SelectValue placeholder="🎒 Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {CLASSES.map((c) => (
                        <SelectItem key={c} value={c}>
                          Class {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-11" data-ocid="home.select">
                      <SelectValue placeholder="📍 Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {TN_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full h-11 gradient-teal text-white border-0 hover:opacity-90 font-semibold"
                  onClick={handleSearch}
                  data-ocid="home.primary_button"
                >
                  Find Tutors
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
                    Verified &amp; Approved
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

      {/* Trending Subjects */}
      <section className="py-14 bg-accent/20" data-ocid="home.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-9 w-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">
                Trending Subjects
              </h2>
              <p className="text-muted-foreground text-sm">
                Most searched subjects this month
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {TRENDING_SUBJECTS.map(({ name, emoji, trend }, idx) => (
              <motion.div key={name} variants={item}>
                <Link to="/tutors">
                  <Card
                    className="card-hover cursor-pointer border hover:border-primary transition-all"
                    data-ocid={`home.item.${idx + 1}`}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="text-2xl">{emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {name}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">
                            {trend}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
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

      {/* Featured Tutors */}
      <section
        className="py-14 container mx-auto px-4"
        data-ocid="home.section"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Top Rated Tutors
            </h2>
            <p className="text-muted-foreground mt-1">
              Highly recommended by students &amp; parents across Tamil Nadu
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
              Join 500+ qualified tutors on EduConnect Tamil Nadu and grow your
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
