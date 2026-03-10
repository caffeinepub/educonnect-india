import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, MapPin, Star } from "lucide-react";
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

  return (
    <Card
      className="card-hover shadow-card border-border overflow-hidden"
      data-ocid={`tutors.item.${index}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 shrink-0 rounded-2xl">
            <AvatarFallback className="rounded-2xl gradient-teal text-white font-display font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-foreground truncate">
                {tutor.name}
              </h3>
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

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div>
            <span className="font-display font-bold text-primary">
              ₹{tutor.hourlyRate}
            </span>
            <span className="text-xs text-muted-foreground">/hour</span>
          </div>
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
      </CardContent>
    </Card>
  );
}
