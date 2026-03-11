import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-teal text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold text-white">
                  EduConnect
                </div>
                <div className="text-xs text-white/70">Tamil Nadu</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Connecting students across Tamil Nadu with qualified tutors for
              online and home tuition. Classes 1–12, all subjects.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/tutors"
                  className="text-white hover:text-white/80 transition-colors"
                  data-ocid="footer.link"
                >
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/register-tutor"
                  className="text-white hover:text-white/80 transition-colors"
                  data-ocid="footer.link"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  to="/register-student"
                  className="text-white hover:text-white/80 transition-colors"
                  data-ocid="footer.link"
                >
                  Student Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/post-requirement"
                  className="text-white hover:text-white/80 transition-colors"
                  data-ocid="footer.link"
                >
                  Post Requirement
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white hover:text-white/80 transition-colors"
                  data-ocid="footer.link"
                >
                  Study Tips Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Popular Subjects</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Maths",
                "Physics",
                "Chemistry",
                "Biology",
                "English",
                "Computer Science",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/tutors"
                    className="text-white hover:text-white/80 transition-colors"
                    data-ocid="footer.link"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                <a
                  href="mailto:niranjeevan24@gmail.com"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  niranjeevan24@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                <a
                  href="tel:+919363322326"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  +91 9363322326
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                <span className="text-white">
                  Coimbatore, Tamil Nadu, India
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white">
          <p>© {year} EduConnect Tamil Nadu. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
