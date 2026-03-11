import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Edit2,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquare,
  Monitor,
  Phone,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface TutorApplication {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  gender: string;
  subjects: string[];
  classes: string[];
  tuitionType: string;
  city: string;
  experienceYears: bigint;
  qualification: string;
  bio: string;
  monthlyFees: bigint;
  status: string;
  submittedAt: bigint;
}
import { useActor } from "../hooks/useActor";

// Runtime ApplicationStatus values (match backend enum)
const ApplicationStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
} as const;
// ─── Types ────────────────────────────────────────────────────────────────────
type Section =
  | "dashboard"
  | "tutors"
  | "students"
  | "home-requests"
  | "online-bookings"
  | "messages"
  | "applications"
  | "settings";

type TutorStatus = "Verified" | "Pending" | "Rejected";
type BookingStatus = "Pending" | "Accepted" | "Completed";

interface Tutor {
  id: number;
  name: string;
  subject: string;
  gender: "Male" | "Female";
  city: string;
  type: "Online" | "Home" | "Both";
  status: TutorStatus;
  experience: string;
  qualification: string;
}

interface Student {
  id: number;
  name: string;
  class: string;
  subjects: string;
  city: string;
  phone: string;
  email: string;
}

interface HomeTuitionRequest {
  id: number;
  studentName: string;
  class: string;
  subjects: string;
  city: string;
  preferredGender: "Male" | "Female" | "Any";
  status: BookingStatus;
}

interface OnlineBooking {
  id: number;
  studentName: string;
  tutorName: string;
  subject: string;
  class: string;
  date: string;
  time: string;
  status: BookingStatus;
}

interface Message {
  id: number;
  sender: string;
  role: "Student" | "Tutor";
  preview: string;
  full: string;
  time: string;
  unread: boolean;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────
const initialTutors: Tutor[] = [
  {
    id: 1,
    name: "Arun Kumar",
    subject: "Mathematics",
    gender: "Male",
    city: "Chennai",
    type: "Online",
    status: "Verified",
    experience: "5 years",
    qualification: "M.Sc Mathematics",
  },
  {
    id: 2,
    name: "Priya Devi",
    subject: "Science",
    gender: "Female",
    city: "Coimbatore",
    type: "Home",
    status: "Verified",
    experience: "3 years",
    qualification: "B.Sc Physics",
  },
  {
    id: 3,
    name: "Rajan Selvam",
    subject: "Physics",
    gender: "Male",
    city: "Madurai",
    type: "Both",
    status: "Pending",
    experience: "7 years",
    qualification: "M.Sc Physics",
  },
  {
    id: 4,
    name: "Kavitha Raj",
    subject: "Chemistry",
    gender: "Female",
    city: "Trichy",
    type: "Online",
    status: "Pending",
    experience: "4 years",
    qualification: "M.Sc Chemistry",
  },
  {
    id: 5,
    name: "Suresh Babu",
    subject: "English",
    gender: "Male",
    city: "Salem",
    type: "Home",
    status: "Verified",
    experience: "6 years",
    qualification: "M.A English",
  },
  {
    id: 6,
    name: "Meena Kumari",
    subject: "Tamil",
    gender: "Female",
    city: "Chennai",
    type: "Both",
    status: "Verified",
    experience: "8 years",
    qualification: "M.A Tamil",
  },
  {
    id: 7,
    name: "Vijay Anand",
    subject: "Computer Science",
    gender: "Male",
    city: "Coimbatore",
    type: "Online",
    status: "Pending",
    experience: "2 years",
    qualification: "B.E Computer Science",
  },
  {
    id: 8,
    name: "Lakshmi Priya",
    subject: "Biology",
    gender: "Female",
    city: "Madurai",
    type: "Home",
    status: "Verified",
    experience: "5 years",
    qualification: "M.Sc Biology",
  },
  {
    id: 9,
    name: "Ganesh Ram",
    subject: "Social Science",
    gender: "Male",
    city: "Trichy",
    type: "Online",
    status: "Pending",
    experience: "3 years",
    qualification: "M.A History",
  },
  {
    id: 10,
    name: "Anu Bharathi",
    subject: "Mathematics",
    gender: "Female",
    city: "Salem",
    type: "Both",
    status: "Verified",
    experience: "6 years",
    qualification: "M.Sc Mathematics",
  },
];

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    class: "10",
    subjects: "Maths, Science",
    city: "Chennai",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
  },
  {
    id: 2,
    name: "Divya Krishnan",
    class: "12",
    subjects: "Physics, Chemistry",
    city: "Coimbatore",
    phone: "+91 9876543211",
    email: "divya@gmail.com",
  },
  {
    id: 3,
    name: "Arjun Ravi",
    class: "8",
    subjects: "Maths, Tamil",
    city: "Madurai",
    phone: "+91 9876543212",
    email: "arjun@gmail.com",
  },
  {
    id: 4,
    name: "Sneha Raj",
    class: "11",
    subjects: "Biology, Chemistry",
    city: "Trichy",
    phone: "+91 9876543213",
    email: "sneha@gmail.com",
  },
  {
    id: 5,
    name: "Karthik Prabhu",
    class: "9",
    subjects: "Science, English",
    city: "Salem",
    phone: "+91 9876543214",
    email: "karthik@gmail.com",
  },
  {
    id: 6,
    name: "Preethi Nair",
    class: "7",
    subjects: "Maths, Tamil",
    city: "Chennai",
    phone: "+91 9876543215",
    email: "preethi@gmail.com",
  },
  {
    id: 7,
    name: "Manoj Selvan",
    class: "6",
    subjects: "English, Social",
    city: "Coimbatore",
    phone: "+91 9876543216",
    email: "manoj@gmail.com",
  },
  {
    id: 8,
    name: "Ananya Devi",
    class: "12",
    subjects: "Maths, Computer",
    city: "Madurai",
    phone: "+91 9876543217",
    email: "ananya@gmail.com",
  },
  {
    id: 9,
    name: "Surya Kumar",
    class: "5",
    subjects: "Maths, Tamil",
    city: "Trichy",
    phone: "+91 9876543218",
    email: "surya@gmail.com",
  },
  {
    id: 10,
    name: "Meghna Iyer",
    class: "11",
    subjects: "Physics, Maths",
    city: "Salem",
    phone: "+91 9876543219",
    email: "meghna@gmail.com",
  },
  {
    id: 11,
    name: "Deepak Raj",
    class: "3",
    subjects: "Tamil, English",
    city: "Chennai",
    phone: "+91 9876543220",
    email: "deepak@gmail.com",
  },
  {
    id: 12,
    name: "Pooja Lakshmi",
    class: "9",
    subjects: "Science, Maths",
    city: "Coimbatore",
    phone: "+91 9876543221",
    email: "pooja@gmail.com",
  },
];

