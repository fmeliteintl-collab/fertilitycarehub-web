export default function Home() {
  return (
    <main style={{ 
      fontFamily: "Georgia, serif",
      backgroundColor: "#f8f6f2",
      color: "#2b2b2b",
      lineHeight: 1.6
    }}>
      
      {/* Hero Section */}
      <section style={{ 
        padding: "120px 20px",
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        <h1 style={{ 
          fontSize: "42px",
          fontWeight: 500,
          marginBottom: "20px"
        }}>
          Private Global Fertility Strategy Advisory.
          <br />
          Clarity Across Borders.
        </h1>

        <p style={{ 
          fontSize: "18px",
          color: "#5a5a5a",
          maxWidth: "600px",
          margin: "0 auto 40px"
        }}>
          Navigate IVF pathways, legal frameworks, international cost structures, and
          clinic standards with structured, confidential global guidance
        </p>

        <div>
          <button style={{
            padding: "12px 28px",
            backgroundColor: "#b8a77a",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            marginRight: "15px",
            cursor: "pointer"
          }}>
            Request Private Strategy Consultation
          </button>

          <button style={{
            padding: "12px 28px",
            backgroundColor: "transparent",
            border: "1px solid #b8a77a",
            color: "#b8a77a",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            Explore International Pathways
          </button>
        </div>
      </section>

      {/* Positioning Section */}
      <section style={{
        padding: "100px 20px",
        backgroundColor: "#ffffff",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
            High-Stakes Decisions Require Structured Guidance
          </h2>

          <p style={{ color: "#555" }}>
            Fertility treatment is one of the most emotionally and financially
            significant decisions a family makes. Legal environments differ.
            Donor anonymity policies vary. Cost structures lack transparency.
            We bring order to complexity through data-driven global analysis.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section style={{
        padding: "100px 20px",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "60px" }}>
            Our Advisory Framework
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "40px"
          }}>
            <div>
              <h3>Country Intelligence</h3>
              <p style={{ color: "#555" }}>
                Legal frameworks, cost bands, storage regulations,
                donor policies, and eligibility requirements.
              </p>
            </div>

            <div>
              <h3>Clinic Standards Insight</h3>
              <p style={{ color: "#555" }}>
                Accreditation clarity, lab standards, reporting methodology,
                and transparency benchmarks.
              </p>
            </div>

            <div>
              <h3>Strategic Fertility Advisory</h3>
              <p style={{ color: "#555" }}>
                Structured cross-border treatment planning for families
                navigating international fertility pathways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: "100px 20px",
        backgroundColor: "#2b2b2b",
        color: "#ffffff",
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ marginBottom: "20px" }}>
            Private Fertility Strategy Advisory
          </h2>

          <p style={{ marginBottom: "40px", color: "#d4d4d4" }}>
            For families requiring structured, confidential global fertility
            guidance across jurisdictions.
          </p>

          <button style={{
            padding: "14px 30px",
            backgroundColor: "#b8a77a",
            border: "none",
            color: "#ffffff",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
            Apply for Early Advisory Access
          </button>
        </div>
      </section>

    </main>
  );
}
