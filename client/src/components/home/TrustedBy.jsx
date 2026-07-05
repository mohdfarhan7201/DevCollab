import Reveal from "../animations/Reveal";

const companies = [
  "GitHub",
  "Open Source",
  "React",
  "Node.js",
  "MongoDB",
  "Vercel",
];

export default function TrustedBy() {
  return (
    <section className="py-20">
      <Reveal>
        <p className="mb-12 text-center text-sm uppercase tracking-[0.35em] text-muted-foreground">
          Trusted by developers worldwide
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="
                rounded-2xl
                border
                border-border/60
                bg-background/40
                px-6
                py-5
                text-center
                font-semibold
                text-muted-foreground
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/30
                hover:text-foreground
                hover:shadow-lg
              "
            >
              {company}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}