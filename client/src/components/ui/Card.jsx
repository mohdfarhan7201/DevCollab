import { motion } from "framer-motion";

const Card = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/60
        p-6
        shadow-xl
        backdrop-blur-xl
        dark:bg-white/5
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;