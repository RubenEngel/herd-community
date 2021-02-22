import React from 'react'
import {motion} from 'framer-motion'

const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' }
  }

const navVariants = {
    open: { x: 0 },
    closed: { x: "100%" }
}

  const transition = {
    type: 'spring', 
    bounce: 0, 
    duration: 0.4 
  }

function ProfileDropdown({isOpen}) {
    return (
        <motion.div 
          className={'bg-black w-screen right-0 -z-10' + (isOpen ? ' absolute' : ' hidden' )}
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          transition={transition}
          >
          <motion.nav
          className={"text-white p-3 text-right -z-10"}
          animate={isOpen ? "open" : "closed"} 
          variants={navVariants}
          transition={transition}
          >
              <ul>
                <li className="nav-item">
                  Sign In
                </li>
                <li className="nav-item">
                  Profile
                </li>
                <li className="nav-item">
                  Sign Out
                </li>
              </ul>
            </motion.nav>

        </motion.div>
    )
}

export default ProfileDropdown
