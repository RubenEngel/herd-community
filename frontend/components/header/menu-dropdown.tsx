import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";
import {
  menuVariants,
  transition,
  itemVariants,
} from "../../lib/dropdown-variants";

const MenuDropdown: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  return (
    <motion.div
      className={
        " bg-primary absolute left-0 -z-10 mt-2 w-screen overflow-hidden opacity-75 "
      }
      variants={menuVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={transition}
    >
      <motion.nav
        className={"-z-10 m-auto max-w-6xl p-3 text-white"}
        animate="show"
        initial="hidden"
        transition={{
          ...transition,
          staggerChildren: 0.02,
          delayChildren: 0.05,
        }}
      >
        <ul>
          <NavItem variants={itemVariants} onClick={() => setIsOpen(false)}>
            <Link href="/">Home</Link>
          </NavItem>
          <NavItem variants={itemVariants} onClick={() => setIsOpen(false)}>
            <Link href="/about-us">About Us</Link>
          </NavItem>
          <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/search">Search</Link>
          </NavItem>
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
