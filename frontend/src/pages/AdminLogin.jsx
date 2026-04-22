import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { adminApi, setToken, isAuthed } from "@/lib/adminApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthed()) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const res = await adminApi.login(password);
      setToken(res.token);
      toast.success("Signed in.");
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Login failed.";
      toast.error(typeof msg === "string" ? msg : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-700/15 rounded-full blur-3xl" />
      </div>

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm bg-slate-900/80 backdrop-blur border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        data-testid="admin-login-form"
      >
        <div className="flex items-center gap-2 text-sky-400 mb-6">
          <ShieldCheck size={20} />
          <span className="font-mono text-xs uppercase tracking-widest">PureBreeze · Admin</span>
        </div>

        <h1 className="font-display text-3xl font-bold tracking-tighter text-white">
          Welcome back.
        </h1>
        <p className="text-sm text-slate-400 mt-1">Enter the admin password to continue.</p>

        <div className="mt-8 space-y-2">
          <Label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Password</Label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              className="pl-11 h-12 rounded-xl bg-slate-800 border-slate-700 text-white focus:border-sky-500"
              data-testid="admin-password-input"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold"
          data-testid="admin-login-submit"
        >
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <a
          href="/"
          className="mt-6 block text-center text-xs text-slate-500 hover:text-slate-300"
          data-testid="admin-back-home"
        >
          ← Back to site
        </a>
      </form>
    </div>
  );
}
