import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CategoryContext } from "../context/category-provider";
import NavItem from "../nav-item";
import {
  menuVariants,
  transition,
  itemVariants,
} from "../../lib/dropdown-variants";

const CategoryDropdown = ({ setIsOpen }) => {
  const { setCategory } = useContext(CategoryContext);

  return (
    <motion.div
      className={
        "bg-primary absolute w-screen left-0 -z-10 overflow-hidden mt-2"
      }
      animate="show"
      initial="hidden"
      exit="exit"
      variants={menuVariants}
      transition={transition}
    >
      <motion.nav
        className={"text-white p-3 -z-10 text-center"}
        animate="show"
        initial="hidden"
        transition={{
          ...transition,
          staggerChildren: 0.02,
          delayChildren: 0.05,
        }}
      >
        <ul>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("all");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            All
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("culture");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Culture
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("sport");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Sport
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("Current Affairs");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Current Affairs
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("Climate");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Climate
          </NavItem>
          <NavItem
            variants={itemVariants}
            onClick={() => {
              setCategory("Lifestyle");
              setIsOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Lifestyle
          </NavItem>
        </ul>
      </motion.nav>
    </motion.div>
  );
};

export default CategoryDropdown;
