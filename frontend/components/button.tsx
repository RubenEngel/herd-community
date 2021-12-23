import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import React from "react";

const AnimatedButton = (props) => {
  return (
    <motion.button
      {...props}
      className={`${props.className}`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.03 }}
    >
      {props.children}
    </motion.button>
  );
};

export default AnimatedButton;
