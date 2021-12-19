import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExploreContext } from "../../lib/context";

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
          {}
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">All</button>
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">Culture</button>
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">Sport</button>
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">Current Affairs</button>
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">Climate</button>
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              setCategory(e.currentTarget.textContent);
              setIsOpen(false);
            }}
          >
            <button className="uppercase">Lifestyle</button>
          </li>
        </ul>
      </motion.nav>
    </motion.div>
  );
}

export default CategoryDropdown;
