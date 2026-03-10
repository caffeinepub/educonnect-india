import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function About() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">
        About EduConnect India
      </h1>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        EduConnect India connects students across Tamil Nadu with qualified
        tutors.
      </p>
      <Button asChild>
        <Link to="/tutors">Find Tutors</Link>
      </Button>
    </main>
  );
}
