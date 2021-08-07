import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../lib/firebase.tsx';

const menuVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '-100%' },
};

const navVariants = {
  // open: { x: 0 },
  // closed: { x: "100%" }
};

const transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
};

function ProfileDropdown({ isOpen }) {
  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <>
    <motion.div
      className={
        'bg-gray-800 w-screen right-0 -z-10 overflow-hidden' +
        (isOpen ? ' absolute' : ' hidden')
      }
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      transition={transition}
    >
      <motion.nav
        className={'text-white p-3 text-right -z-10 max-w-6xl m-auto'}
        animate={isOpen ? 'open' : 'closed'}
        variants={navVariants}
        transition={transition}
      >
        <ul>
          {!user && (
            <li className="nav-item">
              <Link href="/auth">
                <a>Sign In</a>
              </Link>
            </li>
          )}
          <li className="nav-item">Profile</li>
          {user && (
            <li
              onClick={() => firebase.auth().signOut()}
              className="nav-item cursor-pointer"
            >
              Sign Out
            </li>
          )}
        </ul>
      </motion.nav>
    </motion.div>
    </>
  );
}

export default ProfileDropdown;
