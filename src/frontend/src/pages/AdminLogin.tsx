import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export function setAdminAuth() {
  sessionStorage.setItem("educonnect_admin", "true");
}
export function clearAdminAuth() {
  sessionStorage.removeItem("educonnect_admin");
}
export function isAdminAuthenticated() {
  return sessionStorage.getItem("educonnect_admin") === "true";
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAdminAuth();
      toast.success("Welcome, Admin!");
      navigate({ to: "/admin" });
    } else {
      setError("Invalid username or password. Please try again.");
      toast.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 px-4">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-blue-200 text-sm mt-1">EduConnect Tamil Nadu</p>
        </div>

        <Card className="border-white/10 bg-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="pb-2">
            <p className="text-center text-blue-100 text-sm">
              Authorized personnel only. All access is logged.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <Input
                    id="username"
                    data-ocid="admin_login.input"
                    type="text"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-amber-400 focus:ring-amber-400/20"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <Input
                    id="password"
                    data-ocid="admin_login.input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300 focus:border-amber-400 focus:ring-amber-400/20"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                    data-ocid="admin_login.toggle"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  data-ocid="admin_login.error_state"
                  className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                data-ocid="admin_login.submit_button"
                className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold h-11 text-base shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Sign In to Dashboard
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-blue-300 text-xs">
                Protected by EduConnect Security. Unauthorized access is
                prohibited.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-blue-300/60 text-xs mt-6">
          © {new Date().getFullYear()} EduConnect Tamil Nadu. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
