import React, { useContext } from 'react';
import { UserContext } from '../../lib/context.js';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../lib/firebase.js';

const menuVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '-100%' },
};

const transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
};

function ProfileDropdown({ isOpen }) {
  const { user, username } = useContext(UserContext);

  return (
    <>
      <motion.div
        className={
          'bg-primary w-screen right-0 -z-10 overflow-hidden' +
          (isOpen ? ' absolute' : ' hidden')
        }
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        transition={transition}
      >
        <motion.nav
          className={'text-white p-3 text-right -z-10 max-w-6xl m-auto'}
          animate={isOpen ? 'open' : 'closed'}
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

            {user && (
              <>
                <li className="nav-item">
                  <Link href={`/${username}`}>
                    <a>Profile</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/submit">
                    <a>Submit an Article</a>
                  </Link>
                </li>
                <li
                  onClick={() => firebase.auth().signOut()}
                  className="nav-item cursor-pointer"
                >
                  Sign Out
                </li>
              </>
            )}
          </ul>
        </motion.nav>
      </motion.div>
    </>
  );
}

export default ProfileDropdown;
