import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function BookClass() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold mb-4">Book a Class</h1>
      <p className="text-muted-foreground max-w-xl mx-auto mb-8">
        Browse our tutors and book a class directly from their profile page.
      </p>
      <Button asChild>
        <Link to="/tutors">Browse Tutors</Link>
      </Button>
    </main>
  );
}
