import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaUserCircle,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import MenuDropdown from "./menu-dropdown";
import ProfileDropdown from "./profile-dropdown";
import CategoryDropdown from "./category-dropdown";
import { ExploreContext, UserContext } from "../../lib/context";
import formatString from "../../lib/formatString";

export default function Header() {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));
  }, [router]);

  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    setMenuNavbarOpen(false);
    setProfileNavbarOpen(false);
    setCategoryNavbarOpen(false);
    if (router.pathname === "/explore") {
      setShowCategory(true);
    } else {
      setShowCategory(false);
    }
  }, [router]);

  const { userData } = useContext(UserContext);
  const { category } = useContext(ExploreContext);

  const [menuNavbarOpen, setMenuNavbarOpen] = useState(false);
  const [profileNavbarOpen, setProfileNavbarOpen] = useState(false);
  const [categoryNavbarOpen, setCategoryNavbarOpen] = useState(false);

  return (
    <>
      {/* Date and social icons */}
      <div className="bg-primary text-secondary text-center uppercase font-light py-2 px-4 md:px-16 z-10 ">
        <div className="flex justify-between items-center max-w-6xl m-auto transition-all">
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
            <h3 className="text-md xs:text-md relative">
              <time className="block md:hidden">
                {format(new Date(), "LLLL	d, yyyy")}
              </time>
              <time className="hidden md:block">
                {format(new Date(), "eeee, LLLL	d, yyyy")}
              </time>
            </h3>
          </div>
        </div>
      </div>

      {/* Main section of header */}
      <div className="sticky top-0 text-secondary bg-primary px-6 py-2 z-10 shadow-xl">
        <div className="flex justify-between items-center max-w-6xl m-auto">
          {/* Menu dropdwon button */}
          <motion.div whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
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
          {/* HERD logo home button */}
          <motion.div
            onClick={() => setShowCategory(false)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <h1 className="text-6xl font-bold leading-tight text-center">
              <Link scroll={false} href="/home">
                <a>HERD.</a>
              </Link>
            </h1>
          </motion.div>
          {/*  Profile dropdown menu button */}
          <motion.div whileTap={{ scale: 0.8 }} whileHover={{ scale: 1.1 }}>
            <button
              onClick={() => {
                setProfileNavbarOpen(!profileNavbarOpen);
                setMenuNavbarOpen(false);
                setCategoryNavbarOpen(false);
              }}
              className="flex flex-row items-center focus:outline-none"
            >
              {userData?.imageUrl ? (
                <img
                  width="30px"
                  height="30px"
                  className="rounded-full"
                  src={userData.imageUrl}
                />
              ) : (
                <FaUserCircle className="text-3xl " />
              )}
              <RiArrowDropDownFill className="text-3xl" />
            </button>
          </motion.div>
        </div>
        {/* Category indicator */}
        {showCategory && !pageLoading && (
          <>
            <motion.div
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-4 -z-10"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategoryNavbarOpen(!categoryNavbarOpen);
                  setProfileNavbarOpen(false);
                  setMenuNavbarOpen(false);
                }}
                className="flex flex-row items-center mx-auto focus:outline-none font-serif"
              >
                <p className="uppercase nav-item">
                  Browsing {formatString(category, "_")}
                </p>
                <RiArrowDropDownFill className="text-3xl" />
              </motion.button>
            </motion.div>
            <CategoryDropdown
              setIsOpen={setCategoryNavbarOpen}
              isOpen={categoryNavbarOpen}
            />
          </>
        )}
        <AnimatePresence>
          {/* Menu dropdown */}
          {menuNavbarOpen && (
            <MenuDropdown key={"menuDropdown"} setIsOpen={setMenuNavbarOpen} />
          )}
          {/* Profile dropdown */}
          {profileNavbarOpen && (
            <ProfileDropdown
              key={"profileDropdown"}
              setIsOpen={setProfileNavbarOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
