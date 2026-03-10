import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function Subjects() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">Subjects</h1>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        We cover all subjects from Class 1 to Class 12.
      </p>
      <Button asChild>
        <Link to="/tutors">Find Tutors by Subject</Link>
      </Button>
    </main>
  );
}
