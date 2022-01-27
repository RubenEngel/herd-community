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
  disabled,
  animateScale = 0.98,
  animateOpacity = 0.9,
}: {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  animateScale?: number;
  animateOpacity?: number;
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
        return "border-primary border-2 text-primary leading-5";
      case "green-outline":
        return "border-green-600 border-2 text-green-600 leading-5";
      case "red-outline":
        return "border-red-600 border-2 text-red-600 leading-5";
    }
  };

  return (
    <motion.button
      disabled={disabled}
      className={`${className} disabled:opacity-30 ${buttonBackground()} ${
        variant &&
        "font-serif text-md rounded-lg px-6 py-1 hover:shadow-md transition-shadow duration-150"
      }`}
      whileTap={{ scale: animateScale, opacity: animateOpacity }} // scale: 0.98
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", duration: 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
