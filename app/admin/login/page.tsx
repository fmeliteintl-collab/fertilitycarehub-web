"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");

 async function saveToken() {
  const t = token.trim();
  if (!t) {
    setErr("Please paste your admin token.");
    return;
  }

  setErr("");

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token: t }),
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    setErr(json?.error || "Login failed.");
    return;
  }

  // IMPORTANT: remove legacy storage
  try {
    
  } catch {}

  router.push("/admin");
}

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "64px 20px" }}>
      <h1 style={{ fontSize: 28, margin: 0 }}>Admin Login</h1>
      <p style={{ marginTop: 12, color: "rgba(0,0,0,0.70)" }}>
        Paste your admin token to access the dashboard.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
       <input
  type="password"
  value={token}
  onChange={(e) => setToken(e.target.value)}
  placeholder="Paste admin token"
  style={{
    padding: "12px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(255,255,255,0.6)",
  }}
/>

        {err ? (
          <div style={{ color: "rgba(160,0,0,0.9)", fontSize: 14 }}>{err}</div>
        ) : null}

        <button
          type="button"
          onClick={saveToken}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            border: "1px solid #B89B5E",
            background: "rgba(184,155,94,0.10)",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}