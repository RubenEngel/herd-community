import {useState} from 'react'
import Link from 'next/link'
import { FaUserCircle, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { BiMenuAltLeft } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import MenuDropdown from './menu-dropdown';
import ProfileDropdown from './profile-dropdown';
import CategoryDropdown from './category-dropdown';


export default function Header({category}) {

  const today = new Date()

  const [menuNavbarOpen, setMenuNavbarOpen] = useState(false);
  const [profileNavbarOpen, setProfileNavbarOpen] = useState(false)
  const [categoryNavbarOpen, setCategoryNavbarOpen] = useState(false)

  return (
    <>
      <div className="bg-black text-white text-center uppercase font-light flex justify-between items-center py-2 px-4 md:px-16 z-10">
        <div className="flex flex-row justify-center">
          <h3 className="hidden md:block mr-6 text-md">Follow Us</h3>
          <FaFacebookF className='mx-1 text-xl '/>
          <FaInstagram className='mx-1 text-xl '/>
          <FaTwitter className='mx-1 text-xl '/>
          <FaLinkedin className='mx-1 text-xl '/>
        </div>
        <h3 className="text-md relative">
        <time className='block md:hidden'>{format(new Date(), 'LLLL	d, yyyy')}</time>
        <time className='hidden md:block'>{format(new Date(), 'eeee, LLLL	d, yyyy')}</time>
        </h3>
      </div>
  
      <div className='sticky top-0 text-white bg-black px-6 py-2 w-screen z-10'>
        
        <div className="flex justify-between items-center">
          <motion.div whileTap={{ scale: 0.7 }} whileHover={{scale: 1.2}}>
            <button
              onClick={() => {
                setMenuNavbarOpen(!menuNavbarOpen)
                setProfileNavbarOpen(false)
                setCategoryNavbarOpen(false)
              }} 
              className='focus:outline-none'>
                <BiMenuAltLeft className='text-5xl'/>
            </button>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{scale: 1.1}}>
            <h1 className="text-6xl font-bold leading-tight text-center">
              <Link scroll={false} href="/">
                <a>HERD.</a>
              </Link>
            </h1>
          </motion.div>
            
          <motion.div whileTap={{ scale: 0.7 }} whileHover={{scale: 1.2}}>
            <button 
              onClick={() => {
                setProfileNavbarOpen(!profileNavbarOpen)
                setMenuNavbarOpen(false)
                setCategoryNavbarOpen(false)
              }} 
              className='flex flex-row items-center focus:outline-none'>
                <FaUserCircle className='text-3xl '/>
                <RiArrowDropDownFill className='text-3xl'/>
            </button>
          </motion.div>
        </div>

      { category &&
      <>
        <div className='pt-4 -z-10'>
        <button
          onClick={() => {
            setCategoryNavbarOpen(!categoryNavbarOpen)
            setProfileNavbarOpen(false)
            setMenuNavbarOpen(false)
          }}
          className='flex flex-row items-center mx-auto focus:outline-none'>
          <h1 className='uppercase'>
            Browsing {category}
          </h1>
          <RiArrowDropDownFill className='text-3xl'/>
        </button>
      </div>
      <CategoryDropdown setIsOpen={setCategoryNavbarOpen} isOpen={categoryNavbarOpen}/>
      </>
      }

        {/* Menu dropdown */}
        <MenuDropdown isOpen={menuNavbarOpen}/>

        {/* Profile dropdown */}
        <ProfileDropdown isOpen={profileNavbarOpen}/>
        
    </div>

  </>
  )
}