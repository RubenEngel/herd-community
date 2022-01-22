import { Transition, Variants } from "framer-motion";

export const menuVariants: Variants = {
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "-100%" },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const itemVariants: Variants = {
  hidden: {
    // y: -10,
    // opacity: 0,
  },
  show: {
    // y: 0,
    // opacity: 1,
  },
};

export const transition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};
