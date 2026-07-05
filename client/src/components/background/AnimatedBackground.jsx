import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Aurora */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -60, 30, 0],
          y: [0, 60, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-40 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-sky-500/10 blur-[120px]"
      />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),
          linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]
          bg-[size:48px_48px]
          opacity-[0.06]
        "
      />

      {/* Radial Fade */}
      <div className="absolute inset-0 bg-radial-[at_center] from-transparent via-background/20 to-background" />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
        }}
      />
    </div>
  );
}