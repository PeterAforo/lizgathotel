"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <div className="w-full max-w-md px-4">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm border border-primary bg-primary/10">
            <span className="font-sans text-2xl font-bold text-primary">L</span>
          </div>
          <h1 className="mt-4 font-sans text-2xl font-bold tracking-wider text-white">LIZGAT</h1>
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">Hotel Admin</p>
        </div>

        {/* Login Form */}
        <div className="rounded-sm bg-white p-8 shadow-lg">
          <h2 className="font-sans text-xl font-bold text-dark">Sign In</h2>
          <p className="mt-1 font-body text-sm text-gray-dark">Enter your credentials to access the admin panel.</p>

          {error && (
            <div className="mt-4 rounded-sm bg-red-50 p-3 text-center">
              <p className="font-body text-sm font-semibold text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block font-body text-sm font-semibold text-dark">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lizgathotel.com"
                  required
                  className="w-full rounded-sm border border-cream-dark bg-cream py-2.5 pl-10 pr-4 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-body text-sm font-semibold text-dark">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-sm border border-cream-dark bg-cream py-2.5 pl-10 pr-10 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm bg-primary py-2.5 font-body text-sm font-bold uppercase tracking-wider text-dark transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
