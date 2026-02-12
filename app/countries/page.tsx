import Link from "next/link";

type CountryCard = {
  name: string;
  status: "Live dossier" | "Dossier in preparation";
  href?: string;
  note: string;
};

const countries: CountryCard[] = [
  {
    name: "Spain",
    status: "Live dossier",
    href: "/countries/spain",
    note: "Permissive legal framework + world-class clinical standards — best for specific patient profiles.",
  },
  {
    name: "Greece",
    status: "Dossier in preparation",
    note: "Strong donor frameworks and competitive cost structures — often a top alternative within the EU.",
  },
  {
    name: "Czech Republic",
    status: "Dossier in preparation",
    note: "A high value destination with established clinics — ideal when budgets matter without compromising standards.",
  },
  {
    name: "Portugal",
    status: "Dossier in preparation",
    note: "Modern frameworks and growing cross-border demand — best evaluated with careful strategy mapping.",
  },
  {
    name: "Mexico",
    status: "Dossier in preparation",
    note: "Proximity advantages for North America + varied clinic models — requires strong curation and planning.",
  },
  {
    name: "United States",
    status: "Dossier in preparation",
    note: "Top-tier outcomes and options — higher costs make strategic selection and pathway design essential.",
  },
];

export default function CountriesIndexPage() {
  return (
    <main
      className="max-w-6xl mx-auto px-6 py-14"
      style={{ fontFamily: "Georgia, serif" }}
    >
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl tracking-wide">
          Global Fertility Destinations
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed">
          Explore structured strategic fertility intelligence by country — curated as
          private advisory dossiers, not a database.
        </p>
      </section>

      {/* Grid */}
      <section className="grid gap-6 md:grid-cols-2">
        {countries.map((c) => {
          const isLive = c.status === "Live dossier" && c.href;

          return (
            <div
              key={c.name}
              className="rounded-2xl border border-[#E5DDC8] bg-[#FBF7EC] p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl tracking-wide">{c.name}</h2>
                  <p className="mt-2 text-sm text-[#5A5A5A] leading-relaxed">
                    {c.note}
                  </p>
                </div>

                <span
                  className="text-xs tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{
                    borderColor: isLive ? "#B89B5E" : "#D7C9A6",
                    color: isLive ? "#7A5C1F" : "#7A6A3A",
                    background: "#FFFDF7",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.status}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {isLive ? (
                  <Link
                    href={c.href!}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm tracking-wide"
                    style={{
                      background: "#B89B5E",
                      color: "#fff",
                    }}
                  >
                    View dossier →
                  </Link>
                ) : (
                  <span
                    className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm tracking-wide border border-[#D7C9A6] text-[#6A5A2A] bg-[#FFFDF7]"
                  >
                    Dossier in preparation
                  </span>
                )}

                <Link
                  href="/consultation#request"
                  className="text-sm tracking-wide underline underline-offset-4 text-[#6A5A2A]"
                >
                  Request advisory consultation
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
