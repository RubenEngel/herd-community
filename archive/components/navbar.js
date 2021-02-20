import React, {useState} from "react";
import Link from 'next/link'

export default function Navbar() {

  const [menuNavbarOpen, setMenuNavbarOpen] = useState(false);
  
  return (
    <>
      <div className="mb-6">

          <nav className="flex justify-center">
            <ul className="flex flex-row">
              <li className="nav-item mx-2 ">
                <Link href="/write-for-us"><a>Write For Us</a></Link>
              </li>
              <li className="nav-item mx-2 ">
                <Link href="/about-us"><a>About Us</a></Link>
              </li>
            </ul>
          </nav>

        <div className='flex justify-center'>
          <button
            className="nav-item uppercase font-bold cursor-pointer text-xl p-6 leading-none rounded md:hidden focus:outline-none"
            type="button"
            onClick={() => setMenuNavbarOpen(!menuNavbarOpen)}>
            Categories
          </button>
        </div>

        <nav className={"container relative md:flex md:flex-row items-center justify-center px-2 py-3 mb-3 " 
        + (menuNavbarOpen ? "block" : "hidden")}
        >
          <ul className="md:flex md:flex-row">
            <li className="nav-item">
              <Link href="/category/culture"><a>Culture</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/category/sport"><a>Sport</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/category/current-affairs"><a>Current Affairs</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/category/lifestyle"><a>Lifestyle</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/category/climate"><a>Climate</a></Link>
            </li>
          </ul>
        </nav>
              
      </div>
    </>
  );
}
