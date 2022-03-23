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
  tapScale = 0.96,
  hoverScale = 1.05,
}: {
  children: React.ReactNode;
  variant?: ButtonVariants;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  tapScale?: number;
  hoverScale?: number;
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
        "text-md rounded-lg px-6 py-1 font-serif transition-shadow duration-150 hover:shadow-md"
      }`}
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      transition={{ type: "spring", bounce: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
