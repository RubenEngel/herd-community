import { motion } from "framer-motion";
import React from "react";
import Loading from "./loading";

const PageLoading = () => {
  return (
    <motion.div
      key={"loading"}
      initial={{ opacity: 0, y: 50, scale: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 50,
        scale: 0,
      }}
      className="h-50-screen flex flex-col justify-center items-center text-3xl md:text-5xl"
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.2,
      }}
    >
      <Loading />
    </motion.div>
  );
};

export default PageLoading;
