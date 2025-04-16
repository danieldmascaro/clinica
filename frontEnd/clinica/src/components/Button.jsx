import { motion } from "framer-motion";

const VARIANT_CLASSES = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-black",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
};

const SIZE_CLASSES = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-6 text-base",
  lg: "py-3 px-8 text-lg",
};

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  loading = false,
  icon = null,
  children,
  className = "",
  ...props
}) => {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled}
      aria-busy={loading}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-md font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <>
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
