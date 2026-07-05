import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",

  secondary:
    "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",

  ghost:
    "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center justify-center
        rounded-xl
        px-6 py-3
        font-medium
        transition-all
        duration-300
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;