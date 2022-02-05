import { motion } from "framer-motion";
import React from "react";

const PageTransition: React.FC = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
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
