import React from "react";
import { motion, Variants } from "framer-motion";

const Loading = ({ fontSize = "text-2xl" }) => {
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
    <div className={`text-primary text-center ${fontSize} flex justify-center`}>
      {brand.split("").map((letter, i) => (
        <motion.h1
          key={i}
          variants={variants}
          animate="up"
          initial="down"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * staggerTime,
            duration: brand.length * staggerTime,
          }}
        >
          {letter}
        </motion.h1>
      ))}
    </div>
  );
};

export default Loading;
