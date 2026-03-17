"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ConsultationStatus = "new" | "reviewing" | "scheduled" | "closed";

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

const STATUS_OPTIONS: ConsultationStatus[] = [
  "new",
  "reviewing",
  "scheduled",
  "closed",
];

function formatDate(value?: string) {
  if (!value) return "—";

  try {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  } catch {
    return value;
  }
}

function getStatusClasses(status: string) {
  switch (status) {
    case "reviewing":
      return "border-[#D7C8AF] bg-[#F3EBDD] text-[#6A6256]";
    case "scheduled":
      return "border-[#C7D8C2] bg-[#EDF5EA] text-[#4E6B50]";
    case "closed":
      return "border-[#D8D8D8] bg-[#F3F3F3] text-[#5E5E5E]";
    case "new":
    default:
      return "border-[#E6DDCD] bg-white text-[#1A1A1A]";
  }
}

export default function AdminConsultationsPage() {
  const router = useRouter();

  const [rows, setRows] = useState<ConsultationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to fetch consultations.";
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
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) => {
      const haystack = [
        row.id,
        row.name,
        row.email,
        row.phone,
        row.country,
        row.message,
        row.source_country_slug,
        row.source_url,
        row.status,
        (row.optimizing_for || []).join(", "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [rows, query]);

  async function updateStatus(id: string, status: ConsultationStatus) {
    setErr("");
    setUpdatingId(id);

    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row))
    );

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
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update status.";
      setErr(message);
      await fetchRows();
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading && isAuthenticated === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <div className="text-[#6A6256]">Checking authentication...</div>
      </main>
    );
  }

  if (isAuthenticated === false && !loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F1E8]">
        <div className="text-[#6A6256]">Redirecting to login...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Admin · Consultation Requests
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6A6256]">
              Review incoming advisory requests, update status, and prepare the
              workflow that will later evolve into the client planning portal.
            </p>

            <div className="mt-3">
              <Link
                href="/"
                className="text-sm text-[#6A6256] underline hover:text-[#1A1A1A]"
              >
                ← Back to home
              </Link>
            </div>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-[#E6DDCD] bg-white/60 p-4">
            <div className="text-sm font-medium">Session</div>
            <p className="mt-1 text-xs text-[#6A6256]">
              You&apos;re authenticated via a secure cookie. If access expires,
              return to{" "}
              <Link
                href="/admin/login"
                className="underline transition hover:opacity-80"
              >
                /admin/login
              </Link>
              .
            </p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => void fetchRows()}
                className="w-full rounded-xl border border-[#1A1A1A] px-4 py-2 text-sm font-medium transition hover:bg-black/5"
              >
                {loading ? "Refreshing..." : "Load / Refresh"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, country, message, status..."
              className="w-full rounded-xl border border-[#E6DDCD] bg-white/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D7C8AF]"
            />
          </div>

          <div className="text-sm text-[#6A6256]">
            {loading ? "Loading..." : `${filtered.length} request(s)`}
          </div>
        </div>

        {!!err && (
          <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {err}
          </div>
        )}

        <div className="mt-6 space-y-4">
          {!loading && filtered.length === 0 && (
            <div className="rounded-2xl border border-[#E6DDCD] bg-white/60 p-6 text-sm text-[#6A6256]">
              No consultation requests found. If you expected results, refresh
              the page or confirm you&apos;re still authenticated at{" "}
              <span className="font-medium text-[#1A1A1A]">/admin/login</span>.
            </div>
          )}

          {filtered.map((row) => {
            const currentStatus: ConsultationStatus = STATUS_OPTIONS.includes(
              (row.status || "new") as ConsultationStatus
            )
              ? (row.status as ConsultationStatus)
              : "new";

            const isUpdating = updatingId === row.id;

            return (
              <article
                key={row.id}
                className="rounded-2xl border border-[#E6DDCD] bg-white/70 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-semibold">
                        {row.name || "Unnamed request"}
                      </h2>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                      {isUpdating && (
                        <span className="text-xs text-[#6A6256]">
                          Saving...
                        </span>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-[#6A6256]">
                      Submitted: {formatDate(row.created_at)}
                    </div>

                    <div className="mt-1 text-xs text-[#6A6256]">
                      ID: <code className="text-[#1A1A1A]">{row.id}</code>
                    </div>
                  </div>

                  <div className="w-full max-w-sm space-y-3">
                    <div>
                      <label
                        htmlFor={`status-${row.id}`}
                        className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#6A6256]"
                      >
                        Update status
                      </label>
                      <select
                        id={`status-${row.id}`}
                        value={currentStatus}
                        onChange={(e) =>
                          void updateStatus(
                            row.id,
                            e.target.value as ConsultationStatus
                          )
                        }
                        disabled={isUpdating}
                        className="w-full rounded-xl border border-[#E6DDCD] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D7C8AF] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((status) => {
                        const isActive = currentStatus === status;

                        return (
                          <button
                            key={status}
                            type="button"
                            disabled={isUpdating || isActive}
                            onClick={() => void updateStatus(row.id, status)}
                            className={`rounded-full border px-3 py-1 text-xs capitalize transition ${
                              isActive
                                ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                                : "border-[#E6DDCD] bg-white text-[#1A1A1A] hover:bg-black/5"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <section className="rounded-xl border border-[#EDE4D4] bg-[#FCFAF6] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6A6256]">
                      Requester
                    </h3>

                    <div className="mt-3 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email: </span>
                        {row.email ? (
                          <a
                            href={`mailto:${row.email}`}
                            className="underline hover:opacity-80"
                          >
                            {row.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>

                      <div>
                        <span className="font-medium">Phone: </span>
                        {row.phone || "—"}
                      </div>

                      <div>
                        <span className="font-medium">Country: </span>
                        {row.country || "—"}
                      </div>
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#EDE4D4] bg-[#FCFAF6] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6A6256]">
                      Request details
                    </h3>

                    <div className="mt-3">
                      {(row.optimizing_for || []).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {(row.optimizing_for || []).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-[#E6DDCD] bg-white px-3 py-1 text-xs"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-[#6A6256]">
                          No optimization preferences submitted.
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <section className="rounded-xl border border-[#EDE4D4] bg-[#FCFAF6] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6A6256]">
                      Message
                    </h3>

                    <div className="mt-3 whitespace-pre-wrap text-sm leading-6">
                      {row.message || (
                        <span className="text-[#6A6256]">
                          No message provided.
                        </span>
                      )}
                    </div>
                  </section>

                  <section className="rounded-xl border border-[#EDE4D4] bg-[#FCFAF6] p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-[#6A6256]">
                      Source context
                    </h3>

                    <div className="mt-3 space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Source country slug: </span>
                        {row.source_country_slug ? (
                          <code>{row.source_country_slug}</code>
                        ) : (
                          "—"
                        )}
                      </div>

                      <div>
                        <span className="font-medium">Source URL: </span>
                        {row.source_url ? (
                          <a
                            href={row.source_url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:opacity-80"
                          >
                            Open source page
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>
                  </section>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 text-xs text-[#6A6256]">
          Tip: This admin area is protected by a secure HttpOnly cookie.
          Don&apos;t share your admin token.
        </div>
      </div>
    </main>
  );
}