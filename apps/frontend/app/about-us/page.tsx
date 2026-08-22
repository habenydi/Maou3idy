"use client";
import Navbar from "@/components/Navbar";

const values = [
  {
    label: "Trust",
    accent: "indigo",
    title: "Verified providers you can rely on",
    body: "Every specialist on the platform is credentialed and re-checked, so the person you book is exactly who they say they are.",
  },
  {
    label: "Access",
    accent: "brass",
    title: "Care within reach, wherever you are",
    body: "Appointments, records, and follow-ups live in one place, so getting care doesn't depend on where you happen to live.",
  },
  {
    label: "Transparency",
    accent: "indigo",
    title: "Clear information, no surprises",
    body: "Availability, pricing, and provider background are shown up front — never buried behind a call or a form.",
  },
  {
    label: "Compassion",
    accent: "brass",
    title: "Every patient treated with dignity",
    body: "The platform is built around the person seeking care first, and the paperwork second.",
  },
  {
    label: "Privacy",
    accent: "indigo",
    title: "Your health data stays yours",
    body: "Records are encrypted end to end and never shared or sold without explicit, revocable consent.",
  },
  {
    label: "Quality",
    accent: "brass",
    title: "Only credentialed specialists, vetted rigorously",
    body: "Providers are reviewed against licensing, outcomes, and patient feedback before they ever appear in a search.",
  },
];

const accentClasses = {
  indigo: "text-[#33437A]",
  brass: "text-[#8C6A3B]",
};

export default function AboutUs() {
  return (
    <div className="bg-surface text-on-surface">
      <Navbar activeLink="about" />
      <div className="bg-[#FAF9F5] text-[#16181C] min-h-screen px-7 lg:px-30 flex flex-col gap-20">
        {/* Nav */}
        {/* <header className="flex justify-between px-6 sm:px-10 py-6 pt-30">
          <span className="text-sm font-semibold tracking-tight text-black">
            Maou<span className="text-[#33437A]">3</span>idy
          </span>
          <button
            aria-label="Open menu"
            className="flex flex-col gap-[5px] w-5"
          >
            <span className="block h-px w-full bg-[#16181C]" />
            <span className="block h-px w-full bg-[#16181C]" />
          </button>
        </header> */}

        {/* Hero */}
        <section className="pt-30">
          <p className="font-manrope text-2xl text-blue-300">Who we are</p>
          <div className="flex flex-col gap-1 mt-6 max-w-3xl">
            <h1 className="font-manrope text-[2rem] sm:text-[2.75rem] leading-[1.15] tracking-tight max-w-3xl">
              We're building a more direct path between patients and the care
              they can trust.
            </h1>
            <p className="mt-8 max-w-xl text-[#63666D] leading-relaxed">
              Maou3idy connects patients with top-rated doctors and specialists
              across every field of medicine, so finding and booking the right
              care is as simple as it should have always been.
            </p>
          </div>
        </section>

        {/* How we're different */}
        <section>
          <div className="flex gap-10">
            <h2 className="font-manrope text-2xl  text-slate-900">
              How we're different
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12 border-t border-[#E4E1D8] pt-10">
              {values.map((v) => (
                <div key={v.label} className="pr-4">
                  <p
                    className={`text-[11px] font-medium tracking-[0.14em] uppercase mb-3 ${accentClasses[v.accent]}`}
                  >
                    {v.label}
                  </p>
                  <h3 className="text-[15px] font-semibold leading-snug mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#63666D] leading-relaxed">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-screen-xl  px-6 sm:px-1 border-t border-[#E4E1D8] pt-16">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-x-10">
            <p className="text-xs tracking-[0.18em] uppercase text-[#63666D] mb-6 md:mb-0">
              Our mission
            </p>
            <p className="font-manrope text-xl sm:text-2xl leading-relaxed max-w-2xl">
              To improve healthcare accessibility and quality by connecting
              patients with qualified professionals — making the process of
              finding and booking care seamless, transparent, and human.
            </p>
          </div>
        </section>
      </div>{" "}
    </div>
  );
}
