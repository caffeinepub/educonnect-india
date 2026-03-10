import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function StudyMaterials() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">Study Materials</h1>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        Connect with a tutor to access personalized study materials and practice
        questions.
      </p>
      <Button asChild>
        <Link to="/tutors">Find a Tutor</Link>
      </Button>
    </main>
  );
}
