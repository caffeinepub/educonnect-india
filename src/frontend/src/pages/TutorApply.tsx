import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Gender, TuitionType } from "../backend";
import { useActor } from "../hooks/useActor";

const SUBJECTS = [
  "Maths",
  "Science",
  "English",
  "Tamil",
  "Social Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "History",
];

const CLASSES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const TN_CITIES = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
];

export default function TutorApply() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<string>("male");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [tuitionType, setTuitionType] = useState<string>("online");
  const [city, setCity] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [bio, setBio] = useState("");
  const [fees, setFees] = useState("");

  function toggleSubject(subject: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject],
    );
  }

  function toggleClass(cls: string) {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone || !city || !qualification) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject.");
      return;
    }
    if (selectedClasses.length === 0) {
      toast.error("Please select at least one class.");
      return;
    }

    setIsSubmitting(true);
    try {
      const genderEnum = gender === "female" ? Gender.female : Gender.male;
      const tuitionEnum =
        tuitionType === "both"
          ? TuitionType.both
          : tuitionType === "offline"
            ? TuitionType.offline
            : TuitionType.online;

      if (!actor) throw new Error("Not connected");
      await (actor as any).submitTutorApplication(
        name,
        email,
        phone,
        genderEnum,
        selectedSubjects,
        selectedClasses,
        tuitionEnum,
        city,
        BigInt(Number(experience) || 0),
        qualification,
        bio,
        BigInt(Number(fees) || 0),
      );

      toast.success(
        "Application submitted successfully! Admin will review and contact you.",
      );
      navigate({ to: "/tutors" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4 shadow-lg">
            <GraduationCap className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Apply as a Tutor
          </h1>
          <p className="text-muted-foreground mt-2">
            Join EduConnect Tamil Nadu and help students achieve academic
            excellence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-primary">
                <User size={16} /> Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  data-ocid="apply.name.input"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  data-ocid="apply.email.input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-3 text-muted-foreground"
                  />
                  <Input
                    id="phone"
                    type="tel"
                    data-ocid="apply.phone.input"
                    className="pl-8"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Gender *</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger data-ocid="apply.gender.select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Teaching Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-primary">
                <BookOpen size={16} /> Teaching Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label className="mb-2 block">Subjects *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUBJECTS.map((subject) => (
                    <div
                      key={subject}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                      onClick={() => toggleSubject(subject)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && toggleSubject(subject)
                      }
                    >
                      <Checkbox
                        data-ocid="apply.subject.checkbox"
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => toggleSubject(subject)}
                      />
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Classes Taught *</Label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {CLASSES.map((cls) => (
                    <div
                      key={cls}
                      className="flex items-center gap-2 cursor-pointer text-sm"
                      onClick={() => toggleClass(cls)}
                      onKeyDown={(e) => e.key === "Enter" && toggleClass(cls)}
                    >
                      <Checkbox
                        data-ocid="apply.class.checkbox"
                        checked={selectedClasses.includes(cls)}
                        onCheckedChange={() => toggleClass(cls)}
                      />
                      <span>{cls}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Tuition Type *</Label>
                <RadioGroup
                  value={tuitionType}
                  onValueChange={setTuitionType}
                  className="flex gap-6"
                  data-ocid="apply.tuition-type.radio"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="online" id="type-online" />
                    <Label htmlFor="type-online" className="cursor-pointer">
                      Online
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="offline" id="type-home" />
                    <Label htmlFor="type-home" className="cursor-pointer">
                      Home
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="both" id="type-both" />
                    <Label htmlFor="type-both" className="cursor-pointer">
                      Both
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Location & Experience */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-primary">
                <MapPin size={16} /> Location & Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>City *</Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger data-ocid="apply.city.select">
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
              <div className="space-y-1.5">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  data-ocid="apply.experience.input"
                  min="0"
                  placeholder="e.g. 3"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Qualifications */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-primary">
                <Briefcase size={16} /> Qualification & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  data-ocid="apply.qualification.input"
                  placeholder="e.g. B.Ed, M.Sc Mathematics"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="fees">Monthly Fees (INR)</Label>
                <Input
                  id="fees"
                  type="number"
                  data-ocid="apply.fees.input"
                  min="0"
                  placeholder="e.g. 3000"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bio">Bio / About</Label>
                <Textarea
                  id="bio"
                  data-ocid="apply.bio.textarea"
                  rows={4}
                  placeholder="Tell students about your teaching style, achievements, and approach..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            data-ocid="apply.submit_button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
