import Link from 'next/link'
import Navbar from './navbar'
import { FaSearch, FaPencilAlt } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'

export default function Header() {
  return (
    <section className='h-24 text-white'>

      <div className='flex fixed top-0 bg-black justify-between px-4 py-4 w-screen'>
        
        <h1 className="text-6xl font-bold leading-tight text-center">
          <Link href="/">
            <a>HERD.</a>
          </Link>
        </h1>
        
        <div className='flex mt-2'>
          <FaSearch className='text-3xl mx-3'/>
          <FaPencilAlt className='text-3xl'/>
          <FaUser className='text-3xl ml-2'/>
        </div>
        
      </div>
   
    </section>
    
    
  )
}
