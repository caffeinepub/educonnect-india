import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  MOCK_PAYMENTS,
  MOCK_PENDING_TUTORS,
  MOCK_TUTORS,
} from "../data/mockData";
import { useActor } from "../hooks/useActor";

export default function AdminDashboard() {
  const { actor } = useActor();
  const [pendingTutors, setPendingTutors] = useState(MOCK_PENDING_TUTORS);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      if (actor) await actor.approveTutor(id);
      else await new Promise((r) => setTimeout(r, 800));
    },
    onMutate: (id) => setApprovingId(id),
    onSuccess: (_, id) => {
      setPendingTutors((prev) => prev.filter((t) => t.id !== id));
      toast.success("Tutor approved!");
      setApprovingId(null);
    },
    onError: () => {
      toast.error("Failed to approve");
      setApprovingId(null);
    },
  });

  const rejectTutor = async (id: string) => {
    await new Promise((r) => setTimeout(r, 500));
    setPendingTutors((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tutor rejected.");
  };

  const totalRevenue = MOCK_PAYMENTS.reduce((sum, p) => sum + p.commission, 0);

  const stats = [
    {
      label: "Total Tutors",
      value: MOCK_TUTORS.length,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Pending Approvals",
      value: pendingTutors.length,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Total Payments",
      value: MOCK_PAYMENTS.length,
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      label: "Platform Revenue",
      value: `₹${totalRevenue}`,
      icon: TrendingUp,
      color: "text-green-600",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8" data-ocid="admin.page">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage tutors, payments and users
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{label}</span>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div className="font-display text-2xl font-bold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <Tabs defaultValue="approvals" data-ocid="admin.tab">
        <TabsList className="mb-6">
          <TabsTrigger value="approvals" data-ocid="admin.tab">
            Pending Approvals{" "}
            {pendingTutors.length > 0 && (
              <Badge className="ml-2 gradient-teal text-white border-0 text-[10px]">
                {pendingTutors.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="payments" data-ocid="admin.tab">
            Payments
          </TabsTrigger>
          <TabsTrigger value="users" data-ocid="admin.tab">
            Tutors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approvals">
          {pendingTutors.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
              <p className="font-medium">
                All caught up! No pending approvals.
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="admin.list">
              {pendingTutors.map((tutor, idx) => (
                <Card key={tutor.id} data-ocid={`admin.item.${idx + 1}`}>
                  <CardContent className="p-5 flex items-center gap-4 flex-wrap">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="gradient-teal text-white font-bold">
                        {tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold">{tutor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {tutor.city} · {tutor.gender} ·{" "}
                        {tutor.subjects.join(", ")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Submitted: {tutor.submittedAt}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white border-0"
                        disabled={approvingId === tutor.id}
                        onClick={() => approveMutation.mutate(tutor.id)}
                        data-ocid={`admin.confirm_button.${idx + 1}`}
                      >
                        {approvingId === tutor.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => rejectTutor(tutor.id)}
                        data-ocid={`admin.delete_button.${idx + 1}`}
                      >
                        <XCircle className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">All Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Tutor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PAYMENTS.map((p, idx) => (
                    <TableRow key={p.id} data-ocid={`admin.row.${idx + 1}`}>
                      <TableCell>{p.student}</TableCell>
                      <TableCell>{p.tutor}</TableCell>
                      <TableCell className="font-semibold">
                        ₹{p.amount}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        ₹{p.commission}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            p.status === "completed"
                              ? "bg-green-50 text-green-700 border-0"
                              : "bg-amber-50 text-amber-700 border-0"
                          }
                        >
                          {p.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">All Tutors</CardTitle>
            </CardHeader>
            <CardContent>
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Tutor</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TUTORS.map((tutor, idx) => (
                    <TableRow key={tutor.id} data-ocid={`admin.row.${idx + 1}`}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="gradient-teal text-white text-xs font-bold">
                              {tutor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {tutor.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tutor.gender}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{tutor.city}</TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {tutor.subjects.slice(0, 2).join(", ")}
                          {tutor.subjects.length > 2 ? "..." : ""}
                        </span>
                      </TableCell>
                      <TableCell>⭐ {tutor.rating}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-50 text-green-700 border-0">
                          Approved
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