const initialHomeRequests: HomeTuitionRequest[] = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    class: "10",
    subjects: "Maths, Science",
    city: "Chennai",
    preferredGender: "Male",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Divya Krishnan",
    class: "12",
    subjects: "Physics, Chemistry",
    city: "Coimbatore",
    preferredGender: "Female",
    status: "Accepted",
  },
  {
    id: 3,
    studentName: "Arjun Ravi",
    class: "8",
    subjects: "Tamil, Maths",
    city: "Madurai",
    preferredGender: "Any",
    status: "Pending",
  },
  {
    id: 4,
    studentName: "Sneha Raj",
    class: "11",
    subjects: "Biology",
    city: "Trichy",
    preferredGender: "Female",
    status: "Completed",
  },
  {
    id: 5,
    studentName: "Karthik Prabhu",
    class: "9",
    subjects: "Science",
    city: "Salem",
    preferredGender: "Male",
    status: "Pending",
  },
  {
    id: 6,
    studentName: "Preethi Nair",
    class: "7",
    subjects: "Maths",
    city: "Chennai",
    preferredGender: "Female",
    status: "Accepted",
  },
  {
    id: 7,
    studentName: "Manoj Selvan",
    class: "6",
    subjects: "English",
    city: "Coimbatore",
    preferredGender: "Any",
    status: "Pending",
  },
  {
    id: 8,
    studentName: "Ananya Devi",
    class: "12",
    subjects: "Computer Science",
    city: "Madurai",
    preferredGender: "Male",
    status: "Completed",
  },
];

const initialOnlineBookings: OnlineBooking[] = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    tutorName: "Arun Kumar",
    subject: "Mathematics",
    class: "10",
    date: "2026-03-15",
    time: "4:00 PM",
    status: "Accepted",
  },
  {
    id: 2,
    studentName: "Divya Krishnan",
    tutorName: "Priya Devi",
    subject: "Science",
    class: "12",
    date: "2026-03-16",
    time: "5:00 PM",
    status: "Pending",
  },
  {
    id: 3,
    studentName: "Arjun Ravi",
    tutorName: "Suresh Babu",
    subject: "English",
    class: "8",
    date: "2026-03-17",
    time: "3:30 PM",
    status: "Completed",
  },
  {
    id: 4,
    studentName: "Sneha Raj",
    tutorName: "Lakshmi Priya",
    subject: "Biology",
    class: "11",
    date: "2026-03-18",
    time: "6:00 PM",
    status: "Pending",
  },
  {
    id: 5,
    studentName: "Karthik Prabhu",
    tutorName: "Meena Kumari",
    subject: "Tamil",
    class: "9",
    date: "2026-03-19",
    time: "4:30 PM",
    status: "Accepted",
  },
  {
    id: 6,
    studentName: "Preethi Nair",
    tutorName: "Anu Bharathi",
    subject: "Mathematics",
    class: "7",
    date: "2026-03-20",
    time: "5:30 PM",
    status: "Pending",
  },
  {
    id: 7,
    studentName: "Manoj Selvan",
    tutorName: "Vijay Anand",
    subject: "Computer Science",
    class: "6",
    date: "2026-03-21",
    time: "3:00 PM",
    status: "Completed",
  },
  {
    id: 8,
    studentName: "Ananya Devi",
    tutorName: "Arun Kumar",
    subject: "Mathematics",
    class: "12",
    date: "2026-03-22",
    time: "4:00 PM",
    status: "Accepted",
  },
  {
    id: 9,
    studentName: "Surya Kumar",
    tutorName: "Priya Devi",
    subject: "Science",
    class: "5",
    date: "2026-03-23",
    time: "5:00 PM",
    status: "Pending",
  },
  {
    id: 10,
    studentName: "Meghna Iyer",
    tutorName: "Rajan Selvam",
    subject: "Physics",
    class: "11",
    date: "2026-03-24",
    time: "6:30 PM",
    status: "Completed",
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Rahul Sharma",
    role: "Student",
    preview: "I need help with my Maths assignment...",
    full: "I need help with my Maths assignment. Can you recommend a good tutor for Class 10 in Chennai? I specifically need help with Algebra and Geometry.",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Arun Kumar",
    role: "Tutor",
    preview: "My availability has changed for next week...",
    full: "My availability has changed for next week. I'll be available only on Monday, Wednesday and Friday from 4 PM to 7 PM. Please update my profile accordingly.",
    time: "9:15 AM",
    unread: true,
  },
  {
    id: 3,
    sender: "Divya Krishnan",
    role: "Student",
    preview: "Can I reschedule my session?",
    full: "Can I reschedule my session with Priya Devi from March 16 to March 18? I have an exam on the 16th and cannot attend the online class.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    sender: "Priya Devi",
    role: "Tutor",
    preview: "Payment not received for last session",
    full: "I have not received payment for the last two sessions with student Divya Krishnan. Could you please check and process the payment at the earliest?",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 5,
    sender: "Karthik Prabhu",
    role: "Student",
    preview: "Looking for a Tamil tutor in Salem",
    full: "I am looking for a Tamil language tutor in Salem for Class 9. My preferred timing is evenings after 5 PM. Could you help find a suitable match?",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    sender: "Meena Kumari",
    role: "Tutor",
    preview: "Updated certificate uploaded",
    full: "I have uploaded my updated teaching certificate and B.Ed qualification document. Please review and update my verification status on the platform.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 7,
    sender: "Sneha Raj",
    role: "Student",
    preview: "Excellent experience with my tutor!",
    full: "Excellent experience with my tutor Lakshmi Priya! She is very patient and explains Biology concepts very clearly. I highly recommend her for Class 11 students.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 8,
    sender: "Vijay Anand",
    role: "Tutor",
    preview: "Request to change tuition type",
    full: "I would like to change my tuition type from Online only to Both Online and Home. I am now available for home tuitions in Coimbatore area. Please update my profile.",
    time: "3 days ago",
    unread: false,
  },
];

