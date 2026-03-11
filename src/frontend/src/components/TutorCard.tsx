import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Clock,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { MockTutor } from "../data/mockData";
import { getTuitionTypeLabel } from "../data/mockData";

interface TutorCardProps {
  tutor: MockTutor;
  index?: number;
}

export default function TutorCard({ tutor, index = 1 }: TutorCardProps) {
  const initials = tutor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const tuitionColor =
    tutor.tuitionType === "online"
      ? "bg-blue-50 text-blue-700"
      : tutor.tuitionType === "offline"
        ? "bg-green-50 text-green-700"
        : "bg-purple-50 text-purple-700";
  const genderColor =
    tutor.gender === "female"
      ? "bg-pink-50 text-pink-700"
      : "bg-sky-50 text-sky-700";

  const whatsappUrl = `https://wa.me/919363322326?text=${encodeURIComponent(`Hi, I found ${tutor.name} on EduConnect Tamil Nadu and I am interested in tuition.`)}`;

  return (
    <Card
      className="card-hover shadow-card border-border overflow-hidden"
      data-ocid={`tutors.item.${index}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <Avatar className="h-16 w-16 rounded-2xl">
              <AvatarFallback className="rounded-2xl gradient-teal text-white font-display font-bold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            {tutor.isApproved && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-semibold text-foreground truncate">
                    {tutor.name}
                  </h3>
                  {tutor.isApproved && (
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <GraduationCap className="h-3 w-3" />
                  <span className="truncate">{tutor.qualification}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{tutor.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({tutor.reviewCount})
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${genderColor}`}
              >
                {tutor.gender === "female" ? "Female Tutor" : "Male Tutor"}
              </span>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tuitionColor}`}
              >
                {getTuitionTypeLabel(tutor.tuitionType)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{tutor.city}, Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span>{tutor.experienceYears} years experience</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.slice(0, 3).map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0"
                >
                  {s}
                </Badge>
              ))}
              {tutor.subjects.length > 3 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  +{tutor.subjects.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between gap-2">
          <div>
            <span className="font-display font-bold text-primary">
              ₹{tutor.hourlyRate}
            </span>
            <span className="text-xs text-muted-foreground">/hour</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#25D366] hover:bg-[#128C7E] transition-colors"
              title="Chat on WhatsApp"
              data-ocid={`tutors.secondary_button.${index}`}
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
            </a>
            <Button
              size="sm"
              asChild
              className="gradient-teal text-white border-0 hover:opacity-90"
              data-ocid={`tutors.primary_button.${index}`}
            >
              <Link to="/tutors/$tutorId" params={{ tutorId: tutor.id }}>
                View Profile
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
