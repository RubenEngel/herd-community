import { motion, PanInfo, Variants } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { BsArrowDown } from "react-icons/bs";
import AnimatedButton from "./animated-button";
// import {
//   disableBodyScroll,
//   // enableBodyScroll,
//   clearAllBodyScrollLocks,
// } from "body-scroll-lock";

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

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollY}px`;
    return () => {
      document.body.classList.remove("modal-open");
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <motion.div
      key={"modal-background"}
      className="bg-primary fixed left-0 bottom-0 z-20 flex h-screen w-screen items-center justify-center"
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
        className="h-content absolute bottom-0 w-full max-w-4xl justify-center rounded-t-3xl bg-white pb-12 text-center"
        variants={variants}
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        // ref={modalRef}
      >
        {/* Close button */}
        <AnimatedButton
          onClick={() => setModalOpen(false)}
          animateOpacity={1}
          className="relative bottom-3 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <BsArrowDown className="h-6 w-6" />
        </AnimatedButton>
        <h4 className="-m-3 mb-1">{title}</h4>
        <hr />
        <div className="mt-1 h-full overflow-auto px-3 text-left">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
