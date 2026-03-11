import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Find Tutors", to: "/tutors" },
  { label: "Subjects", to: "/subjects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/educonnect-logo-transparent.dim_400x160.png"
            alt="EduConnect Tamil Nadu"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent transition-colors"
              activeProps={{
                className: "text-primary font-semibold bg-accent",
              }}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/register-tutor" data-ocid="nav.link">
              Register as Tutor
            </Link>
          </Button>
          {isLoggedIn ? (
            <Button size="sm" variant="ghost" onClick={clear}>
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              className="gradient-teal text-white border-0 hover:opacity-90"
              onClick={login}
              disabled={loginStatus === "logging-in"}
              data-ocid="nav.primary_button"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" data-ocid="nav.toggle">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-4 pt-4">
              <img
                src="/assets/generated/educonnect-logo-transparent.dim_400x160.png"
                alt="EduConnect Tamil Nadu"
                className="h-8 w-auto object-contain self-start"
              />
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button variant="outline" asChild>
                  <Link to="/register-tutor" onClick={() => setOpen(false)}>
                    Register as Tutor
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register-student" onClick={() => setOpen(false)}>
                    Register as Student
                  </Link>
                </Button>
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      clear();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="gradient-teal text-white border-0"
                    onClick={() => {
                      login();
                      setOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
