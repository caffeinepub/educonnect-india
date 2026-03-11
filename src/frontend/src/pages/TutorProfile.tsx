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
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  GraduationCap,
  Home as HomeIcon,
  Laptop,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  MOCK_REVIEWS,
  MOCK_TUTORS,
  getTuitionTypeLabel,
} from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function TutorProfile() {
  const { tutorId } = useParams({ from: "/tutors/$tutorId" });
  const tutor = MOCK_TUTORS.find((t) => t.id === tutorId);
  const { actor } = useActor();
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const reviews = MOCK_REVIEWS.filter((r) => r.tutorId === tutorId);

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
  const whatsappUrl = `https://wa.me/919363322326?text=${encodeURIComponent(`Hi ${tutor.name.split(" ")[0]}, I found your profile on EduConnect Tamil Nadu and I am interested in tuition.`)}`;

  const handleBookDemo = () => {
    toast.success(
      `Demo class request sent! ${tutor.name.split(" ")[0]} will contact you within 24 hours.`,
    );
  };

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
                    <div className="flex items-center gap-2">
                      <h1 className="font-display text-2xl font-bold">
                        {tutor.name}
                      </h1>
                      {tutor.isApproved && (
                        <Badge className="bg-green-50 text-green-700 border-green-200 gap-1">
                          <ShieldCheck className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <GraduationCap className="h-4 w-4" />
                      <span>{tutor.qualification}</span>
                    </div>
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

          {/* Reviews */}
          {reviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                  Student Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review, idx) => (
                  <div key={review.id}>
                    {idx > 0 && <Separator className="mb-4" />}
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-muted-foreground">
                          {review.studentName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {review.studentName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5 my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={`star-${review.id}-${i}`}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
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
              <div className="space-y-2 mt-4">
                <Button
                  className="w-full gradient-teal text-white border-0 hover:opacity-90"
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
                    <CreditCard className="h-4 w-4 mr-2" /> Book &amp; Pay
                  </Link>
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleBookDemo}
                  data-ocid="tutor_profile.secondary_button"
                >
                  <Calendar className="h-4 w-4 mr-2" /> Book Free Demo Class
                </Button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-9 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-medium transition-colors"
                  data-ocid="tutor_profile.secondary_button"
                >
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="WhatsApp"
                    className="h-4 w-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
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
