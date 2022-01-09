import { motion, PanInfo, Variants } from "framer-motion";
import React from "react";
import { BsArrowDown } from "react-icons/bs";
import AnimatedButton from "./animated-button";

const Modal = ({
  setModalOpen,
  children,
  title,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
}) => {
  const onDragEnd = (info: PanInfo) => {
    if (info.offset.y > 100) {
      setModalOpen(false);
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: 1000,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      key={"modal-background"}
      className="w-screen h-screen fixed left-0 bottom-0 bg-primary flex justify-center items-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      <motion.div
        key={"modal-content"}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={{ left: 0, right: 0, top: 0, bottom: 0.5 }}
        dragMomentum={false}
        onDragEnd={(_event, info) => onDragEnd(info)}
        className="bg-white w-full h-content rounded-t-3xl justify-center max-w-4xl text-center absolute bottom-0 overscroll-contain"
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        {/* Close button */}
        <AnimatedButton
          onClick={() => setModalOpen(false)}
          className="bg-white h-10 w-10 rounded-full flex justify-center items-center mx-auto relative bottom-3"
        >
          <BsArrowDown className="h-6 w-6" />
        </AnimatedButton>
        <h4 className="-m-3 mb-1">{title}</h4>
        <hr />
        <div className="h-full px-3 mt-1 overflow-auto text-left">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
