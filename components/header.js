import Link from 'next/link'
import Navbar from './navbar'
import { FaSearch, FaUser,  } from 'react-icons/fa'
import { ImPencil } from "react-icons/im";

export default function Header() {
  return (
    <section className='h-24 text-white'>

      <div className='flex fixed top-0 bg-black justify-between px-6 py-4 w-screen'>
        
        

        <h1 className="text-6xl font-bold leading-tight text-center">
          <Link scroll={false} href="/">
            <a>HERD.</a>
          </Link>
        </h1>
        
        <div className='flex mt-2 md:mr-8'>
          <FaSearch className='text-3xl mr-2'/>
          <ImPencil className='text-3xl mx-2'/>
          <FaUser className='text-3xl'/>
        </div>
        
      </div>
   
    </section>
    
    
  )
}
