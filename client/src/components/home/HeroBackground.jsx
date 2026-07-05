import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
      />
    </>
  );
};

export default HeroBackground;