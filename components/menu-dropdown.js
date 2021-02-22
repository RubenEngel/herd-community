import React from 'react'
import {motion} from 'framer-motion'

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
        className={'bg-black w-screen left-0 -z-10' + (isOpen ? ' absolute' : ' hidden' )}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={transition}
        >
          <motion.nav 
          className={"text-white p-3 -z-10"} 
          animate={isOpen ? "open" : "closed"} 
          variants={navVariants}
          transition={transition}
          >
              <ul>
                <li className="nav-item">
                  About Us
                </li>
                <li className="nav-item">
                  Write an Article
                </li>
              </ul>
            </motion.nav>

        </motion.div>
    )
}

export default MenuDropdown
