import Link from 'next/link'
import { FaSearch, FaUserCircle, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { BiMenuAltLeft } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";

export default function Header() {
  return (
    <>
      <div className="bg-black text-white text-center uppercase font-light flex justify-between items-center py-2 px-4 md:px-16">
        <div className="flex flex-row justify-center">
          <h3 className="hidden md:block mr-6 text-md">Follow Us</h3>
          <FaFacebookF className='mx-1 text-xl '/>
          <FaInstagram className='mx-1 text-xl '/>
          <FaTwitter className='mx-1 text-xl '/>
          <FaLinkedin className='mx-1 text-xl '/>
        </div>
        <h3 className="text-md relative">17th February 2021</h3>
      </div>
  
      <div className='sticky top-0 text-white bg-black px-6 py-2 w-screen flex justify-between items-center'>
        
        <div>
          <button className='focus:outline-none'>
            <BiMenuAltLeft className='text-5xl'/>
          </button>
          
        </div>
        
        <div>
          <h1 className="text-6xl font-bold leading-tight text-center">
            <Link scroll={false} href="/">
              <a>HERD.</a>
            </Link>
          </h1>
        </div>
          
        <div>
          <button className='flex flex-row items-center focus:outline-none'>
            <FaUserCircle className='text-3xl '/>
            <RiArrowDropDownFill className='text-3xl'/>
          </button>
        </div>
     
      </div>
  </>
  )
}