// ─── Status Badge Helper ──────────────────────────────────────────────────────
function StatusBadge({ status }: { status: BookingStatus }) {
  const variants: Record<BookingStatus, string> = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Completed: "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`}
    >
      {status}
    </span>
  );
}

function TutorStatusBadge({ status }: { status: TutorStatus }) {
  const variants: Record<TutorStatus, string> = {
    Verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const { actor } = useActor();
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [homeRequests, setHomeRequests] =
    useState<HomeTuitionRequest[]>(initialHomeRequests);
  const [onlineBookings, setOnlineBookings] = useState<OnlineBooking[]>(
    initialOnlineBookings,
  );
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  // Filters
  const [tutorSearch, setTutorSearch] = useState("");
  const [tutorGenderFilter, setTutorGenderFilter] = useState("all");
  const [tutorCityFilter, setTutorCityFilter] = useState("all");
  const [tutorTypeFilter, setTutorTypeFilter] = useState("all");
  const [studentSearch, setStudentSearch] = useState("");
  const [studentClassFilter, setStudentClassFilter] = useState("all");
  const [studentSubjectFilter, setStudentSubjectFilter] = useState("all");
  const [homeStatusFilter, setHomeStatusFilter] = useState("all");
  const [onlineStatusFilter, setOnlineStatusFilter] = useState("all");

  // Edit tutor dialog
  const [editTutor, setEditTutor] = useState<Tutor | null>(null);

  // Settings password
  const [showCurrPwd, setShowCurrPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  // Applications (real backend data)
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appSearch, setAppSearch] = useState("");

  async function fetchApplications() {
    setAppsLoading(true);
    try {
      if (!actor) return;
      const data = await (actor as any).getTutorApplications();
      setApplications(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAppsLoading(false);
    }
  }

  async function handleApproveApp(id: bigint) {
    try {
      if (!actor) return;
      await (actor as any).updateApplicationStatus(
        id,
        ApplicationStatus.approved as any,
      );
      toast.success("Application approved!");
      fetchApplications();
    } catch {
      toast.error("Failed to update status.");
    }
  }

  async function handleRejectApp(id: bigint) {
    try {
      if (!actor) return;
      await (actor as any).updateApplicationStatus(
        id,
        ApplicationStatus.rejected as any,
      );
      toast.success("Application rejected.");
      fetchApplications();
    } catch {
      toast.error("Failed to update status.");
    }
  }

  // Auth guard
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") !== "true") {
      navigate({ to: "/admin-login" });
    } else {
      fetchApplications();
    }
  }, [navigate]);

  // Refetch when switching to applications section
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (activeSection === "applications") {
      fetchApplications();
    }
  }, [activeSection]);

  function handleLogout() {
    sessionStorage.removeItem("adminAuth");
    navigate({ to: "/admin-login" });
  }

  // ── Filtered data ────────────────────────────────────────────────────────────
  const filteredTutors = tutors.filter((t) => {
    const matchSearch =
      tutorSearch === "" ||
      t.name.toLowerCase().includes(tutorSearch.toLowerCase()) ||
      t.subject.toLowerCase().includes(tutorSearch.toLowerCase());
    const matchGender =
      tutorGenderFilter === "all" || t.gender === tutorGenderFilter;
    const matchCity = tutorCityFilter === "all" || t.city === tutorCityFilter;
    const matchType =
      tutorTypeFilter === "all" ||
      t.type === tutorTypeFilter ||
      t.type === "Both";
    return matchSearch && matchGender && matchCity && matchType;
  });

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      studentSearch === "" ||
      s.name.toLowerCase().includes(studentSearch.toLowerCase());
    const matchClass =
      studentClassFilter === "all" || s.class === studentClassFilter;
    const matchSubject =
      studentSubjectFilter === "all" ||
      s.subjects.toLowerCase().includes(studentSubjectFilter.toLowerCase());
    return matchSearch && matchClass && matchSubject;
  });

  const filteredHomeRequests = homeRequests.filter(
    (r) => homeStatusFilter === "all" || r.status === homeStatusFilter,
  );

  const filteredOnlineBookings = onlineBookings.filter(
    (b) => onlineStatusFilter === "all" || b.status === onlineStatusFilter,
  );

  // ── Actions ──────────────────────────────────────────────────────────────────
  function approveTutor(id: number) {
    setTutors((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Verified" } : t)),
    );
    toast.success("Tutor approved and verified successfully!");
  }

  function rejectTutor(id: number) {
    setTutors((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tutor registration rejected and removed.");
  }

  function deleteTutor(id: number) {
    setTutors((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tutor removed from the platform.");
  }

  function deleteStudent(id: number) {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    toast.success("Student record deleted.");
  }

  function updateHomeRequest(id: number, status: BookingStatus) {
    setHomeRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    toast.success(`Request marked as ${status}.`);
  }

  function deleteHomeRequest(id: number) {
    setHomeRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success("Request deleted.");
  }

  function updateBookingStatus(id: number, status: BookingStatus) {
    setOnlineBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
    toast.success(`Booking marked as ${status}.`);
  }

  function deleteBooking(id: number) {
    setOnlineBookings((prev) => prev.filter((b) => b.id !== id));
    toast.success("Booking deleted.");
  }

  function toggleMessage(id: number) {
    setExpandedMessage((prev) => (prev === id ? null : id));
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m)),
    );
  }

  function saveEditTutor() {
    if (!editTutor) return;
    setTutors((prev) =>
      prev.map((t) => (t.id === editTutor.id ? editTutor : t)),
    );
    setEditTutor(null);
    toast.success("Tutor details updated successfully!");
  }

  // ── Nav items ─────────────────────────────────────────────────────────────────
  const navItems: {
    id: Section;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      id: "tutors",
      label: "Tutors",
      icon: <Users size={18} />,
      badge: tutors.filter((t) => t.status === "Pending").length,
    },
    { id: "students", label: "Students", icon: <GraduationCap size={18} /> },
    {
      id: "home-requests",
      label: "Home Tuition Requests",
      icon: <Home size={18} />,
      badge: homeRequests.filter((r) => r.status === "Pending").length,
    },
    {
      id: "online-bookings",
      label: "Online Tuition Bookings",
      icon: <Monitor size={18} />,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare size={18} />,
      badge: messages.filter((m) => m.unread).length,
    },
    {
      id: "applications",
      label: "Applications",
      icon: <FileText size={18} />,
      badge:
        applications.filter((a) => a.status === ApplicationStatus.pending)
          .length || undefined,
    },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  const sectionTitle: Record<Section, string> = {
    dashboard: "Dashboard Overview",
    tutors: "Tutors Management",
    students: "Students Management",
    "home-requests": "Home Tuition Requests",
    "online-bookings": "Online Tuition Bookings",
    messages: "Messages & Inbox",
    applications: "Tutor Applications",
    settings: "Settings",
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#f0f2f5" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col w-64 flex-shrink-0 h-screen"
        style={{
          background:
            "linear-gradient(180deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #f5a623, #e8891a)" }}
          >
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-display font-bold text-sm leading-tight">
              EduConnect
            </p>
            <p
              className="text-xs leading-tight"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Tamil Nadu
            </p>
          </div>
        </div>

        {/* Admin info */}
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #f5a623, #e8891a)",
              }}
            >
              A
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Admin</p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Super Admin
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`sidebar.${item.id}.link`}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-all duration-150 relative group ${
                activeSection === item.id
                  ? "text-white font-semibold"
                  : "font-medium hover:text-white"
              }`}
              style={{
                color:
                  activeSection === item.id
                    ? "#ffffff"
                    : "rgba(255,255,255,0.55)",
                background:
                  activeSection === item.id
                    ? "linear-gradient(90deg, rgba(245,166,35,0.18) 0%, rgba(245,166,35,0.06) 100%)"
                    : "transparent",
                borderLeft:
                  activeSection === item.id
                    ? "3px solid #f5a623"
                    : "3px solid transparent",
              }}
            >
              <span
                style={{
                  color: activeSection === item.id ? "#f5a623" : "inherit",
                }}
              >
                {item.icon}
              </span>
              <span className="flex-1 leading-tight">{item.label}</span>
              {item.badge ? (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: "#f5a623",
                    color: "#1a1a2e",
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <button
            type="button"
            data-ocid="sidebar.logout.button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-red-500/15"
            style={{ color: "rgba(255,100,100,0.85)" }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div>
            <h1 className="font-display font-bold text-gray-800 text-lg">
              {sectionTitle[activeSection]}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              EduConnect Tamil Nadu · Admin Panel
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell size={18} className="text-gray-500" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "#f5a623" }}
              />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* ────── DASHBOARD ────── */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Tutors",
                    value: 48,
                    icon: <Users size={22} />,
                    color: "#3b82f6",
                    bg: "#eff6ff",
                    border: "#3b82f6",
                  },
                  {
                    label: "Total Students",
                    value: 124,
                    icon: <GraduationCap size={22} />,
                    color: "#10b981",
                    bg: "#ecfdf5",
                    border: "#10b981",
                  },
                  {
                    label: "Total Bookings",
                    value: 87,
                    icon: <BookOpen size={22} />,
                    color: "#f5a623",
                    bg: "#fffbeb",
                    border: "#f5a623",
                  },
                  {
                    label: "Pending Approvals",
                    value: applications.filter(
                      (a) => a.status === ApplicationStatus.pending,
                    ).length,
                    icon: <Clock size={22} />,
                    color: "#ef4444",
                    bg: "#fef2f2",
                    border: "#ef4444",
                  },
                ].map((card, _i) => (
                  <div
                    key={card.label}
                    data-ocid={`dashboard.${card.label.toLowerCase().replace(/ /g, "-")}.card`}
                    className="bg-white rounded-xl p-5 shadow-sm"
                    style={{ borderLeft: `4px solid ${card.border}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          {card.label}
                        </p>
                        <p
                          className="text-3xl font-display font-bold mt-1"
                          style={{ color: card.color }}
                        >
                          {card.value}
                        </p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: card.bg, color: card.color }}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <TrendingUp size={13} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-medium">
                        +12% this month
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Tutor Registrations */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-display font-semibold text-gray-800">
                    Recent Tutor Registrations
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Last 5 registrations awaiting review
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        #
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Tutor
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Subject
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        City
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tutors
                      .filter((t) => t.status === "Pending")
                      .slice(0, 5)
                      .map((t, idx) => (
                        <TableRow
                          key={t.id}
                          data-ocid={`dashboard.recent.row.${idx + 1}`}
                          className="hover:bg-gray-50"
                        >
                          <TableCell className="text-gray-400 text-sm">
                            {idx + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                style={{
                                  background:
                                    t.gender === "Male" ? "#3b82f6" : "#ec4899",
                                }}
                              >
                                {t.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">
                                  {t.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {t.qualification}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {t.subject}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {t.city}
                          </TableCell>
                          <TableCell>
                            <TutorStatusBadge status={t.status} />
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                data-ocid={`dashboard.recent.approve.${idx + 1}`}
                                onClick={() => approveTutor(t.id)}
                                className="h-7 px-3 text-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                              >
                                <Check size={12} className="mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                data-ocid={`dashboard.recent.reject.${idx + 1}`}
                                onClick={() => rejectTutor(t.id)}
                                className="h-7 px-3 text-xs"
                              >
                                <X size={12} className="mr-1" /> Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {tutors.filter((t) => t.status === "Pending").length ===
                      0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-400"
                        >
                          No pending tutor approvals
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ────── TUTORS ────── */}
          {activeSection === "tutors" && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap gap-3">
                  <div className="relative flex-1 min-w-52">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      data-ocid="tutors.search_input"
                      placeholder="Search by name or subject..."
                      className="pl-9 h-9 text-sm"
                      value={tutorSearch}
                      onChange={(e) => setTutorSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={tutorGenderFilter}
                    onValueChange={setTutorGenderFilter}
                  >
                    <SelectTrigger
                      data-ocid="tutors.gender.select"
                      className="w-32 h-9 text-sm"
                    >
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Gender</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={tutorCityFilter}
                    onValueChange={setTutorCityFilter}
                  >
                    <SelectTrigger
                      data-ocid="tutors.city.select"
                      className="w-36 h-9 text-sm"
                    >
                      <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {[
                        "Chennai",
                        "Coimbatore",
                        "Madurai",
                        "Trichy",
                        "Salem",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={tutorTypeFilter}
                    onValueChange={setTutorTypeFilter}
                  >
                    <SelectTrigger
                      data-ocid="tutors.type.select"
                      className="w-32 h-9 text-sm"
                    >
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    {filteredTutors.length} tutors found
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Name
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Subject
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Gender
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Location
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Type
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTutors.map((t, idx) => (
                      <TableRow
                        key={t.id}
                        data-ocid={`tutors.item.${idx + 1}`}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{
                                background:
                                  t.gender === "Male" ? "#3b82f6" : "#ec4899",
                              }}
                            >
                              {t.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">
                                {t.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                {t.experience}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {t.subject}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              t.gender === "Male"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-pink-50 text-pink-600"
                            }`}
                          >
                            {t.gender}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {t.city}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium">
                            {t.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <TutorStatusBadge status={t.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {t.status === "Pending" ? (
                              <>
                                <Button
                                  size="sm"
                                  data-ocid={`tutors.approve.${idx + 1}`}
                                  onClick={() => approveTutor(t.id)}
                                  className="h-7 px-2.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                  <Check size={12} className="mr-1" /> Approve
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      data-ocid={`tutors.reject.${idx + 1}`}
                                      className="h-7 px-2.5 text-xs"
                                    >
                                      <X size={12} className="mr-1" /> Reject
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Reject Tutor?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to reject {t.name}
                                        's registration? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel data-ocid="tutors.reject.cancel">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        data-ocid="tutors.reject.confirm"
                                        onClick={() => rejectTutor(t.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Reject
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  data-ocid={`tutors.edit.${idx + 1}`}
                                  onClick={() => setEditTutor(t)}
                                  className="h-7 px-2.5 text-xs"
                                >
                                  <Edit2 size={12} className="mr-1" /> Edit
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      data-ocid={`tutors.delete.${idx + 1}`}
                                      className="h-7 px-2.5 text-xs"
                                    >
                                      <Trash2 size={12} />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete Tutor?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Permanently remove {t.name} from the
                                        platform?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel data-ocid="tutors.delete.cancel">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        data-ocid="tutors.delete.confirm"
                                        onClick={() => deleteTutor(t.id)}
                                        className="bg-red-500 hover:bg-red-600"
                                      >
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTutors.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-10"
                          data-ocid="tutors.empty_state"
                        >
                          <p className="text-gray-400">
                            No tutors match your search criteria
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ────── STUDENTS ────── */}
          {activeSection === "students" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap gap-3">
                  <div className="relative flex-1 min-w-52">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      data-ocid="students.search_input"
                      placeholder="Search by student name..."
                      className="pl-9 h-9 text-sm"
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={studentClassFilter}
                    onValueChange={setStudentClassFilter}
                  >
                    <SelectTrigger
                      data-ocid="students.class.select"
                      className="w-28 h-9 text-sm"
                    >
                      <SelectValue placeholder="Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={String(i + 1)} value={String(i + 1)}>
                          Class {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={studentSubjectFilter}
                    onValueChange={setStudentSubjectFilter}
                  >
                    <SelectTrigger
                      data-ocid="students.subject.select"
                      className="w-36 h-9 text-sm"
                    >
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {[
                        "Maths",
                        "Science",
                        "Physics",
                        "Chemistry",
                        "Biology",
                        "English",
                        "Tamil",
                        "Social",
                        "Computer",
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">
                    {filteredStudents.length} students found
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Name
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Class
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Subjects
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        City
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Phone
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Email
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((s, idx) => (
                      <TableRow
                        key={s.id}
                        data-ocid={`students.item.${idx + 1}`}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                              style={{
                                background:
                                  "linear-gradient(135deg, #1a1a2e, #0f3460)",
                              }}
                            >
                              {s.name.charAt(0)}
                            </div>
                            <p className="font-medium text-gray-800 text-sm">
                              {s.name}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                            Class {s.class}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-32">
                          {s.subjects}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {s.city}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {s.phone}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {s.email}
                        </TableCell>
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                data-ocid={`students.delete.${idx + 1}`}
                                className="h-7 px-2.5 text-xs"
                              >
                                <Trash2 size={12} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Student?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Permanently remove {s.name} from the platform?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="students.delete.cancel">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  data-ocid="students.delete.confirm"
                                  onClick={() => deleteStudent(s.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStudents.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-10"
                          data-ocid="students.empty_state"
                        >
                          <p className="text-gray-400">
                            No students match your search criteria
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ────── HOME TUITION REQUESTS ────── */}
          {activeSection === "home-requests" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex gap-3">
                  <Select
                    value={homeStatusFilter}
                    onValueChange={setHomeStatusFilter}
                  >
                    <SelectTrigger
                      data-ocid="home-requests.status.select"
                      className="w-44 h-9 text-sm"
                    >
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="self-center text-sm text-gray-400">
                    {filteredHomeRequests.length} requests
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredHomeRequests.map((r, idx) => (
                  <div
                    key={r.id}
                    data-ocid={`home-requests.item.${idx + 1}`}
                    className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #1a1a2e, #0f3460)",
                          }}
                        >
                          {r.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {r.studentName}
                          </p>
                          <p className="text-xs text-gray-400">
                            Class {r.class}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <BookOpen size={12} className="text-blue-400" />
                        <span>{r.subjects}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin size={12} className="text-red-400" />
                        <span>{r.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users size={12} className="text-purple-400" />
                        <span>Preferred: {r.preferredGender} tutor</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {r.status === "Pending" && (
                        <Button
                          size="sm"
                          data-ocid={`home-requests.accept.${idx + 1}`}
                          onClick={() => updateHomeRequest(r.id, "Accepted")}
                          className="flex-1 h-7 text-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          <Check size={12} className="mr-1" /> Accept
                        </Button>
                      )}
                      {r.status === "Accepted" && (
                        <Button
                          size="sm"
                          data-ocid={`home-requests.complete.${idx + 1}`}
                          onClick={() => updateHomeRequest(r.id, "Completed")}
                          className="flex-1 h-7 text-xs bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Check size={12} className="mr-1" /> Complete
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        data-ocid={`home-requests.delete.${idx + 1}`}
                        onClick={() => deleteHomeRequest(r.id)}
                        className="h-7 px-2.5 text-xs"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredHomeRequests.length === 0 && (
                  <div
                    className="col-span-3 text-center py-16"
                    data-ocid="home-requests.empty_state"
                  >
                    <p className="text-gray-400">
                      No home tuition requests found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ────── ONLINE BOOKINGS ────── */}
          {activeSection === "online-bookings" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex gap-3">
                  <Select
                    value={onlineStatusFilter}
                    onValueChange={setOnlineStatusFilter}
                  >
                    <SelectTrigger
                      data-ocid="online-bookings.status.select"
                      className="w-44 h-9 text-sm"
                    >
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bookings</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="self-center text-sm text-gray-400">
                    {filteredOnlineBookings.length} bookings
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Student
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Tutor
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Subject
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Class
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Date
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Time
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOnlineBookings.map((b, idx) => (
                      <TableRow
                        key={b.id}
                        data-ocid={`online-bookings.item.${idx + 1}`}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="text-sm font-medium text-gray-800">
                          {b.studentName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {b.tutorName}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {b.subject}
                        </TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                            Class {b.class}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {b.date}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {b.time}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={b.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {b.status === "Pending" && (
                              <Button
                                size="sm"
                                data-ocid={`online-bookings.accept.${idx + 1}`}
                                onClick={() =>
                                  updateBookingStatus(b.id, "Accepted")
                                }
                                className="h-7 px-2.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white"
                              >
                                <Check size={12} className="mr-1" /> Accept
                              </Button>
                            )}
                            {b.status === "Accepted" && (
                              <Button
                                size="sm"
                                data-ocid={`online-bookings.complete.${idx + 1}`}
                                onClick={() =>
                                  updateBookingStatus(b.id, "Completed")
                                }
                                className="h-7 px-2.5 text-xs bg-blue-500 hover:bg-blue-600 text-white"
                              >
                                Done
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              data-ocid={`online-bookings.delete.${idx + 1}`}
                              onClick={() => deleteBooking(b.id)}
                              className="h-7 px-2.5 text-xs"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOnlineBookings.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-10"
                          data-ocid="online-bookings.empty_state"
                        >
                          <p className="text-gray-400">No bookings found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ────── MESSAGES ────── */}
          {activeSection === "messages" && (
            <div className="space-y-3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-display font-semibold text-gray-800">
                    Inbox
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {messages.filter((m) => m.unread).length} unread messages
                  </p>
                </div>
                <div className="divide-y divide-gray-100">
                  {messages.map((m, idx) => (
                    <div key={m.id} data-ocid={`messages.item.${idx + 1}`}>
                      <button
                        type="button"
                        className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors ${
                          m.unread ? "bg-blue-50/40" : ""
                        }`}
                        onClick={() => toggleMessage(m.id)}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5"
                          style={{
                            background:
                              m.role === "Tutor"
                                ? "linear-gradient(135deg, #f5a623, #e8891a)"
                                : "linear-gradient(135deg, #1a1a2e, #0f3460)",
                          }}
                        >
                          {m.sender.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm ${m.unread ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}
                              >
                                {m.sender}
                              </p>
                              <span
                                className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                  m.role === "Tutor"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-indigo-100 text-indigo-700"
                                }`}
                              >
                                {m.role}
                              </span>
                              {m.unread && (
                                <span
                                  className="w-2 h-2 rounded-full flex-shrink-0"
                                  style={{ background: "#3b82f6" }}
                                />
                              )}
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {m.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5 truncate">
                            {m.preview}
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className={`text-gray-400 flex-shrink-0 transition-transform mt-2 ${
                            expandedMessage === m.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {expandedMessage === m.id && (
                        <div className="px-5 pb-4 ml-14 bg-gray-50 border-t border-gray-100">
                          <p className="text-sm text-gray-700 pt-3 leading-relaxed">
                            {m.full}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="h-7 text-xs">
                              <Mail size={12} className="mr-1" /> Reply
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                            >
                              Mark as Resolved
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ────── APPLICATIONS ────── */}
          {activeSection === "applications" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Search by name, email..."
                    data-ocid="applications.search_input"
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
                </div>
                <button
                  onClick={fetchApplications}
                  data-ocid="applications.secondary_button"
                  type="button"
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center gap-2"
                >
                  Refresh
                </button>
              </div>

              {appsLoading ? (
                <div
                  className="bg-white rounded-xl shadow-sm p-8 text-center"
                  data-ocid="applications.loading_state"
                >
                  <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Loading applications...
                  </p>
                </div>
              ) : applications.filter(
                  (a) =>
                    appSearch === "" ||
                    a.name.toLowerCase().includes(appSearch.toLowerCase()) ||
                    a.email.toLowerCase().includes(appSearch.toLowerCase()),
                ).length === 0 ? (
                <div
                  className="bg-white rounded-xl shadow-sm p-10 text-center"
                  data-ocid="applications.empty_state"
                >
                  <FileText size={36} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">
                    No tutor applications yet.
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Applications submitted via the Tutor Apply form will appear
                    here.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table
                      className="w-full text-sm"
                      data-ocid="applications.table"
                    >
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Contact</th>
                          <th className="px-4 py-3 text-left">Gender</th>
                          <th className="px-4 py-3 text-left">Subjects</th>
                          <th className="px-4 py-3 text-left">City</th>
                          <th className="px-4 py-3 text-left">Exp</th>
                          <th className="px-4 py-3 text-left">Qualification</th>
                          <th className="px-4 py-3 text-left">Fees</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications
                          .filter(
                            (a) =>
                              appSearch === "" ||
                              a.name
                                .toLowerCase()
                                .includes(appSearch.toLowerCase()) ||
                              a.email
                                .toLowerCase()
                                .includes(appSearch.toLowerCase()),
                          )
                          .map((app, idx) => (
                            <tr
                              key={String(app.id)}
                              data-ocid={`applications.row.${idx + 1}`}
                              className="border-t border-gray-100 hover:bg-gray-50"
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {app.name}
                              </td>
                              <td className="px-4 py-3">
                                <div className="text-xs text-gray-600">
                                  {app.email}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {app.phone}
                                </div>
                              </td>
                              <td className="px-4 py-3 capitalize">
                                {app.gender}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex flex-wrap gap-1 max-w-[150px]">
                                  {app.subjects.slice(0, 3).map((s) => (
                                    <span
                                      key={s}
                                      className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                  {app.subjects.length > 3 && (
                                    <span className="text-xs text-gray-400">
                                      +{app.subjects.length - 3}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">{app.city}</td>
                              <td className="px-4 py-3">
                                {String(app.experienceYears)}y
                              </td>
                              <td className="px-4 py-3">{app.qualification}</td>
                              <td className="px-4 py-3">
                                ₹{String(app.monthlyFees)}/mo
                              </td>
                              <td className="px-4 py-3">
                                {app.status === ApplicationStatus.pending && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Pending
                                  </span>
                                )}
                                {app.status === ApplicationStatus.approved && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    Approved
                                  </span>
                                )}
                                {app.status === ApplicationStatus.rejected && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                    Rejected
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  {app.status !==
                                    ApplicationStatus.approved && (
                                    <button
                                      type="button"
                                      onClick={() => handleApproveApp(app.id)}
                                      data-ocid={`applications.confirm_button.${idx + 1}`}
                                      className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  {app.status !==
                                    ApplicationStatus.rejected && (
                                    <button
                                      type="button"
                                      onClick={() => handleRejectApp(app.id)}
                                      data-ocid={`applications.delete_button.${idx + 1}`}
                                      className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                      Reject
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ────── SETTINGS ────── */}
          {activeSection === "settings" && (
            <div className="space-y-5 max-w-2xl">
              {/* Admin Profile Card */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-display font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-blue-500" /> Admin Profile
                </h3>
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                    }}
                  >
                    A
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-bold text-gray-800 text-lg">
                      Admin
                    </p>
                    <p className="text-sm text-amber-600 font-medium mb-3">
                      Super Admin
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-blue-400" />
                        <span>niranjeevan24@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-green-400" />
                        <span>+91 9363322326</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-red-400" />
                        <span>Coimbatore, Tamil Nadu, India</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Website Settings */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-display font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-purple-500" /> Website
                  Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Platform Name
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      EduConnect Tamil Nadu
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Version
                    </span>
                    <span className="text-sm text-gray-500">v2.0.0</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      Region
                    </span>
                    <span className="text-sm text-gray-500">
                      Tamil Nadu, India
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-gray-600">
                      Commission Rate
                    </span>
                    <span className="text-sm text-gray-500">10%</span>
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-display font-semibold text-gray-800 mb-4">
                  Change Password
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        data-ocid="settings.current.input"
                        type={showCurrPwd ? "text" : "password"}
                        placeholder="Enter current password"
                        className="pr-10 h-9 text-sm"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowCurrPwd((v) => !v)}
                      >
                        {showCurrPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        data-ocid="settings.new.input"
                        type={showNewPwd ? "text" : "password"}
                        placeholder="Enter new password"
                        className="pr-10 h-9 text-sm"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        onClick={() => setShowNewPwd((v) => !v)}
                      >
                        {showNewPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                      Confirm New Password
                    </Label>
                    <Input
                      data-ocid="settings.confirm.input"
                      type="password"
                      placeholder="Confirm new password"
                      className="h-9 text-sm"
                    />
                  </div>
                  <Button
                    data-ocid="settings.save.button"
                    onClick={() =>
                      toast.success("Password updated successfully!")
                    }
                    className="mt-1 h-9 text-sm"
                    style={{
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                    }}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Edit Tutor Dialog ── */}
      <Dialog
        open={!!editTutor}
        onOpenChange={(open) => {
          if (!open) setEditTutor(null);
        }}
      >
        <DialogContent className="max-w-md" data-ocid="tutors.edit.dialog">
          <DialogHeader>
            <DialogTitle>Edit Tutor Details</DialogTitle>
          </DialogHeader>
          {editTutor && (
            <div className="space-y-3 py-2">
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Name
                </Label>
                <Input
                  data-ocid="tutors.edit.name.input"
                  value={editTutor.name}
                  onChange={(e) =>
                    setEditTutor({ ...editTutor, name: e.target.value })
                  }
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Subject
                </Label>
                <Input
                  data-ocid="tutors.edit.subject.input"
                  value={editTutor.subject}
                  onChange={(e) =>
                    setEditTutor({ ...editTutor, subject: e.target.value })
                  }
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  City
                </Label>
                <Input
                  data-ocid="tutors.edit.city.input"
                  value={editTutor.city}
                  onChange={(e) =>
                    setEditTutor({ ...editTutor, city: e.target.value })
                  }
                  className="h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                  Tuition Type
                </Label>
                <Select
                  value={editTutor.type}
                  onValueChange={(v) =>
                    setEditTutor({ ...editTutor, type: v as Tutor["type"] })
                  }
                >
                  <SelectTrigger
                    data-ocid="tutors.edit.type.select"
                    className="h-9 text-sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="tutors.edit.cancel"
              onClick={() => setEditTutor(null)}
              className="text-sm"
            >
              Cancel
            </Button>
            <Button
              data-ocid="tutors.edit.save"
              onClick={saveEditTutor}
              className="text-sm"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
