import React from 'react'
import {motion} from 'framer-motion'
import Link from 'next/link'

function CategoryDropdown({isOpen}) {

    const menuVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: '-100%' }
      }
    
    const navVariants = { 
        open: { y: 0 }, 
        closed: { y: "-50%" } 
    }
    
    const transition = {
      type: 'spring', 
      bounce: 0, 
      duration: 0.4 
    }

    return (
        <motion.div 
        className={'bg-black w-screen left-0 -z-10 overflow-hidden' + (isOpen ? ' absolute' : ' hidden' )}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={transition}
        >
          <motion.nav 
          className={"text-white p-3 -z-10 text-center"} 
          animate={isOpen ? "open" : "closed"} 
          variants={navVariants}
          transition={transition}
          >
              <ul>
                <li className="nav-item">
                  Culture
                </li>
                <li className="nav-item">
                  Sport
                </li>
                <li className="nav-item">
                    Current Affairs
                </li>
                <li className="nav-item">
                    Climate
                </li>
                <li className="nav-item">
                    Lifestyle
                </li>
              </ul>
            </motion.nav>

        </motion.div>
    )
}

export default CategoryDropdown
