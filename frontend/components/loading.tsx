import React from "react";
import { motion, Variants } from "framer-motion";

const Loading = ({
  color = "primary",
}: {
  color?: "primary" | "secondary";
}) => {
  const brand = "HERD.";

  const variants: Variants = {
    up: {
      y: 5,
    },
    down: {
      y: -5,
    },
  };

  const staggerTime = 0.15;

  return (
    <div
      className={`${
        color === "primary" ? "text-primary" : "text-secondary"
      } text-center flex justify-center`}
    >
      {brand.split("").map((letter, i) => (
        <motion.span
          key={i}
          variants={variants}
          animate="up"
          initial="down"
          className=" font-serif font-bold" // text-3xl md:text-5xl
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * staggerTime,
            duration: brand.length * staggerTime,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default Loading;
