"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { 
  Shield, 
  User, 
  Mail, 
  Calendar, 
  CheckCircle2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Save,
  Globe,
  Bell,
  FileText,
  Clock,
  Sparkles
} from "lucide-react";

export const runtime = "edge";

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string | null;
};

type PrivacySetting = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

function isMissingSessionError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "AuthSessionMissingError" ||
      error.message.toLowerCase().includes("auth session missing"))
  );
}

// Privacy settings configuration
const DEFAULT_PRIVACY_SETTINGS: PrivacySetting[] = [
  {
    id: "document_encryption",
    label: "Document Encryption",
    description: "All uploaded files are encrypted at rest",
    enabled: true
  },
  {
    id: "advisory_confidentiality",
    label: "Advisory Confidentiality",
    description: "Restrict advisory notes to authorized consultants only",
    enabled: true
  },
  {
    id: "timeline_sharing",
    label: "Timeline Sharing",
    description: "Allow timeline visibility for coordination purposes",
    enabled: false
  }
];

// Section card component
function SectionCard({ 
  title, 
  description, 
  icon: Icon,
  children 
}: { 
  title: string; 
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-stone-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
          <p className="mt-1 text-sm text-stone-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// Toggle switch component
function ToggleSwitch({ 
  enabled, 
  onChange,
  disabled = false
}: { 
  enabled: boolean; 
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-stone-900" : "bg-stone-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// Trust badge component
function TrustBadge({ 
  icon: Icon, 
  label, 
  variant = "default" 
}: { 
  icon: React.ElementType; 
  label: string;
  variant?: "default" | "success" | "warning";
}) {
  const variants = {
    default: "bg-stone-100 text-stone-700 border-stone-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${variants[variant]}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
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
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>(DEFAULT_PRIVACY_SETTINGS);
  const [showEmail, setShowEmail] = useState(false);

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

        if (error) throw error;

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

        if (!isMounted) return;

        setProfile(nextProfile);
        setFullName(nextProfile.full_name ?? "");
      } catch (error: unknown) {
        console.error(error);
        if (isMounted) {
          setIsError(true);
          setMessage("Failed to load your account information.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    void loadProfile();
    return () => { isMounted = false; };
  }, []);

  async function handleSaveProfile() {
    try {
      setSaving(true);
      setMessage(null);
      setIsError(false);

      const supabase = getSupabaseBrowserClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

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

      if (error) throw error;

      const updatedProfile: ProfileRow = {
        id: data.id as string,
        email: (data.email as string | null) ?? user.email ?? null,
        full_name: (data.full_name as string | null) ?? null,
        created_at: (data.created_at as string | null) ?? null,
      };

      setProfile(updatedProfile);
      setFullName(updatedProfile.full_name ?? "");
      setHasUnsavedChanges(false);
      setMessage("Account information saved successfully.");
    } catch (error: unknown) {
      console.error(error);
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Failed to save account information.");
    } finally {
      setSaving(false);
    }
  }

  function togglePrivacySetting(id: string) {
    setPrivacySettings(current =>
      current.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  }

  const accountCreatedLabel = useMemo(() => {
    if (!profile?.created_at) return "Not available";
    return new Date(profile.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }, [profile?.created_at]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-600 rounded-full animate-spin mr-3"></div>
          <span className="text-stone-600">Loading account information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Executive Header */}
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">Trust Center</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Account &amp; Privacy
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
              Manage your workspace identity, privacy preferences, and trust settings. 
              Your fertility planning data is encrypted and accessible only to you and your authorized advisory team.
            </p>
          </div>
          <Link
            href="/portal"
            className="group inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-600 transition hover:border-stone-400 hover:text-stone-900 hover:bg-stone-50"
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Trust Indicators */}
      <section className="flex flex-wrap gap-3">
        <TrustBadge icon={Lock} label="End-to-end encryption" variant="success" />
        <TrustBadge icon={Shield} label="Privacy certified" variant="success" />
        <TrustBadge icon={EyeOff} label="No third-party sharing" variant="default" />
      </section>

      {/* Account Overview */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-stone-400" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-stone-400 uppercase">Display Name</span>
          </div>
          <p className="text-2xl font-semibold text-stone-900">
            {profile?.full_name?.trim() || "Not set"}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Used throughout your private workspace
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-stone-400" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-stone-400 uppercase">Account Email</span>
          </div>
          <p className="text-lg font-semibold text-stone-900 truncate">
            {showEmail ? profile?.email || "Not available" : "••••••••@••••.com"}
          </p>
          <button
            onClick={() => setShowEmail(!showEmail)}
            className="mt-2 text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1"
          >
            {showEmail ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showEmail ? "Hide email" : "Reveal email"}
          </button>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-stone-400" />
            <span className="text-[10px] font-bold tracking-[0.15em] text-stone-400 uppercase">Member Since</span>
          </div>
          <p className="text-lg font-semibold text-stone-900">
            {accountCreatedLabel}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Account created and verified
          </p>
        </div>
      </section>

      {/* Identity Section */}
      <SectionCard
        title="Workspace Identity"
        description="Your profile information used across the planning portal"
        icon={User}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Full Name
            </label>
            <input
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 focus:ring-4 focus:ring-stone-100 transition-all"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setHasUnsavedChanges(true);
                setMessage(null);
                setIsError(false);
              }}
              placeholder="Enter your full name"
            />
            <p className="mt-2 text-xs text-stone-500">
              This name appears in your advisory engagements and document vault
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">
              Email Address
            </label>
            <div className="relative">
              <input
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 pr-10"
                value={profile?.email || ""}
                disabled
                readOnly
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            </div>
            <p className="mt-2 text-xs text-stone-500">
              Email is managed through your secure authentication provider
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-stone-400" />
            <span className="text-sm text-stone-500">
              {hasUnsavedChanges ? "Unsaved changes" : "Profile up to date"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saving || !hasUnsavedChanges}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg shadow-stone-900/10"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : hasUnsavedChanges ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </>
            )}
          </button>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-xl ${isError ? "bg-rose-50 border border-rose-200" : "bg-emerald-50 border border-emerald-200"}`}>
            <p className={`text-sm ${isError ? "text-rose-700" : "text-emerald-700"}`}>
              {message}
            </p>
          </div>
        )}
      </SectionCard>

      {/* Privacy & Security Section */}
      <SectionCard
        title="Privacy & Security"
        description="Control how your fertility planning data is protected and shared"
        icon={Shield}
      >
        <div className="space-y-4">
          {privacySettings.map((setting) => (
            <div
              key={setting.id}
              className="flex items-start justify-between p-4 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-stone-900">{setting.label}</h3>
                  {setting.enabled && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-stone-500">{setting.description}</p>
              </div>
              <ToggleSwitch
                enabled={setting.enabled}
                onChange={() => togglePrivacySetting(setting.id)}
                disabled={setting.id === "document_encryption"} // Always enabled
              />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-stone-700">Privacy Commitment</p>
              <p className="text-sm text-stone-500 mt-1">
                FertilityCareHub never sells your data. Your planning information is used solely 
                to provide advisory services and is retained according to your jurisdiction&apos;s 
                medical privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Product Preferences Section */}
      <SectionCard
        title="Workspace Preferences"
        description="Customize your fertility planning workspace experience"
        icon={Sparkles}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-5 h-5 text-stone-400" />
              <h3 className="text-sm font-semibold text-stone-900">Currency Display</h3>
            </div>
            <select className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-400">
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
              <option value="CAD">CAD — Canadian Dollar</option>
              <option value="AUD">AUD — Australian Dollar</option>
            </select>
            <p className="mt-2 text-xs text-stone-500">
              Preferred currency for cost estimates and budget planning
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-5 h-5 text-stone-400" />
              <h3 className="text-sm font-semibold text-stone-900">Planning Reminders</h3>
            </div>
            <select className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-400">
              <option value="weekly">Weekly summary</option>
              <option value="milestone">Milestone only</option>
              <option value="none">No reminders</option>
            </select>
            <p className="mt-2 text-xs text-stone-500">
              How often you&apos;d like to receive planning progress updates
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-stone-400" />
              <h3 className="text-sm font-semibold text-stone-900">Document Organization</h3>
            </div>
            <select className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-400">
              <option value="category">Group by category</option>
              <option value="date">Sort by date</option>
              <option value="status">Sort by status</option>
            </select>
            <p className="mt-2 text-xs text-stone-500">
              Default view for your document vault
            </p>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-stone-400" />
              <h3 className="text-sm font-semibold text-stone-900">Timeline Display</h3>
            </div>
            <select className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-400">
              <option value="compact">Compact view</option>
              <option value="detailed">Detailed view</option>
              <option value="calendar">Calendar view</option>
            </select>
            <p className="mt-2 text-xs text-stone-500">
              How your treatment timeline is displayed
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-6 border-t border-stone-100">
          <p className="text-sm text-stone-500">
            Preferences are saved automatically to your workspace
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Saved
          </span>
        </div>
      </SectionCard>

      {/* Session Information */}
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5 text-stone-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-stone-900">Session Security</h3>
            <p className="text-sm text-stone-500 mt-1">
              Your session is active and secure. For security purposes, you will be 
              automatically signed out after periods of inactivity.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-stone-400">
              <span>Session ID: ••••{profile?.id.slice(-8)}</span>
              <span>•</span>
              <span>Encrypted connection</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}