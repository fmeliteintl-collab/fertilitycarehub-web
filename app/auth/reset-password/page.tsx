"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type ResetStatus = "loading" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ResetStatus>("loading");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeRecoveryState() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (session) {
        setStatus("ready");
      } else {
        setStatus("invalid");
      }
    }

    void initializeRecoveryState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) {
          return;
        }

        if (
          (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") &&
          session
        ) {
          setStatus("ready");
          setMessage(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setMessage("Your password has been updated. Redirecting to login...");
      setPassword("");
      setConfirmPassword("");

      window.setTimeout(() => {
        router.push("/auth/login");
        router.refresh();
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unable to reset password.";

      setMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          FertilityCareHub
        </p>

        <h1 className="mt-3 text-2xl font-semibold text-stone-900">
          Reset Password
        </h1>

        {status === "loading" ? (
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Preparing your password reset session...
          </p>
        ) : null}

        {status === "invalid" ? (
          <>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              This password reset link is invalid or has expired. Please request
              a new reset link.
            </p>

            <p className="mt-6 text-sm text-stone-600">
              Go to{" "}
              <Link
                href="/auth/forgot-password"
                className="font-medium text-stone-900 underline"
              >
                forgot password
              </Link>
            </p>
          </>
        ) : null}

        {status === "ready" ? (
          <>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Enter your new password below.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-800"
                >
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-stone-800"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                  placeholder="Re-enter your new password"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Updating password..." : "Update Password"}
              </button>
            </form>

            {message ? (
              <p
                className={`mt-4 text-sm ${
                  message.includes("updated")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}