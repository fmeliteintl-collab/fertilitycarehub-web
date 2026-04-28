"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

function SetupPortalLoginForm() {
  const searchParams = useSearchParams();
  const supabase = getSupabaseBrowserClient();

  const emailFromUrl = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailFromUrl);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail(emailFromUrl);
  }, [emailFromUrl]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage(null);
      setSuccess(false);

      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error("Please enter the email address used at checkout.");
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${window.location.origin}/auth/update-password`,
        }
      );

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage(
        "A secure portal login setup link has been sent to your email. Please check your inbox and junk folder."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to send the setup link.";

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
          has been unlocked. Use the same email address entered at Stripe
          checkout to create your secure login.
        </p>

        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4">
          <p className="text-sm leading-6 text-emerald-900">
            This setup page is only for paid FertilityCareHub advisory clients
            whose portal access has already been activated.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-800"
            >
              Checkout email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-500"
              placeholder="you@example.com"
              required
            />

            <p className="mt-2 text-xs leading-5 text-stone-500">
              This must match the email address used during payment.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending setup link..." : "Send Secure Setup Link"}
          </button>
        </form>

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
              <span className="font-medium text-stone-900">1.</span> We send a
              secure password setup link to your checkout email.
            </p>

            <p>
              <span className="font-medium text-stone-900">2.</span> You create
              your password through the secure link.
            </p>

            <p>
              <span className="font-medium text-stone-900">3.</span> You sign in
              and access your private planning workspace.
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