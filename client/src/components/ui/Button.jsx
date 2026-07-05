import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white",

  secondary:
    "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",

  ghost:
    "hover:bg-gray-100 dark:hover:bg-gray-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`rounded-xl px-6 py-3 font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;