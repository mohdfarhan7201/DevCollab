import { motion } from "framer-motion";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/60 p-6 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5 opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
          <Icon size={26} />
        </div>

        <h3 className="mb-3 text-xl font-semibold">
          {title}
        </h3>

        <p className="leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}