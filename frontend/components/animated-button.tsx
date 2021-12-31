import { motion } from "framer-motion";
import React from "react";

const AnimatedButton = (props) => {
  return (
    <motion.button
      {...props}
      className={`${props.className}`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", duration: 0.2, bounce: 0 }}
    >
      {props.children}
    </motion.button>
  );
};

export default AnimatedButton;
