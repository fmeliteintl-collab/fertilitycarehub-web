export default function ConsultationPage() {
  return (
    <main
      className="max-w-4xl mx-auto px-6 py-16"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl tracking-wide">
          Private Global Fertility Strategy Advisory
        </h1>

        <p className="mt-6 text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
          Structured, confidential advisory for families navigating cross-border fertility
          decisions. We provide clarity before commitment.
        </p>
      </section>

      {/* Advisory Overview */}
      <section className="mb-20 text-[#3A3A3A] leading-relaxed space-y-6">
        <p>
          Our advisory is designed for families who require strategic clarity before
          selecting a country, clinic, or treatment pathway. We operate as a
          private intelligence layer — not a referral marketplace.
        </p>

        <p>
          Each engagement is structured around legal frameworks, clinic standards,
          donor policies, cost architecture, and long-term planning implications.
        </p>
      </section>

      {/* Request Section (THIS is the anchor) */}
      <section
        id="request"
        className="border border-[#E5DDC8] bg-[#FBF7EC] rounded-2xl p-10 text-center"
      >
        <h2 className="text-2xl tracking-wide mb-6">
          Request Advisory Consultation
        </h2>

        <p className="text-[#5A5A5A] max-w-xl mx-auto leading-relaxed mb-10">
          Begin with a confidential strategy discussion to determine the most
          appropriate jurisdiction and treatment structure for your profile.
        </p>

        <button
          className="px-8 py-3 rounded-lg tracking-wide text-sm"
          style={{
            background: "#B89B5E",
            color: "#ffffff",
          }}
        >
          Schedule Private Consultation
        </button>
      </section>
    </main>
  );
}
