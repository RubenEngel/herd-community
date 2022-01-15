import { motion } from "framer-motion";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { BsArrowUp } from "react-icons/bs";

const Intro: React.FC<{ setFirstLoad?: Dispatch<SetStateAction<boolean>> }> = ({
  setFirstLoad,
}) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (setFirstLoad) setFirstLoad(false);
      // if (router.route === "/") {
      //   router.push("/home");
      // }
    }, 800);
  }, []);

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
      >
        {/* <motion.button
          className="bg-primary mt-20 text-white px-4 py-2 rounded-full text-3xl shadow-lg"
          onClick={() => {
            setFirstLoad(false);
            if (router.route === "/") router.push("/home");
          }}
          whileHover={{ scale: 1.2, transition: { delay: 0 } }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <BsArrowUp />
          </motion.div>
        </motion.button> */}
      </motion.div>
    </motion.div>
  );
};

export default Intro;
