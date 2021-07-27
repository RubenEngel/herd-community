import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'

const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' }
  }

const navVariants = { 
    open: { x: 0 }, 
    closed: { x: "-100%" } 
}

const transition = {
  type: 'spring', 
  bounce: 0, 
  duration: 0.4 
}

function MenuDropdown({isOpen}) {
    return (
        <motion.div 
        className={'bg-black w-screen left-0 -z-10 overflow-hidden' + (isOpen ? ' absolute' : ' hidden' )}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={transition}
        >
          <motion.nav 
          className={"text-white p-3 -z-10 max-w-6xl m-auto"} 
          animate={isOpen ? "open" : "closed"} 
          variants={navVariants}
          transition={transition}
          >
              <ul>
                <li className="nav-item">
                  About Us
                </li>
                <li className="nav-item">
                  Submit an Article
                </li>
                <li className="nav-item">
                  Search
                </li>
                <li className="nav-item">
                  <Link href="/explore">
                    <a>Explore</a>
                  </Link>
                </li>
              </ul>
            </motion.nav>

        </motion.div>
    )
}

export default MenuDropdown
