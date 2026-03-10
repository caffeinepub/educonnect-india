import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  GraduationCap,
  Home as HomeIcon,
  Laptop,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { MOCK_TUTORS, getTuitionTypeLabel } from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function TutorProfile() {
  const { tutorId } = useParams({ from: "/tutors/$tutorId" });
  const tutor = MOCK_TUTORS.find((t) => t.id === tutorId);
  const { actor } = useActor();
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendMsgMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.sendMessage("student-me", tutorId, text);
    },
    onSuccess: () => {
      toast.success("Message sent!");
      setMessageSent(true);
      setMessage("");
    },
    onError: () => toast.error("Failed to send message"),
  });

  if (!tutor) {
    return (
      <div
        className="container mx-auto px-4 py-20 text-center"
        data-ocid="tutor_profile.error_state"
      >
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="font-display text-2xl font-bold mb-3">
          Tutor not found
        </h2>
        <Button asChild>
          <Link to="/tutors">Browse Tutors</Link>
        </Button>
      </div>
    );
  }

  const initials = tutor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const TuitionIcon =
    tutor.tuitionType === "online"
      ? Laptop
      : tutor.tuitionType === "offline"
        ? HomeIcon
        : GraduationCap;

  return (
    <main
      className="container mx-auto px-4 py-8 max-w-5xl"
      data-ocid="tutor_profile.page"
    >
      <Button variant="ghost" className="mb-6 gap-2" asChild>
        <Link to="/tutors" data-ocid="tutor_profile.secondary_button">
          <ArrowLeft className="h-4 w-4" /> Back to Tutors
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="overflow-hidden">
            <div className="h-24 gradient-teal" />
            <CardContent className="relative pt-0 pb-6 px-6">
              <Avatar className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg -mt-12">
                <AvatarFallback className="rounded-2xl gradient-teal text-white font-display font-bold text-3xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="mt-3">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h1 className="font-display text-2xl font-bold">
                      {tutor.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {tutor.city}, Tamil Nadu
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {tutor.experienceYears} years exp.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-lg">{tutor.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({tutor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge
                    className={`${tutor.gender === "female" ? "bg-pink-50 text-pink-700" : "bg-sky-50 text-sky-700"} border-0`}
                  >
                    {tutor.gender === "female" ? "👩 Female" : "👨 Male"} Tutor
                  </Badge>
                  <Badge className="bg-accent border-0 text-accent-foreground">
                    <TuitionIcon className="h-3 w-3 mr-1" />
                    {getTuitionTypeLabel(tutor.tuitionType)}
                  </Badge>
                  <Badge className="bg-amber-50 text-amber-700 border-0">
                    ₹{tutor.hourlyRate}/hr
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {tutor.bio}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutor.classes.map((c) => (
                    <Badge key={c} variant="outline">
                      Class {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <Card className="border-primary/20 bg-accent/30">
            <CardContent className="p-5">
              <div className="text-center mb-4">
                <div className="font-display text-3xl font-bold text-primary">
                  ₹{tutor.hourlyRate}
                </div>
                <div className="text-sm text-muted-foreground">per hour</div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Verified Tutor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{tutor.experienceYears} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{getTuitionTypeLabel(tutor.tuitionType)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-4 gradient-teal text-white border-0 hover:opacity-90"
                asChild
                data-ocid="tutor_profile.primary_button"
              >
                <Link
                  to="/payment"
                  search={{
                    tutorId: tutor.id,
                    tutorName: tutor.name,
                    amount: tutor.hourlyRate,
                  }}
                >
                  <CreditCard className="h-4 w-4 mr-2" /> Book & Pay
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messageSent ? (
                <div
                  className="text-center py-4"
                  data-ocid="tutor_profile.success_state"
                >
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Message sent!</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2"
                    onClick={() => setMessageSent(false)}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <>
                  <Textarea
                    placeholder={`Hi ${tutor.name.split(" ")[0]}, I am interested in tuition for...`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none"
                    rows={4}
                    data-ocid="tutor_profile.textarea"
                  />
                  <Button
                    className="w-full"
                    variant="outline"
                    disabled={!message.trim() || sendMsgMutation.isPending}
                    onClick={() => sendMsgMutation.mutate(message)}
                    data-ocid="tutor_profile.submit_button"
                  >
                    {sendMsgMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                  {sendMsgMutation.isError && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="tutor_profile.error_state"
                    >
                      Failed to send. Please try again.
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            asChild
            data-ocid="tutor_profile.secondary_button"
          >
            <Link to="/messaging">View All Messages</Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
