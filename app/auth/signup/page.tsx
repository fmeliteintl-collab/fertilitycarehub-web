"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-stone-50 px-6 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          FertilityCareHub
        </p>

        <h1 className="mt-3 text-2xl font-semibold text-stone-900">
          Private Client Access
        </h1>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          FertilityCareHub client workspace access is reserved for approved
          premium advisory clients. Public self-registration is not available.
        </p>

        <div className="mt-8 space-y-5">
          <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
            <h2 className="text-sm font-semibold text-stone-900">
              How access works
            </h2>

            <div className="mt-3 space-y-3 text-sm leading-6 text-stone-700">
              <p>
                <span className="font-medium text-stone-900">
                  1. Advisory selection.
                </span>{" "}
                Clients begin by selecting the advisory pathway appropriate to
                their fertility goals, jurisdictional complexity, and level of
                support required.
              </p>

              <p>
                <span className="font-medium text-stone-900">
                  2. Intake and onboarding.
                </span>{" "}
                Eligible clients proceed through structured intake and approval.
              </p>

              <p>
                <span className="font-medium text-stone-900">
                  3. Workspace access issued.
                </span>{" "}
                Private portal access is then provided directly as part of the
                approved engagement. It is not an open public signup system.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4">
            <p className="text-sm leading-6 text-amber-900">
              If you are an approved client and believe you should already have
              access, please use your issued login credentials or contact
              FertilityCareHub for assistance.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Link
            href="/advisory"
            className="block w-full rounded-xl bg-stone-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-stone-800"
          >
            View Advisory Tiers
          </Link>

          <Link
            href="/consultation"
            className="block w-full rounded-xl border border-stone-300 px-4 py-3 text-center text-sm font-medium text-stone-900 transition hover:bg-stone-100"
          >
            Request Client Intake
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200 bg-white px-4 py-4">
          <p className="text-sm leading-6 text-stone-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-stone-900 underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-6 text-xs leading-5 text-stone-500">
          Client workspace access is issued selectively as part of structured
          advisory onboarding and approval.
        </p>
      </div>
    </div>
  );
}