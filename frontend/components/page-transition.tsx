import { motion } from "framer-motion";
import React from "react";

const PageTransition: React.FC = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      // exit={{
      //   opacity: 0,
      //   transition: {
      //     duration: 0.1,
      //     ease: "easeInOut",
      //     // type: "linear",
      //   },
      // }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
        type: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
