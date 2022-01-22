import React, { useContext } from "react";
import { UserContext } from "../context/auth-provider";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";
import {
  menuVariants,
  transition,
  itemVariants,
} from "../../lib/dropdown-variants";
import { SignInContext } from "../context/auth-provider";

const ProfileDropdown = ({ setIsOpen }) => {
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
            staggerChildren: 0.02,
            delayChildren: 0.05,
          }}
        >
          <ul>
            {!userAuth ? (
              <NavItem
                variants={itemVariants}
                onClick={() => {
                  setIsOpen(false);
                  setShowSignIn(true);
                }}
              >
                Sign In
              </NavItem>
            ) : (
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
};

export default ProfileDropdown;
