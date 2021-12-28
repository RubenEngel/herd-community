import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { BsArrowUp } from "react-icons/bs";

const Intro: React.FC<{ setFirstLoad?: Dispatch<SetStateAction<boolean>> }> = ({
  setFirstLoad,
}) => {
  const router = useRouter();

  return (
    <motion.div
      exit={{ scale: 0 }}
      className="w-screen h-75-screen flex flex-col justify-center items-center"
    >
      <motion.h1
        initial={{ y: 100, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="text-7xl flex"
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
              // ease: "easeInOut",
              type: "spring",
              // repeat: Infinity,
              // repeatType: "reverse",
              // duration: "HERD.".length * 0.2,
              duration: 0.3,
            }}
            className="mx-1"
          >
            <span>{letter}</span>
          </motion.div>
        ))}
      </motion.h1>
      <motion.button
        className="bg-primary mt-20 text-white px-4 py-2 rounded-full text-3xl shadow-lg"
        onClick={() => {
          setFirstLoad(false);
          if (router.route === "/") router.push("/home");
        }}
        initial={{ y: 100, x: 0, scale: 0 }}
        animate={{
          y: 0,
          x: 0,
          scale: 1,
          transition: {
            // y: { delay: 0.5 },
            // scale: { delay: 0.7 },
            type: "spring",
            delay: 0.6,
            duration: 0.7,
          },
        }}
        transition={{ type: "spring" }}
        drag
        whileHover={{ scale: 1.2, transition: { delay: 0 } }}
        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <BsArrowUp />
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default Intro;
