import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearch } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import TutorCard from "../components/TutorCard";
import { CLASSES, MOCK_TUTORS, SUBJECTS, TN_CITIES } from "../data/mockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function TutorListing() {
  const searchParams = useSearch({ from: "/tutors" }) as Record<string, string>;
  const [q, setQ] = useState(searchParams.q || "");
  const [city, setCity] = useState(searchParams.city || "");
  const [subject, setSubject] = useState(searchParams.subject || "");
  const [gender, setGender] = useState(searchParams.gender || "");
  const [tuitionType, setTuitionType] = useState(
    searchParams.tuitionType || "",
  );
  const [classFilter, setClassFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_TUTORS.filter((tutor) => {
      if (q) {
        const lq = q.toLowerCase();
        const matches =
          tutor.name.toLowerCase().includes(lq) ||
          tutor.city.toLowerCase().includes(lq) ||
          tutor.subjects.some((s) => s.toLowerCase().includes(lq));
        if (!matches) return false;
      }
      if (city && city !== "all" && tutor.city !== city) return false;
      if (subject && subject !== "all" && !tutor.subjects.includes(subject))
        return false;
      if (gender && gender !== "all" && tutor.gender !== gender) return false;
      if (tuitionType && tuitionType !== "all") {
        if (tuitionType === "online" && tutor.tuitionType === "offline")
          return false;
        if (tuitionType === "offline" && tutor.tuitionType === "online")
          return false;
      }
      if (
        classFilter &&
        classFilter !== "all" &&
        !tutor.classes.includes(classFilter)
      )
        return false;
      return true;
    });
  }, [q, city, subject, gender, tuitionType, classFilter]);

  const activeFilters = [
    city,
    subject,
    gender,
    tuitionType,
    classFilter,
  ].filter((v) => v !== "" && v !== "all").length;

  const clearFilters = () => {
    setQ("");
    setCity("");
    setSubject("");
    setGender("");
    setTuitionType("");
    setClassFilter("");
  };

  return (
    <main className="container mx-auto px-4 py-8" data-ocid="tutors.page">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold mb-1">
          Find Tutors in Tamil Nadu
        </h1>
        <p className="text-muted-foreground">
          {filtered.length} tutors available
        </p>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by name, subject or city..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              data-ocid="tutors.search_input"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
            data-ocid="tutors.toggle"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge className="h-5 w-5 p-0 flex items-center justify-center gradient-teal text-white border-0 text-[10px]">
                {activeFilters}
              </Badge>
            )}
          </Button>
          {activeFilters > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              data-ocid="tutors.secondary_button"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-accent/30 rounded-xl"
          >
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger data-ocid="tutors.select">
                <SelectValue placeholder="City" />
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
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger data-ocid="tutors.select">
                <SelectValue placeholder="Subject" />
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
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger data-ocid="tutors.select">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Gender</SelectItem>
                <SelectItem value="male">Male Tutors</SelectItem>
                <SelectItem value="female">Female Tutors</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tuitionType} onValueChange={setTuitionType}>
              <SelectTrigger data-ocid="tutors.select">
                <SelectValue placeholder="Tuition Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Home Tuition</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger data-ocid="tutors.select">
                <SelectValue placeholder="Class" />
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
          </motion.div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20" data-ocid="tutors.empty_state">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-display text-xl font-semibold mb-2">
            No tutors found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear Filters
          </Button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((tutor, idx) => (
            <motion.div key={tutor.id} variants={item}>
              <TutorCard tutor={tutor} index={idx + 1} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}
