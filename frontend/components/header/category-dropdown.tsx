import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExploreContext } from "../../lib/context";
import NavItem from "../nav-item";

function CategoryDropdown({ isOpen, setIsOpen }) {
  const { setCategory } = useContext(ExploreContext);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  const navVariants = {
    open: { y: 0 },
    closed: { y: "-50%" },
  };

  const transition = {
    type: "spring",
    bounce: 0,
    duration: 0.4,
  };

  return (
    <motion.div
      className={
        "bg-primary w-screen left-0 -z-10 overflow-hidden mt-2" +
        (isOpen ? " absolute" : " hidden")
      }
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={transition}
    >
      <motion.nav
        className={"text-white p-3 -z-10 text-center"}
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
        transition={transition}
      >
        <ul>
          <NavItem
            onClick={() => {
              setCategory("all");
              setIsOpen(false);
            }}
          >
            All
          </NavItem>
          <NavItem
            onClick={() => {
              setCategory("culture");
              setIsOpen(false);
            }}
          >
            Culture
          </NavItem>
          <NavItem
            onClick={() => {
              setCategory("sport");
              setIsOpen(false);
            }}
          >
            Sport
          </NavItem>
          <NavItem
            onClick={() => {
              setCategory("Current Affairs");
              setIsOpen(false);
            }}
          >
            Current Affairs
          </NavItem>
          <NavItem
            onClick={() => {
              setCategory("Climate");
              setIsOpen(false);
            }}
          >
            Climate
          </NavItem>
          <NavItem
            onClick={() => {
              setCategory("Lifestyle");
              setIsOpen(false);
            }}
          >
            Lifestyle
          </NavItem>
        </ul>
      </motion.nav>
    </motion.div>
  );
}

export default CategoryDropdown;
