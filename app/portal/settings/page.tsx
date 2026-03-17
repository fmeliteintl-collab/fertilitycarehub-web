"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export const runtime = "edge";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string | null;
};

function isMissingSessionError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AuthSessionMissingError" ||
      error.message.toLowerCase().includes("auth session missing"))
  );
}

export default function PortalSettingsPage() {
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const supabase = getSupabaseBrowserClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          if (isMissingSessionError(userError)) {
            if (isMounted) {
              setProfile(null);
              setMessage("Your session has expired. Please sign in again.");
              setIsError(true);
            }
            return;
          }

          throw userError;
        }

        if (!user) {
          if (isMounted) {
            setProfile(null);
            setMessage("Your session has expired. Please sign in again.");
            setIsError(true);
          }
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, full_name, created_at")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        const nextProfile: ProfileRow = data
          ? {
              id: data.id as string,
              email: (data.email as string | null) ?? user.email ?? null,
              full_name: (data.full_name as string | null) ?? null,
              created_at: (data.created_at as string | null) ?? null,
            }
          : {
              id: user.id,
              email: user.email ?? null,
              full_name: null,
              created_at: null,
            };

        if (!isMounted) {
          return;
        }

        setProfile(nextProfile);
        setFullName(nextProfile.full_name ?? "");
      } catch (error: unknown) {
        console.error(error);

        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your profile settings.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSaveProfile() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      const supabase = getSupabaseBrowserClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        if (isMissingSessionError(userError)) {
          throw new Error("Your session has expired. Please sign in again.");
        }

        throw userError;
      }

      if (!user) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      const trimmedFullName = fullName.trim();

      const payload = {
        id: user.id,
        email: user.email ?? null,
        full_name: trimmedFullName.length > 0 ? trimmedFullName : null,
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" })
        .select("id, email, full_name, created_at")
        .single();

      if (error) {
        throw error;
      }

      const updatedProfile: ProfileRow = {
        id: data.id as string,
        email: (data.email as string | null) ?? user.email ?? null,
        full_name: (data.full_name as string | null) ?? null,
        created_at: (data.created_at as string | null) ?? null,
      };

      setProfile(updatedProfile);
      setFullName(updatedProfile.full_name ?? "");
      setHasUnsavedChanges(false);
      setMessage("Profile settings saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to save profile settings."
      );
    } finally {
      setSaving(false);
    }
  }

  const accountCreatedLabel = useMemo(() => {
    if (!profile?.created_at) {
      return "Not available yet";
    }

    return new Date(profile.created_at).toLocaleString();
  }, [profile?.created_at]);

  const accountState = profile ? "Active" : "Loading";

  if (loading) {
    return <div className="p-6">Loading your settings...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
          Settings
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Account &amp; Portal Settings
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
          Manage your account identity and basic portal settings inside the
          FertilityCareHub planning workspace.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Account State</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {accountState}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Your portal access is connected to the authenticated app shell.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Profile Name</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">
            {profile?.full_name?.trim() ? profile.full_name : "Not set"}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Save your preferred display name for the portal profile layer.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-stone-500">Preferences</p>
          <p className="mt-2 text-3xl font-semibold text-stone-900">Basic</p>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Identity settings are now live. Advanced preferences can be added
            later.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Account Identity
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Update your profile information used across the portal workspace.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-700"
              value={profile?.email ?? ""}
              disabled
              readOnly
            />
            <p className="mt-2 text-xs text-stone-500">
              Email is managed through your authenticated account.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Full Name
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm text-stone-900"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setHasUnsavedChanges(true);
                setMessage(null);
                setIsError(false);
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Account Created
            </label>
            <input
              className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-700"
              value={accountCreatedLabel}
              disabled
              readOnly
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saving || !hasUnsavedChanges}
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : hasUnsavedChanges
                ? "Save Settings"
                : "Saved"}
          </button>

          {message ? (
            <p
              className={`text-sm ${
                isError ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          ) : (
            <p className="text-sm text-stone-500">
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">
            Settings Areas
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Identity settings are active. Additional preference and security
            layers can be added in later phases.
          </p>
        </div>

        <div className="grid gap-4">
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    Portal Preferences
                  </h3>
                  <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                    Planned
                  </span>
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                  Future options can include planning defaults, workflow
                  preferences, and personalized portal behaviors.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-stone-900">
                    Security
                  </h3>
                  <span className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-700">
                    Planned
                  </span>
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
                  Password updates, session visibility, and stronger account
                  controls can be added after broader auth hardening.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}