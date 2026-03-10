import { Link } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-teal text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-bold text-white">
                  EduConnect India
                </div>
                <div className="text-xs text-background/60">Tamil Nadu</div>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Connecting students across Tamil Nadu with qualified tutors for
              online and home tuition.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/tutors"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link
                  to="/register-tutor"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link
                  to="/register-student"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Student Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/post-requirement"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.link"
                >
                  Post Requirement
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Popular Subjects</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">
                Maths
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Science
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                English
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Computer Science
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>support@educonnectindia.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+91 98400 12345</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>No. 12, Anna Salai, Chennai – 600 002, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-background/50">
          <p>© {year} EduConnect India. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
