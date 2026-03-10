import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Gender, TuitionType } from "../backend";
import { CLASSES, SUBJECTS, TN_CITIES } from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function TutorRegistration() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    gender: "",
    tuitionType: "",
    city: "",
    experienceYears: "",
    bio: "",
    photoUrl: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected to backend");
      const id = `tutor-${Date.now()}`;
      const genderMap: Record<string, Gender> = {
        male: Gender.male,
        female: Gender.female,
        other: Gender.other,
      };
      const typeMap: Record<string, TuitionType> = {
        online: TuitionType.online,
        offline: TuitionType.offline,
        both: TuitionType.both,
      };
      await actor.registerTutor(
        id,
        form.name,
        genderMap[form.gender] || Gender.other,
        selectedSubjects,
        selectedClasses,
        typeMap[form.tuitionType] || TuitionType.online,
        form.city,
        BigInt(Number.parseInt(form.experienceYears) || 0),
        form.bio,
        form.photoUrl || null,
        false,
      );
    },
    onSuccess: () => {
      toast.success("Registration submitted! Awaiting admin approval.");
      setSubmitted(true);
    },
    onError: () => toast.error("Registration failed. Please try again."),
  });

  const toggleSubject = (s: string) =>
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  const toggleClass = (c: string) =>
    setSelectedClasses((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const isValid =
    form.name &&
    form.gender &&
    form.tuitionType &&
    form.city &&
    form.experienceYears &&
    form.bio &&
    selectedSubjects.length > 0 &&
    selectedClasses.length > 0;

  if (submitted) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-lg text-center"
        data-ocid="tutor_reg.success_state"
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
          Registration Submitted!
        </h2>
        <p className="text-muted-foreground">
          Thank you for registering. Our admin team will review your profile and
          approve it within 24 hours. You will be notified once approved.
        </p>
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-10 max-w-3xl"
      data-ocid="tutor_reg.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-teal flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">
              Register as Tutor
            </h1>
            <p className="text-muted-foreground">
              Join EduConnect India and start teaching students across Tamil
              Nadu
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              All fields are required. Your profile will be reviewed before
              approval.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Name & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Rajesh Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-ocid="tutor_reg.input"
                />
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => setForm({ ...form, gender: v })}
                >
                  <SelectTrigger data-ocid="tutor_reg.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* City & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City *</Label>
                <Select
                  value={form.city}
                  onValueChange={(v) => setForm({ ...form, city: v })}
                >
                  <SelectTrigger data-ocid="tutor_reg.select">
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
              <div className="space-y-2">
                <Label htmlFor="exp">Years of Experience *</Label>
                <Input
                  id="exp"
                  type="number"
                  min="0"
                  max="50"
                  placeholder="e.g. 5"
                  value={form.experienceYears}
                  onChange={(e) =>
                    setForm({ ...form, experienceYears: e.target.value })
                  }
                  data-ocid="tutor_reg.input"
                />
              </div>
            </div>

            {/* Tuition Type */}
            <div className="space-y-2">
              <Label>Tuition Type *</Label>
              <Select
                value={form.tuitionType}
                onValueChange={(v) => setForm({ ...form, tuitionType: v })}
              >
                <SelectTrigger data-ocid="tutor_reg.select">
                  <SelectValue placeholder="Select tuition type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online Tuition</SelectItem>
                  <SelectItem value="offline">Home Tuition</SelectItem>
                  <SelectItem value="both">Both Online & Home</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subjects */}
            <div className="space-y-3">
              <Label>
                Subjects You Teach *{" "}
                <span className="text-muted-foreground font-normal">
                  (select all that apply)
                </span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-4 rounded-xl bg-accent/30">
                {SUBJECTS.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <Checkbox
                      id={`subj-${s}`}
                      checked={selectedSubjects.includes(s)}
                      onCheckedChange={() => toggleSubject(s)}
                      data-ocid="tutor_reg.checkbox"
                    />
                    <Label
                      htmlFor={`subj-${s}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {s}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Classes */}
            <div className="space-y-3">
              <Label>
                Classes You Teach *{" "}
                <span className="text-muted-foreground font-normal">
                  (select all that apply)
                </span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {CLASSES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleClass(c)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                      selectedClasses.includes(c)
                        ? "gradient-teal text-white border-primary"
                        : "bg-white border-border hover:border-primary"
                    }`}
                    data-ocid="tutor_reg.toggle"
                  >
                    Class {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Short Bio *</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about your teaching experience, qualifications, and approach..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={5}
                data-ocid="tutor_reg.textarea"
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <Label htmlFor="photo">Profile Photo URL (optional)</Label>
              <Input
                id="photo"
                placeholder="https://..."
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                data-ocid="tutor_reg.input"
              />
            </div>

            <Button
              className="w-full h-12 gradient-teal text-white border-0 hover:opacity-90 text-base font-semibold"
              disabled={!isValid || mutation.isPending}
              onClick={() => mutation.mutate()}
              data-ocid="tutor_reg.submit_button"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
