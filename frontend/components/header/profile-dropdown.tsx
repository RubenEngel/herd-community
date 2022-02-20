import React, { useContext } from "react";
import { AuthContext } from "../context/auth-provider";
import { motion } from "framer-motion";
import Link from "next/link";
import NavItem from "../nav-item";
import {
  menuVariants,
  transition,
  itemVariants,
} from "../../lib/dropdown-variants";

const ProfileDropdown = ({ setIsOpen }) => {
  const { userAuth, userData, setShowSignIn } = useContext(AuthContext);

  return (
    <>
      <motion.div
        className={
          "bg-primary absolute right-0 -z-10 mt-2 w-screen overflow-hidden"
        }
        variants={menuVariants}
        animate="show"
        initial="hidden"
        exit="exit"
        transition={transition}
      >
        <motion.nav
          className={"-z-10 m-auto max-w-6xl p-3 text-right text-white"}
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
                    <Link scroll={false} href="/admin/posts">
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
                  <Link scroll={false} href="/drafts">
                    Drafts
                  </Link>
                </NavItem>
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
