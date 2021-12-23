import React, { useContext } from "react";
import { UserContext, SignInContext } from "../../lib/context";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";
// import firebase from "../../lib/firebase";

const menuVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

function ProfileDropdown({ setIsOpen, isOpen }) {
  const { userAuth, userData } = useContext(UserContext);
  const setShowSignIn = useContext(SignInContext);

  return (
    <>
      <motion.div
        className={
          "bg-primary w-screen right-0 -z-10 overflow-hidden mt-2" +
          (isOpen ? " absolute" : " hidden")
        }
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={transition}
      >
        <motion.nav
          className={"text-white p-3 text-right -z-10 max-w-6xl m-auto"}
          animate={isOpen ? "open" : "closed"}
          transition={transition}
        >
          <ul>
            {!userAuth && (
              <NavItem
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
                  <NavItem onClick={() => setIsOpen(false)}>
                    <Link scroll={false} href="/admin">
                      Admin
                    </Link>
                  </NavItem>
                )}
                <NavItem onClick={() => setIsOpen(false)}>
                  <Link scroll={false} href="/my-account">
                    Account
                  </Link>
                </NavItem>
                {/* <li
                  onClick={() => {
                    firebase.auth().signOut();
                    setIsOpen(false);
                  }}
                  className="nav-item cursor-pointer"
                >
                  Sign Out
                </li> */}
              </>
            )}
          </ul>
        </motion.nav>
      </motion.div>
    </>
  );
}

export default ProfileDropdown;
