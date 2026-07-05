import { motion } from "framer-motion";

const FloatingCard = ({ title, subtitle, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-xl backdrop-blur-xl dark:bg-white/5"
    >
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-3 font-semibold">
        {title}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </motion.div>
  );
};

export default FloatingCard;