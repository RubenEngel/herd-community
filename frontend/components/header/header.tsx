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
import { CategoryContext } from "../context/category-provider";
import formatString from "../../lib/format-string";
import { AuthContext } from "../context/auth-provider";
import AnimatedButton from "../animated-button";

export default function Header() {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setPageLoading(true));
    router.events.on("routeChangeComplete", () => setPageLoading(false));

    return () => {
      router.events.off("routeChangeStart", () => setPageLoading(true));
      router.events.off("routeChangeComplete", () => setPageLoading(false));
    };
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

  const { userData } = useContext(AuthContext);

  // const { user } = useUser();
  const { category } = useContext(CategoryContext);

  const [menuNavbarOpen, setMenuNavbarOpen] = useState(false);
  const [profileNavbarOpen, setProfileNavbarOpen] = useState(false);
  const [categoryNavbarOpen, setCategoryNavbarOpen] = useState(false);

  return (
    <>
      {/* Date and social icons */}
      <div className="bg-primary text-secondary z-20 py-2 px-4 text-center font-light uppercase md:px-16">
        <div className="m-auto flex max-w-6xl items-center justify-between transition-all">
          {/* Social Media Links */}
          <div className="z-20 flex flex-row justify-center">
            <h3 className="text-md mr-6 hidden md:block">Follow Us</h3>
            <AnimatedButton className="mx-0.5">
              <a href="https://www.facebook.com/HERD.UK/" target="_blank">
                <FaFacebookF className="mx-1 text-xl " />
              </a>
            </AnimatedButton>
            <AnimatedButton className="mx-0.5">
              <a href="https://www.instagram.com/herd.uk/" target="_blank">
                <FaInstagram className="mx-1 text-xl " />
              </a>
            </AnimatedButton>
            <AnimatedButton className="mx-0.5">
              <a href="https://twitter.com/HERD_UK" target="_blank">
                <FaTwitter className="mx-1 text-xl " />
              </a>
            </AnimatedButton>
            <AnimatedButton className="mx-0.5">
              <a
                href="https://www.linkedin.com/company/herd-uk/"
                target="_blank"
              >
                <FaLinkedin className="mx-1 text-xl " />
              </a>
            </AnimatedButton>
          </div>
          {/* Date and Time */}
          <div>
            <h3 className="text-md xs:text-md relative z-20">
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
      <div className="text-secondary bg-primary sticky top-0 z-20 px-6 py-2 shadow-xl">
        <div className="m-auto flex max-w-6xl items-center justify-between">
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
            <h1 className="text-center text-6xl font-bold leading-tight">
              <Link scroll={false} href="/">
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
                  className="h-10 w-10 rounded-full object-cover"
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
              key="explore-dropdown"
              initial={{ y: -40 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCategoryNavbarOpen(!categoryNavbarOpen);
                  setProfileNavbarOpen(false);
                  setMenuNavbarOpen(false);
                }}
                className="mx-auto flex flex-row items-center font-serif focus:outline-none"
              >
                <p className="nav-item uppercase">
                  Browsing {formatString(category, "_")}
                </p>
                <RiArrowDropDownFill className="text-3xl" />
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {categoryNavbarOpen && (
                <CategoryDropdown setIsOpen={setCategoryNavbarOpen} />
              )}
            </AnimatePresence>
          </>
        )}
        <AnimatePresence>
          {/* Menu dropdown */}
          {menuNavbarOpen && (
            <MenuDropdown key={"menu-dropdown"} setIsOpen={setMenuNavbarOpen} />
          )}
          {/* Profile dropdown */}
          {profileNavbarOpen && (
            <ProfileDropdown
              key={"profile-dropdown"}
              setIsOpen={setProfileNavbarOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
