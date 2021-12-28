import React, { Dispatch, SetStateAction, useContext } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SignInContext, UserContext } from "../../lib/context";
import router from "next/router";
import toast from "react-hot-toast";
import NavItem from "../nav-item";

const menuVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

const MenuDropdown: React.FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsOpen, isOpen }) => {
  const setShowSignIn = useContext(SignInContext);

  const { userAuth } = useContext(UserContext);

  return (
    <motion.div
      className={
        " bg-primary opacity-75 w-screen left-0 -z-10 overflow-hidden mt-2 " +
        (isOpen ? "absolute" : "hidden")
      }
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={transition}
    >
      <motion.nav
        className={"text-white p-3 -z-10 max-w-6xl m-auto"}
        animate={isOpen ? "open" : "closed"}
        transition={transition}
      >
        <ul>
          <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/home">Home</Link>
          </NavItem>
          <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/about-us">About Us</Link>
          </NavItem>
          {/* <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/search">Search</Link>
          </NavItem> */}
          <NavItem onClick={() => setIsOpen(false)}>
            <Link href="/explore">Explore</Link>
          </NavItem>
          <NavItem
            onClick={() => {
              // if (!userAuth) {
              //   setShowSignIn(true);
              // } else {
              //   router.push("/edit-post");
              // }
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
