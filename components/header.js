import Link from 'next/link'
// import Navbar from '../archive/components/navbar'
import { FaSearch, FaUserCircle, FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
// import { ImPencil } from "react-icons/im";
import { BiMenuAltLeft } from "react-icons/bi";

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
  
      <div className='sticky top-0 text-white bg-black px-6 py-2 w-screen flex justify-between items-center'> {/*flex justify-between*/}
        
        <div>
          <BiMenuAltLeft className='text-4xl'/>
        </div>
        
        <div>
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-center">
            <Link scroll={false} href="/">
              <a>HERD.</a>
            </Link>
          </h1>
        </div>
          
        <div>
          <FaUserCircle className='text-3xl '/>
        </div>
     
      </div>
  </>
  )
}

{/* <div className='flex mt-2 md:mr-8'>
          <FaSearch className='text-2xl mr-2'/>
          <ImPencil className='text-2xl mx-2'/>
          <FaUserCircle className='text-2xl '/>
        </div> */}