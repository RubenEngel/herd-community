import React, { Dispatch, SetStateAction, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";

const menuVariants = {
  show: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: "-100%" },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
};

const MenuDropdown: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  return (
    <motion.div
      className={
        " bg-primary absolute opacity-75 w-screen left-0 -z-10 overflow-hidden mt-2 "
      }
      variants={menuVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={transition}
    >
      <motion.nav
        className={"text-white p-3 -z-10 max-w-6xl m-auto"}
        // variants={menuVariants}
        animate="show"
        initial="hidden"
        transition={{ ...transition, staggerChildren: 0.1, delayChildren: 0.1 }}
      >
        <ul>
          <NavItem variants={itemVariants} onClick={() => setIsOpen(false)}>
            <Link href="/home">Home</Link>
          </NavItem>
          <NavItem variants={itemVariants} onClick={() => setIsOpen(false)}>
            <Link href="/about-us">About Us</Link>
          </NavItem>
          {/* <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/search">Search</Link>
          </NavItem> */}
          <NavItem variants={itemVariants} onClick={() => setIsOpen(false)}>
            <Link href="/explore">Explore</Link>
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Link href="/edit-post">Submit an Article</Link>
          </NavItem>
        </ul>
      </motion.nav>
    </motion.div>
  );
};

export default MenuDropdown;
