"use client";

import Link from "next/link";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function SetupPortalLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage(null);
      setSuccess(false);

      if (!token) {
        throw new Error(
          "This setup link is missing or invalid. Please use the secure link from your FertilityCareHub email."
        );
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const response = await fetch("/api/auth/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        email?: string;
        error?: string;
      };

      if (!response.ok || !result.success || !result.email) {
        throw new Error(result.error ?? "Unable to complete portal setup.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: result.email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      setSuccess(true);
      setMessage("Your portal login has been created. Redirecting you now...");

      router.push("/portal");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to complete portal setup.";

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
          Create Your Portal Login
        </h1>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          Your advisory payment has been confirmed and your private portal access
          has been activated. Create your password below to enter your secure
          planning workspace.
        </p>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <p className="text-sm leading-6 text-emerald-900">
            This secure setup page is available only through the private link
            sent to paid FertilityCareHub advisory clients.
          </p>
        </div>

        {!token ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-700">
            This setup link is missing or invalid. Please return to your
            FertilityCareHub onboarding email and use the secure portal setup
            button.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-800"
              >
                Create password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                placeholder="Minimum 8 characters"
                required
              />

              <p className="mt-2 text-xs leading-5 text-stone-500">
                Use a secure password that you do not use on other websites.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-stone-800"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
                placeholder="Re-enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? "Creating portal login..."
                : "Create Secure Portal Login"}
            </button>
          </form>
        )}

        {message ? (
          <div
            className={`mt-5 rounded-xl border px-4 py-4 text-sm leading-6 ${
              success
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        ) : null}

        <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
          <h2 className="text-sm font-semibold text-stone-900">
            What happens next
          </h2>

          <div className="mt-3 space-y-3 text-sm leading-6 text-stone-700">
            <p>
              <span className="font-medium text-stone-900">1.</span> Create your
              secure portal password on this page.
            </p>

            <p>
              <span className="font-medium text-stone-900">2.</span> You will be
              signed in automatically.
            </p>

            <p>
              <span className="font-medium text-stone-900">3.</span> Your
              private planning workspace will open.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-stone-200 pt-6">
          <p className="text-sm leading-6 text-stone-600">
            Already created your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-stone-900 underline"
            >
              Sign in
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SetupPortalLoginPage() {
  return (
    <Suspense fallback={null}>
      <SetupPortalLoginForm />
    </Suspense>
  );
}