import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";
import React from "react";

const Button = (props) => {
  return (
    <motion.button
      {...props}
      className={`${props.className} text-md text-secondary py-1 px-3 rounded-md m-2 focused:outline-none uppercase`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.03 }}
    >
      {props.children}
    </motion.button>
  );
};

export default Button;
