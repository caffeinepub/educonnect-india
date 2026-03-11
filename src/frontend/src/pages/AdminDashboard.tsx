import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  MOCK_PAYMENTS,
  MOCK_PENDING_TUTORS,
  MOCK_STUDENTS,
  MOCK_TUTORS,
  type MockStudent,
  type MockTutor,
  SUBJECTS,
  TN_CITIES,
} from "../data/mockData";
import { clearAdminAuth, isAdminAuthenticated } from "./AdminLogin";

type TabId = "overview" | "tutors" | "students" | "approvals" | "payments";

const NAV_ITEMS: {
  id: TabId;
  label: string;
  icon: React.ElementType;
  badge?: number;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "tutors", label: "Tutors", icon: Users },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "approvals", label: "Approvals", icon: Clock },
  { id: "payments", label: "Payments", icon: CreditCard },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── Tutor Edit Dialog ───────────────────────────────────────────────────────
function TutorEditDialog({
  tutor,
  onClose,
  onSave,
}: {
  tutor: MockTutor;
  onClose: () => void;
  onSave: (updated: MockTutor) => void;
}) {
  const [form, setForm] = useState({ ...tutor });
  const set = (field: keyof MockTutor, val: string | number) =>
    setForm((p) => ({ ...p, [field]: val }));

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="admin.tutors.edit.dialog">
        <DialogHeader>
          <DialogTitle>Edit Tutor — {tutor.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>City</Label>
              <Select value={form.city} onValueChange={(v) => set("city", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TN_CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Hourly Rate (₹)</Label>
              <Input
                type="number"
                value={form.hourlyRate}
                onChange={(e) => set("hourlyRate", Number(e.target.value))}
              />
            </div>
            <div className="space-y-1">
              <Label>Tuition Type</Label>
              <Select
                value={form.tuitionType}
                onValueChange={(v) =>
                  set("tuitionType", v as MockTutor["tuitionType"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Home Tuition</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Qualification</Label>
            <Input
              value={form.qualification}
              onChange={(e) => set("qualification", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label>Subjects (comma-separated)</Label>
            <Input
              value={form.subjects.join(", ")}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  subjects: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin.tutors.edit.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-600 text-white"
            onClick={() => {
              onSave(form);
              onClose();
            }}
            data-ocid="admin.tutors.edit.save_button"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Student Edit Dialog ─────────────────────────────────────────────────────
function StudentEditDialog({
  student,
  onClose,
  onSave,
}: {
  student: MockStudent;
  onClose: () => void;
  onSave: (updated: MockStudent) => void;
}) {
  const [form, setForm] = useState({ ...student });
  const set = (field: keyof MockStudent, val: string) =>
    setForm((p) => ({ ...p, [field]: val }));

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-lg"
        data-ocid="admin.students.edit.dialog"
      >
        <DialogHeader>
          <DialogTitle>Edit Student — {student.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Student Name</Label>
              <Input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Parent Name</Label>
              <Input
                value={form.parentName}
                onChange={(e) => set("parentName", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>City</Label>
              <Select value={form.city} onValueChange={(v) => set("city", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TN_CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Class</Label>
              <Select value={form.class} onValueChange={(v) => set("class", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => String(i + 1)).map(
                    (c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as MockStudent["status"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="admin.students.edit.cancel_button"
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-700 hover:bg-blue-600 text-white"
            onClick={() => {
              onSave(form);
              onClose();
            }}
            data-ocid="admin.students.edit.save_button"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Tutors state
  const [tutors, setTutors] = useState<MockTutor[]>(MOCK_TUTORS);
  const [tutorSearch, setTutorSearch] = useState("");
  const [tutorCityFilter, setTutorCityFilter] = useState("all");
  const [tutorTypeFilter, setTutorTypeFilter] = useState("all");
  const [tutorGenderFilter, setTutorGenderFilter] = useState("all");
  const [editingTutor, setEditingTutor] = useState<MockTutor | null>(null);
  const [deletingTutor, setDeletingTutor] = useState<MockTutor | null>(null);

  // Students state
  const [students, setStudents] = useState<MockStudent[]>(MOCK_STUDENTS);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentCityFilter, setStudentCityFilter] = useState("all");
  const [studentClassFilter, setStudentClassFilter] = useState("all");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [editingStudent, setEditingStudent] = useState<MockStudent | null>(
    null,
  );
  const [deletingStudent, setDeletingStudent] = useState<MockStudent | null>(
    null,
  );

  // Approvals state
  const [pendingTutors, setPendingTutors] = useState(MOCK_PENDING_TUTORS);

  useEffect(() => {
    if (!isAdminAuthenticated()) navigate({ to: "/admin-login" });
  }, [navigate]);

  const handleLogout = () => {
    clearAdminAuth();
    toast.success("Logged out successfully");
    navigate({ to: "/admin-login" });
  };

  // Filtered tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter((t) => {
      const matchSearch =
        !tutorSearch ||
        t.name.toLowerCase().includes(tutorSearch.toLowerCase()) ||
        t.city.toLowerCase().includes(tutorSearch.toLowerCase()) ||
        t.subjects.some((s) =>
          s.toLowerCase().includes(tutorSearch.toLowerCase()),
        );
      const matchCity = tutorCityFilter === "all" || t.city === tutorCityFilter;
      const matchType =
        tutorTypeFilter === "all" || t.tuitionType === tutorTypeFilter;
      const matchGender =
        tutorGenderFilter === "all" || t.gender === tutorGenderFilter;
      return matchSearch && matchCity && matchType && matchGender;
    });
  }, [
    tutors,
    tutorSearch,
    tutorCityFilter,
    tutorTypeFilter,
    tutorGenderFilter,
  ]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        !studentSearch ||
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.parentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.city.toLowerCase().includes(studentSearch.toLowerCase());
      const matchCity =
        studentCityFilter === "all" || s.city === studentCityFilter;
      const matchClass =
        studentClassFilter === "all" || s.class === studentClassFilter;
      const matchStatus =
        studentStatusFilter === "all" || s.status === studentStatusFilter;
      return matchSearch && matchCity && matchClass && matchStatus;
    });
  }, [
    students,
    studentSearch,
    studentCityFilter,
    studentClassFilter,
    studentStatusFilter,
  ]);

  const totalRevenue = MOCK_PAYMENTS.reduce((sum, p) => sum + p.commission, 0);
  const totalPayments = MOCK_PAYMENTS.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: "Total Tutors",
      value: tutors.length,
      icon: Users,
      color: "bg-blue-50 text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Total Students",
      value: students.length,
      icon: GraduationCap,
      color: "bg-emerald-50 text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Pending Approvals",
      value: pendingTutors.length,
      icon: Clock,
      color: "bg-amber-50 text-amber-700",
      iconBg: "bg-amber-100",
    },
    {
      label: "Platform Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-700",
      iconBg: "bg-purple-100",
    },
  ];

  const renderSidebar = () => {
    return (
      <>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20">
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-bold text-sm leading-tight">
              EduConnect
            </p>
            <p className="text-blue-300 text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid="admin.sidebar.link"
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-white/15 text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {item.id === "approvals" && pendingTutors.length > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                  {pendingTutors.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            type="button"
            data-ocid="admin.logout.button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-200 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </>
    );
  };

  if (!isAdminAuthenticated()) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-blue-950 fixed top-0 left-0 h-full z-30">
        {renderSidebar()}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-60 bg-blue-950 z-50 flex flex-col lg:hidden"
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-blue-200 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              {renderSidebar()}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-base capitalize">
                {NAV_ITEMS.find((n) => n.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
              <p className="text-xs text-gray-500">
                EduConnect Tamil Nadu Admin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {/* ── OVERVIEW ── */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <Card
                          data-ocid="admin.overview.card"
                          className="border-0 shadow-sm"
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                  {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">
                                  {stat.value}
                                </p>
                              </div>
                              <div
                                className={`${stat.iconBg} p-2.5 rounded-xl`}
                              >
                                <stat.icon
                                  className={`h-5 w-5 ${stat.color.split(" ")[1]}`}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Approvals */}
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-500" />
                          Pending Approvals
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {pendingTutors.slice(0, 3).map((t) => (
                          <div key={t.id} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-amber-100 text-amber-700 text-xs font-bold">
                                {initials(t.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {t.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {t.subjects[0]} · {t.city}
                              </p>
                            </div>
                            <Badge className="bg-amber-100 text-amber-700 text-xs border-0">
                              Pending
                            </Badge>
                          </div>
                        ))}
                        {pendingTutors.length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-4">
                            All caught up!
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setActiveTab("approvals")}
                          className="text-xs text-blue-600 hover:underline w-full text-center mt-2"
                        >
                          View all approvals →
                        </button>
                      </CardContent>
                    </Card>

                    {/* Recent Payments */}
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-purple-500" />
                          Recent Payments
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {MOCK_PAYMENTS.slice(0, 5).map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {p.student}
                              </p>
                              <p className="text-xs text-gray-500">
                                {p.tutor} · {p.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">
                                ₹{p.amount}
                              </p>
                              <p className="text-xs text-purple-600">
                                +₹{p.commission} comm.
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="pt-2 border-t flex justify-between text-xs">
                          <span className="text-gray-500">Total Revenue</span>
                          <span className="font-bold text-purple-700">
                            ₹{totalRevenue.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* ── TUTORS ── */}
              {activeTab === "tutors" && (
                <div className="space-y-4">
                  {/* Filters */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            data-ocid="admin.tutors.search_input"
                            placeholder="Search by name, city, or subject…"
                            className="pl-9"
                            value={tutorSearch}
                            onChange={(e) => setTutorSearch(e.target.value)}
                          />
                        </div>
                        <Select
                          value={tutorCityFilter}
                          onValueChange={setTutorCityFilter}
                        >
                          <SelectTrigger
                            className="w-full sm:w-36"
                            data-ocid="admin.tutors.select"
                          >
                            <SelectValue placeholder="City" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {TN_CITIES.map((c) => (
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
                            className="w-full sm:w-36"
                            data-ocid="admin.tutors.select"
                          >
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">
                              Home Tuition
                            </SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select
                          value={tutorGenderFilter}
                          onValueChange={setTutorGenderFilter}
                        >
                          <SelectTrigger
                            className="w-full sm:w-36"
                            data-ocid="admin.tutors.select"
                          >
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Genders</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-600">
                        {filteredTutors.length} tutor
                        {filteredTutors.length !== 1 ? "s" : ""} found
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="w-full">
                        <Table data-ocid="admin.tutors.table">
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead>Name</TableHead>
                              <TableHead>Gender</TableHead>
                              <TableHead>Subjects</TableHead>
                              <TableHead>City</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Fees/hr</TableHead>
                              <TableHead>Rating</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredTutors.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={9}
                                  className="text-center py-12 text-gray-400"
                                  data-ocid="admin.tutors.empty_state"
                                >
                                  No tutors match your filters.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredTutors.map((tutor, idx) => (
                                <TableRow
                                  key={tutor.id}
                                  data-ocid={`admin.tutors.row.${idx + 1}`}
                                  className="hover:bg-gray-50"
                                >
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-7 w-7">
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                                          {initials(tutor.name)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium text-sm">
                                        {tutor.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        tutor.gender === "male"
                                          ? "border-blue-200 text-blue-700"
                                          : "border-pink-200 text-pink-700"
                                      }`}
                                    >
                                      {tutor.gender === "male"
                                        ? "Male"
                                        : "Female"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {tutor.subjects.slice(0, 2).map((s) => (
                                        <Badge
                                          key={s}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {s}
                                        </Badge>
                                      ))}
                                      {tutor.subjects.length > 2 && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          +{tutor.subjects.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {tutor.city}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="text-xs capitalize"
                                    >
                                      {tutor.tuitionType}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-sm font-medium">
                                    ₹{tutor.hourlyRate}
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    <span className="text-amber-600 font-medium">
                                      ★ {tutor.rating}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                      Active
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                                        onClick={() => setEditingTutor(tutor)}
                                        data-ocid={`admin.tutors.edit_button.${idx + 1}`}
                                      >
                                        <Pencil className="w-3.5 h-3.5" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                                        onClick={() => setDeletingTutor(tutor)}
                                        data-ocid={`admin.tutors.delete_button.${idx + 1}`}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* ── STUDENTS ── */}
              {activeTab === "students" && (
                <div className="space-y-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            data-ocid="admin.students.search_input"
                            placeholder="Search by name, parent, or city…"
                            className="pl-9"
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                          />
                        </div>
                        <Select
                          value={studentCityFilter}
                          onValueChange={setStudentCityFilter}
                        >
                          <SelectTrigger
                            className="w-full sm:w-36"
                            data-ocid="admin.students.select"
                          >
                            <SelectValue placeholder="City" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {TN_CITIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={studentClassFilter}
                          onValueChange={setStudentClassFilter}
                        >
                          <SelectTrigger
                            className="w-full sm:w-36"
                            data-ocid="admin.students.select"
                          >
                            <SelectValue placeholder="Class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Classes</SelectItem>
                            {Array.from({ length: 12 }, (_, i) =>
                              String(i + 1),
                            ).map((c) => (
                              <SelectItem key={c} value={c}>
                                Class {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={studentStatusFilter}
                          onValueChange={setStudentStatusFilter}
                        >
                          <SelectTrigger
                            className="w-full sm:w-36"
                            data-ocid="admin.students.select"
                          >
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-gray-600">
                        {filteredStudents.length} student
                        {filteredStudents.length !== 1 ? "s" : ""} found
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="w-full">
                        <Table data-ocid="admin.students.table">
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead>Name</TableHead>
                              <TableHead>Parent</TableHead>
                              <TableHead>Class</TableHead>
                              <TableHead>Subjects</TableHead>
                              <TableHead>City</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredStudents.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={8}
                                  className="text-center py-12 text-gray-400"
                                  data-ocid="admin.students.empty_state"
                                >
                                  No students match your filters.
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredStudents.map((student, idx) => (
                                <TableRow
                                  key={student.id}
                                  data-ocid={`admin.students.row.${idx + 1}`}
                                  className="hover:bg-gray-50"
                                >
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-7 w-7">
                                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-bold">
                                          {initials(student.name)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="font-medium text-sm">
                                        {student.name}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-gray-600">
                                    {student.parentName}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Class {student.class}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                      {student.subjects.slice(0, 2).map((s) => (
                                        <Badge
                                          key={s}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          {s}
                                        </Badge>
                                      ))}
                                      {student.subjects.length > 2 && (
                                        <Badge
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          +{student.subjects.length - 2}
                                        </Badge>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {student.city}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="outline"
                                      className="text-xs capitalize"
                                    >
                                      {student.tuitionType}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      className={`text-xs border-0 ${
                                        student.status === "active"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-500"
                                      }`}
                                    >
                                      {student.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                                        onClick={() =>
                                          setEditingStudent(student)
                                        }
                                        data-ocid={`admin.students.edit_button.${idx + 1}`}
                                      >
                                        <Pencil className="w-3.5 h-3.5" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                                        onClick={() =>
                                          setDeletingStudent(student)
                                        }
                                        data-ocid={`admin.students.delete_button.${idx + 1}`}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* ── APPROVALS ── */}
              {activeTab === "approvals" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {pendingTutors.length} tutor
                      {pendingTutors.length !== 1 ? "s" : ""} awaiting approval
                    </p>
                  </div>

                  {pendingTutors.length === 0 ? (
                    <Card className="border-0 shadow-sm">
                      <CardContent
                        className="py-16 text-center"
                        data-ocid="admin.approvals.empty_state"
                      >
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-500" />
                        <p className="font-semibold text-gray-700">
                          All tutors reviewed!
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          No pending approvals at this time.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {pendingTutors.map((tutor, idx) => (
                        <motion.div
                          key={tutor.id}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          data-ocid={`admin.approvals.item.${idx + 1}`}
                        >
                          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-5">
                              <div className="flex items-start gap-3 mb-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                                    {initials(tutor.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-900">
                                    {tutor.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {tutor.gender === "male"
                                      ? "Male"
                                      : "Female"}{" "}
                                    · {tutor.city}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {"qualification" in tutor
                                      ? tutor.qualification
                                      : ""}
                                  </p>
                                </div>
                                <Badge className="bg-amber-100 text-amber-700 border-0 text-xs shrink-0">
                                  Pending
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mb-4">
                                {tutor.subjects.map((s) => (
                                  <Badge
                                    key={s}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-gray-400 mb-3">
                                Submitted: {tutor.submittedAt}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={() => {
                                    setPendingTutors((p) =>
                                      p.filter((t) => t.id !== tutor.id),
                                    );
                                    toast.success("Tutor rejected.");
                                  }}
                                  data-ocid={`admin.approvals.delete_button.${idx + 1}`}
                                >
                                  <XCircle className="h-3.5 w-3.5 mr-1" />
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => {
                                    setPendingTutors((p) =>
                                      p.filter((t) => t.id !== tutor.id),
                                    );
                                    toast.success("Tutor approved!");
                                  }}
                                  data-ocid={`admin.approvals.confirm_button.${idx + 1}`}
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                  Approve
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── PAYMENTS ── */}
              {activeTab === "payments" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Total Transactions
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          ₹{totalPayments.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Platform Commission
                        </p>
                        <p className="text-2xl font-bold text-purple-700 mt-1">
                          ₹{totalRevenue.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-sm col-span-2 lg:col-span-1">
                      <CardContent className="p-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                          Tutor Payouts
                        </p>
                        <p className="text-2xl font-bold text-emerald-700 mt-1">
                          ₹{(totalPayments - totalRevenue).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                      <Table data-ocid="admin.payments.table">
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>ID</TableHead>
                            <TableHead>Student</TableHead>
                            <TableHead>Tutor</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Commission (10%)</TableHead>
                            <TableHead>Tutor Payout</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {MOCK_PAYMENTS.map((payment, idx) => (
                            <TableRow
                              key={payment.id}
                              data-ocid={`admin.payments.row.${idx + 1}`}
                              className="hover:bg-gray-50"
                            >
                              <TableCell className="text-xs text-gray-400 font-mono">
                                {payment.id}
                              </TableCell>
                              <TableCell className="text-sm font-medium">
                                {payment.student}
                              </TableCell>
                              <TableCell className="text-sm">
                                {payment.tutor}
                              </TableCell>
                              <TableCell className="text-sm font-semibold">
                                ₹{payment.amount.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-sm text-purple-600 font-medium">
                                ₹{payment.commission}
                              </TableCell>
                              <TableCell className="text-sm text-emerald-600 font-medium">
                                ₹{payment.amount - payment.commission}
                              </TableCell>
                              <TableCell className="text-sm text-gray-500">
                                {payment.date}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={`text-xs border-0 ${
                                    payment.status === "completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-amber-100 text-amber-700"
                                  }`}
                                >
                                  {payment.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Tutor Edit Dialog */}
      {editingTutor && (
        <TutorEditDialog
          tutor={editingTutor}
          onClose={() => setEditingTutor(null)}
          onSave={(updated) => {
            setTutors((prev) =>
              prev.map((t) => (t.id === updated.id ? updated : t)),
            );
            toast.success("Tutor updated successfully");
          }}
        />
      )}

      {/* Tutor Delete Dialog */}
      <AlertDialog
        open={!!deletingTutor}
        onOpenChange={(open) => !open && setDeletingTutor(null)}
      >
        <AlertDialogContent data-ocid="admin.tutors.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Tutor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>{deletingTutor?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.tutors.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              data-ocid="admin.tutors.delete.confirm_button"
              onClick={() => {
                if (deletingTutor) {
                  setTutors((prev) =>
                    prev.filter((t) => t.id !== deletingTutor.id),
                  );
                  toast.success("Tutor removed successfully");
                  setDeletingTutor(null);
                }
              }}
            >
              Remove Tutor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Student Edit Dialog */}
      {editingStudent && (
        <StudentEditDialog
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSave={(updated) => {
            setStudents((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s)),
            );
            toast.success("Student updated successfully");
          }}
        />
      )}

      {/* Student Delete Dialog */}
      <AlertDialog
        open={!!deletingStudent}
        onOpenChange={(open) => !open && setDeletingStudent(null)}
      >
        <AlertDialogContent data-ocid="admin.students.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>{deletingStudent?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin.students.delete.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              data-ocid="admin.students.delete.confirm_button"
              onClick={() => {
                if (deletingStudent) {
                  setStudents((prev) =>
                    prev.filter((s) => s.id !== deletingStudent.id),
                  );
                  toast.success("Student removed successfully");
                  setDeletingStudent(null);
                }
              }}
            >
              Remove Student
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
