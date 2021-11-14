import React, {useContext} from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {SignInContext, UserContext} from "../../lib/context"
import router from "next/router";
import toast from "react-hot-toast";

const menuVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

function MenuDropdown({ setIsOpen, isOpen }) {

  const setShowSignIn = useContext(SignInContext)

  const {userAuth} = useContext(UserContext)

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
        <li onClick={() => setIsOpen(false)} className="nav-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)} className="nav-item">
            <Link href="/about-us">
              <a>About Us</a>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link href='/search'>
                <a>Search</a>
            </Link>
          </li> */}
          <li onClick={() => setIsOpen(false)} className="nav-item">
            <Link href="/explore">
              <a>Explore</a>
            </Link>
          </li>
          <li onClick={() => {
            if (!userAuth) {
              setShowSignIn(true)
            } else {
              router.push("/edit-post")
            }
            setIsOpen(false)}
            } className="nav-item">
              <button className="uppercase font-bold">Submit an Article</button>
          </li>

        </ul>
      </motion.nav>
    </motion.div>
  );
}

export default MenuDropdown;
