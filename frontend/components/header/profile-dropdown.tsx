import React, { useContext } from "react";
import { UserContext, SignInContext } from "../../lib/context";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";
// import firebase from "../../lib/firebase";

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

function ProfileDropdown({ setIsOpen }) {
  const { userAuth, userData } = useContext(UserContext);
  const setShowSignIn = useContext(SignInContext);

  return (
    <>
      <motion.div
        className={
          "bg-primary absolute w-screen right-0 -z-10 overflow-hidden mt-2"
        }
        variants={menuVariants}
        animate="show"
        initial="hidden"
        exit="exit"
        transition={transition}
      >
        <motion.nav
          className={"text-white p-3 text-right -z-10 max-w-6xl m-auto"}
          animate="show"
          initial="hidden"
          transition={{
            ...transition,
            staggerChildren: 0.1,
            delayChildren: 0.1,
          }}
        >
          <ul>
            {!userAuth && (
              <NavItem
                variants={itemVariants}
                onClick={() => {
                  setIsOpen(false);
                  setShowSignIn(true);
                }}
              >
                Sign In
              </NavItem>
            )}
            {userAuth && (
              <>
                {userData?.role.toString() === "ADMIN" && (
                  <NavItem
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link scroll={false} href="/admin">
                      Admin
                    </Link>
                  </NavItem>
                )}
                {userData && (
                  <NavItem
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      scroll={false}
                      href={{
                        pathname: "/users/[username]",
                        query: { username: userData.username },
                      }}
                    >
                      Profile
                    </Link>
                  </NavItem>
                )}
                <NavItem
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                >
                  <Link scroll={false} href="/my-account">
                    Account
                  </Link>
                </NavItem>
              </>
            )}
          </ul>
        </motion.nav>
      </motion.div>
    </>
  );
}

export default ProfileDropdown;
