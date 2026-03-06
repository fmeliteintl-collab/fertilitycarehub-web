"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ConsultationRow = {
  id: string;
  created_at?: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  optimizing_for?: string[] | null;
  message?: string | null;
  source_country_slug?: string | null;
  source_url?: string | null;
  status?: string | null;
};

const STATUS_OPTIONS = ["new", "reviewing", "scheduled", "closed"] as const;

function formatDate(s?: string) {
  if (!s) return "";
  try {
    const d = new Date(s);
    return d.toLocaleString();
  } catch {
    return s;
  }
}

export default function AdminConsultationsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ConsultationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [query, setQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const fetchRows = useCallback(async () => {
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/consultations", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        setIsAuthenticated(false);
        router.push("/admin/login");
        return;
      }

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(json?.error || `Request failed (${res.status})`);
        setRows([]);
        setIsAuthenticated(false);
        return;
      }

      setRows(Array.isArray(json?.data) ? json.data : []);
      setIsAuthenticated(true);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Failed to fetch consultations.";
      setErr(message);
      setRows([]);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const blob = [
        r.name,
        r.email,
        r.phone,
        r.country,
        r.message,
        r.source_country_slug,
        r.source_url,
        (r.optimizing_for || []).join(", "),
        r.status,
        r.id,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [rows, query]);

  async function updateStatus(id: string, status: string) {
    setErr("");

    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (res.status === 401 || res.status === 403) {
        router.push("/admin/login");
        return;
      }

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(json?.error || `PATCH failed (${res.status})`);
        await fetchRows();
        return;
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update status.";
      setErr(message);
      await fetchRows();
    }
  }

  if (loading && isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-[#6A6256]">Checking authentication...</div>
      </main>
    );
  }

  if (isAuthenticated === false && !loading) {
    return (
      <main className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-[#6A6256]">Redirecting to login...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Admin · Consultation Requests
            </h1>
            <p className="text-sm text-[#6A6256] mt-2">
              Secure viewer for <code>consultation_requests</code>. Access is
              protected by an HttpOnly session cookie.
            </p>

            <div className="mt-3">
              <Link
                href="/"
                className="text-sm underline text-[#6A6256] hover:text-[#1A1A1A]"
              >
                ← Back to home
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-[#E6DDCD] bg-white/60 p-4">
            <div className="text-sm font-medium">Session</div>
            <p className="text-xs text-[#6A6256] mt-1">
              You&apos;re authenticated via secure cookie. If you lose access, return to{" "}
              <Link href="/admin/login" className="underline hover:opacity-80">
                /admin/login
              </Link>
              .
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => fetchRows()}
                className="w-full rounded-xl border border-[#1A1A1A] px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Load / Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="w-full max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name/email/country/status…"
              className="w-full rounded-xl border border-[#E6DDCD] bg-white/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D7C8AF]"
            />
          </div>

          <div className="text-sm text-[#6A6256]">
            {loading ? "Loading…" : `${filtered.length} result(s)`}
          </div>
        </div>

        {!!err && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {err}
          </div>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-[#E6DDCD] bg-white/60">
          <table className="w-full text-sm">
            <thead className="bg-white/60">
              <tr className="text-left">
                <th className="p-3">Created</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Country</th>
                <th className="p-3">Optimizing for</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-[#EFE6D8] align-top">
                  <td className="p-3 whitespace-nowrap text-[#6A6256]">
                    <div>{formatDate(r.created_at)}</div>
                    <div className="text-[11px] mt-1">
                      <span className="text-[#6A6256]">ID:</span>{" "}
                      <code className="text-[#1A1A1A]">{r.id}</code>
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="font-medium">{r.name || "—"}</div>
                    {r.phone && (
                      <div className="text-[#6A6256] text-xs mt-1">
                        {r.phone}
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    {r.email ? (
                      <a
                        className="underline hover:opacity-80"
                        href={`mailto:${r.email}`}
                      >
                        {r.email}
                      </a>
                    ) : (
                      "—"
                    )}
                    {r.source_country_slug && (
                      <div className="text-xs text-[#6A6256] mt-2">
                        from: <code>{r.source_country_slug}</code>
                      </div>
                    )}
                    {r.source_url && (
                      <div className="text-xs mt-1">
                        <a
                          className="underline text-[#6A6256] hover:text-[#1A1A1A]"
                          href={r.source_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          source url
                        </a>
                      </div>
                    )}
                  </td>

                  <td className="p-3">{r.country || "—"}</td>

                  <td className="p-3">
                    {(r.optimizing_for || []).length ? (
                      <div className="flex flex-wrap gap-2">
                        {(r.optimizing_for || []).map((x) => (
                          <span
                            key={x}
                            className="rounded-full border border-[#E6DDCD] bg-white px-3 py-1 text-xs"
                          >
                            {x}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[#6A6256]">—</span>
                    )}

                    {r.message && (
                      <div className="mt-3 text-[#1A1A1A] whitespace-pre-wrap">
                        <div className="text-xs text-[#6A6256] mb-1">
                          Message
                        </div>
                        <div className="text-sm">{r.message}</div>
                      </div>
                    )}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <select
                      value={r.status || "new"}
                      onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-xl border border-[#E6DDCD] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D7C8AF]"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-[#6A6256]" colSpan={6}>
                    No rows yet. If you&apos;re logged in, rows should load automatically.
                    Otherwise go to <b>/admin/login</b>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-xs text-[#6A6256]">
          Tip: This admin area is protected by a secure HttpOnly cookie. Don&apos;t share your token.
        </div>
      </div>
    </main>
  );
}