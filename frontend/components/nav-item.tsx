import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";

const NavItem: React.FC<{
  children: any;
  onClick?: () => void;
}> = ({ children, onClick }) => {
  return (
    <li className="text-secondary mx-2 my-3 text-lg items-center uppercase font-bold leading-snug font-serif">
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="uppercase"
      >
        {children}
      </motion.button>
    </li>
  );
};

export default NavItem;
