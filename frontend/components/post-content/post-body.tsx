import { motion, Transition, Variants } from "framer-motion";
import styles from "./post-body.module.css";

export default function PostBody({ content }) {
  const variants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
  };

  const transition: Transition = {
    type: "bounce",
    duration: 0.4,
    bounce: 0,
  };

  return (
    <motion.div
      variants={variants}
      transition={{ ...transition, delay: 0.6 }}
      initial="hidden"
      animate="show"
      className="max-w-2xl container mx-auto my-6 px-6"
    >
      <div
        className={`${styles.content} ck-content`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}
