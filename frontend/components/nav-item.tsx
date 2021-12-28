import { motion, Variants } from "framer-motion";

const NavItem: React.FC<{
  variants: Variants;
  children: any;
  onClick?: () => void;
}> = ({ children, onClick, variants }) => {
  return (
    <motion.li
      variants={variants}
      className="text-secondary mx-2 my-3 text-lg items-center uppercase font-bold leading-snug font-serif"
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="uppercase"
      >
        {children}
      </motion.button>
    </motion.li>
  );
};

export default NavItem;
