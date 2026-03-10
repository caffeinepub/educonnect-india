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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, ClipboardList, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Gender, TuitionType } from "../backend";
import { CLASSES, SUBJECTS, TN_CITIES } from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function PostRequirement() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    className: "",
    subject: "",
    city: "",
    tuitionType: "online",
    preferredGender: "noPreference",
    postedBy: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const typeMap: Record<string, TuitionType> = {
        online: TuitionType.online,
        offline: TuitionType.offline,
        both: TuitionType.both,
      };
      const genderMap: Record<string, Gender> = {
        male: Gender.male,
        female: Gender.female,
        noPreference: Gender.noPreference,
      };
      await actor.postRequirement(
        form.className,
        form.subject,
        form.city,
        typeMap[form.tuitionType] || TuitionType.online,
        genderMap[form.preferredGender] || Gender.noPreference,
        form.postedBy || "anonymous",
      );
    },
    onSuccess: () => {
      toast.success("Requirement posted!");
      setSubmitted(true);
    },
    onError: () => toast.error("Failed to post. Please try again."),
  });

  const isValid = form.className && form.subject && form.city;

  if (submitted) {
    return (
      <div
        className="container mx-auto px-4 py-20 max-w-lg text-center"
        data-ocid="post_req.success_state"
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
          Requirement Posted!
        </h2>
        <p className="text-muted-foreground">
          Your tuition requirement has been posted. Tutors matching your
          criteria will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <main
      className="container mx-auto px-4 py-10 max-w-xl"
      data-ocid="post_req.page"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-teal flex items-center justify-center">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">
              Post a Requirement
            </h1>
            <p className="text-muted-foreground">
              Tell us what you need and we'll connect you with the right tutor
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tuition Details</CardTitle>
            <CardDescription>
              Fill in your requirement so tutors can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="posted_by">Your Name</Label>
              <Input
                id="posted_by"
                placeholder="Your name or contact info"
                value={form.postedBy}
                onChange={(e) => setForm({ ...form, postedBy: e.target.value })}
                data-ocid="post_req.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Class *</Label>
                <Select
                  value={form.className}
                  onValueChange={(v) => setForm({ ...form, className: v })}
                >
                  <SelectTrigger data-ocid="post_req.select">
                    <SelectValue placeholder="Class" />
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
                <Label>Subject *</Label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => setForm({ ...form, subject: v })}
                >
                  <SelectTrigger data-ocid="post_req.select">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>City *</Label>
              <Select
                value={form.city}
                onValueChange={(v) => setForm({ ...form, city: v })}
              >
                <SelectTrigger data-ocid="post_req.select">
                  <SelectValue placeholder="Select your city" />
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

            <div className="space-y-3">
              <Label>Tuition Type</Label>
              <RadioGroup
                value={form.tuitionType}
                onValueChange={(v) => setForm({ ...form, tuitionType: v })}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="online"
                    id="tt-online"
                    data-ocid="post_req.radio"
                  />
                  <Label
                    htmlFor="tt-online"
                    className="font-normal cursor-pointer"
                  >
                    💻 Online
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="offline"
                    id="tt-offline"
                    data-ocid="post_req.radio"
                  />
                  <Label
                    htmlFor="tt-offline"
                    className="font-normal cursor-pointer"
                  >
                    🏠 Home Tuition
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="both"
                    id="tt-both"
                    data-ocid="post_req.radio"
                  />
                  <Label
                    htmlFor="tt-both"
                    className="font-normal cursor-pointer"
                  >
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Preferred Tutor Gender</Label>
              <RadioGroup
                value={form.preferredGender}
                onValueChange={(v) => setForm({ ...form, preferredGender: v })}
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="noPreference"
                    id="g-any"
                    data-ocid="post_req.radio"
                  />
                  <Label htmlFor="g-any" className="font-normal cursor-pointer">
                    No Preference
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="male"
                    id="g-male"
                    data-ocid="post_req.radio"
                  />
                  <Label
                    htmlFor="g-male"
                    className="font-normal cursor-pointer"
                  >
                    👨 Male
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="female"
                    id="g-female"
                    data-ocid="post_req.radio"
                  />
                  <Label
                    htmlFor="g-female"
                    className="font-normal cursor-pointer"
                  >
                    👩 Female
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              className="w-full h-12 gradient-teal text-white border-0 hover:opacity-90 text-base font-semibold"
              disabled={!isValid || mutation.isPending}
              onClick={() => mutation.mutate()}
              data-ocid="post_req.submit_button"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Posting...
                </>
              ) : (
                "Post Requirement"
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
