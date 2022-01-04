import { motion } from "framer-motion";
import React from "react";

type ButtonVariants =
  | "primary"
  | "primary-outline"
  | "green"
  | "green-outline"
  | "red"
  | "red-outline";

const AnimatedButton = ({
  children,
  variant,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}) => {
  const buttonBackground = () => {
    switch (variant) {
      case "primary":
        return "bg-primary text-secondary";
      case "red":
        return "bg-red-600 text-secondary";
      case "green":
        return "bg-green-600 text-secondary";
      case "primary-outline":
        return "border-primary border-2 text-primary";
      case "green-outline":
        return "border-green-600 border-2 text-green-600";
      case "red-outline":
        return "border-red-600 border-2 text-red-600";
    }
  };

  return (
    <motion.button
      className={`${className} ${buttonBackground()} ${
        variant &&
        "font-serif text-md rounded-lg px-6 py-1 hover:shadow-md transition-shadow duration-100"
      }`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", duration: 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
