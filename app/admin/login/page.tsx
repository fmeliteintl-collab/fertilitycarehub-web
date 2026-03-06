"use client";

import React, { useState } from "react";
import Link from "next/link";  // Add this import
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Invalid token");
        setLoading(false);
        return;
      }

      // Cookie is set by server, now redirect to admin dashboard
      router.push("/admin");
    } catch {  // Removed 'err'
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E6DDCD] bg-white/60 p-8">
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Admin Login</h1>
        <p className="text-sm text-[#6A6256] mb-6">
          Enter your admin token to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter admin token..."
              className="w-full rounded-xl border border-[#E6DDCD] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D7C8AF]"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full rounded-xl bg-[#1A1A1A] px-4 py-3 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link  // Changed from <a> to <Link>
            href="/"
            className="text-sm text-[#6A6256] underline hover:text-[#1A1A1A]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}