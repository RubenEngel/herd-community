import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect } from "react";

const Intro = ({
  setFirstLoad,
}: {
  setFirstLoad?: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    setTimeout(() => {
      if (setFirstLoad) setFirstLoad(false);
    }, 800);
  }, []);

  return (
    <motion.div
      exit={{ scale: 0 }}
      initial={false}
      className="h-75-screen flex w-screen flex-col items-center justify-center"
    >
      <motion.h1
        initial={{ y: 100, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="flex text-7xl"
      >
        {"HERD.".split("").map((letter, index) => (
          <motion.div
            key={index}
            initial={{ y: 100, scale: 0, opacity: 0 }}
            animate={{
              y: 0,
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.15 * index,
              type: "spring",
              duration: 0.4,
            }}
            className="mx-1"
          >
            <span>{letter}</span>
          </motion.div>
        ))}
      </motion.h1>
      <motion.div
        initial={{ y: 100, x: 0, scale: 0 }}
        animate={{
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            type: "spring",
            delay: 0.6,
            duration: 0.7,
          },
        }}
        transition={{ type: "spring" }}
      ></motion.div>
    </motion.div>
  );
};

export default Intro;
