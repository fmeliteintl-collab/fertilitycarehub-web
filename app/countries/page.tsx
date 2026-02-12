export default function CountriesPage() {
  const countries = [
    {
      name: "Spain",
      href: "/countries/spain",
      summary:
        "Permissive legal framework, high clinical standards, and strong donor availability—ideal for many international profiles.",
      tag: "Featured dossier",
    },
    // Add more countries here later
    // { name: "Greece", href: "/countries/greece", summary: "...", tag: "Next" },
  ];

  return (
    <main style={{ background: "#ffffff" }}>
      {/* Header */}
      <section
        style={{
          padding: "72px 20px 28px",
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "44px",
            lineHeight: 1.1,
            margin: 0,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          Global Fertility Destinations
        </h1>
        <p
          style={{
            margin: "14px auto 0",
            maxWidth: "720px",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "#444",
          }}
        >
          Explore structured strategic fertility intelligence by country — curated
          as private advisory dossiers (not an overwhelming database).
        </p>
      </section>

      {/* List */}
      <section
        style={{
          padding: "24px 20px 80px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {countries.map((c) => (
            <a
              key={c.href}
              href={c.href}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #e6e6e6",
                borderRadius: "14px",
                padding: "18px 18px 16px",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <h2
                  style={{
                    fontSize: "22px",
                    margin: 0,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.name}
                </h2>

                <span
                  style={{
                    fontSize: "12px",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    border: "1px solid #d9d2c3",
                    background: "#f7f3ea",
                    color: "#5a4b2b",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.tag}
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "14.5px",
                  lineHeight: 1.6,
                  color: "#4b4b4b",
                }}
              >
                {c.summary}
              </p>

              <div style={{ marginTop: "14px" }}>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#111",
                  }}
                >
                  View dossier →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
