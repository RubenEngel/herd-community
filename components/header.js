import { useState } from 'react';
import Link from 'next/link';
import {
  FaUserCircle,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import MenuDropdown from './menu-dropdown';
import ProfileDropdown from './profile-dropdown';
import CategoryDropdown from './category-dropdown';
import firebase from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header({ category }) {
  const today = new Date();

  const [user, loading, error] = useAuthState(firebase.auth());

  console.log(user);

  const [menuNavbarOpen, setMenuNavbarOpen] = useState(false);
  const [profileNavbarOpen, setProfileNavbarOpen] = useState(false);
  const [categoryNavbarOpen, setCategoryNavbarOpen] = useState(false);

  return (
    <>
      <div className=" bg-gray-800 text-white text-center uppercase font-light  py-2 px-4 md:px-16 z-10">
        <div className="flex justify-between items-center max-w-6xl m-auto">
          {/* Social Media Links */}
          <div className="flex flex-row justify-center">
            <h3 className="hidden md:block mr-6 text-md">Follow Us</h3>
            <a href="https://www.facebook.com/HERD.UK/" target="_blank">
              <FaFacebookF className="mx-1 text-xl " />
            </a>
            <a href="https://www.instagram.com/herd.uk/" target="_blank">
              <FaInstagram className="mx-1 text-xl " />
            </a>
            <a href="https://twitter.com/HERD_UK" target="_blank">
              <FaTwitter className="mx-1 text-xl " />
            </a>
            <a href="https://www.linkedin.com/company/herd-uk/" target="_blank">
              <FaLinkedin className="mx-1 text-xl " />
            </a>
          </div>
          {/* Date and Time */}
          <div>
            <h3 className="text-md relative">
              <time className="block md:hidden">
                {format(new Date(), 'LLLL	d, yyyy')}
              </time>
              <time className="hidden md:block">
                {format(new Date(), 'eeee, LLLL	d, yyyy')}
              </time>
            </h3>
          </div>
        </div>
      </div>

      <div className="sticky top-0 text-white bg-gray-800 px-6 py-2 z-10">
        <div className="flex justify-between items-center max-w-6xl m-auto">
          <motion.div whileTap={{ scale: 0.7 }} whileHover={{ scale: 1.2 }}>
            <button
              onClick={() => {
                setMenuNavbarOpen(!menuNavbarOpen);
                setProfileNavbarOpen(false);
                setCategoryNavbarOpen(false);
              }}
              className="focus:outline-none"
            >
              <BiMenuAltLeft className="text-5xl" />
            </button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <h1 className="text-6xl font-bold leading-tight text-center">
              <Link scroll={false} href="/">
                <a>HERD.</a>
              </Link>
            </h1>
          </motion.div>

          <motion.div whileTap={{ scale: 0.7 }} whileHover={{ scale: 1.2 }}>
            <button
              onClick={() => {
                setProfileNavbarOpen(!profileNavbarOpen);
                setMenuNavbarOpen(false);
                setCategoryNavbarOpen(false);
              }}
              className="flex flex-row items-center focus:outline-none"
            >
              {user ? (
                <img
                  width="30px"
                  height="30px"
                  className="rounded-full"
                  src={user.photoURL}
                />
              ) : (
                <FaUserCircle className="text-3xl " />
              )}
              <RiArrowDropDownFill className="text-3xl" />
            </button>
          </motion.div>
        </div>

        {category && (
          <>
            <motion.div
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-4 -z-10"
            >
              <button
                onClick={() => {
                  setCategoryNavbarOpen(!categoryNavbarOpen);
                  setProfileNavbarOpen(false);
                  setMenuNavbarOpen(false);
                }}
                className="flex flex-row items-center mx-auto focus:outline-none"
              >
                <h1 className="uppercase">Browsing {category}</h1>
                <RiArrowDropDownFill className="text-3xl" />
              </button>
            </motion.div>
            <CategoryDropdown
              setIsOpen={setCategoryNavbarOpen}
              isOpen={categoryNavbarOpen}
            />
          </>
        )}

        {/* Menu dropdown */}
        <MenuDropdown isOpen={menuNavbarOpen} />

        {/* Profile dropdown */}
        <ProfileDropdown isOpen={profileNavbarOpen} />
      </div>
    </>
  );
}
