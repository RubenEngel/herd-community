import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  return (
    <motion.div
      animate={{ scale: 1.3, y: -10 }}
      transition={{ duration: 0.9, yoyo: Infinity, delay: 0.5, staggerChildren: 0.5 }}
    >
      <h1 className=" text-gray-800 text-4xl text-center">
        <motion.span>H</motion.span>
        <motion.span>E</motion.span>
        <motion.span>R</motion.span>
        <motion.span>D</motion.span>
        <motion.span>.</motion.span>
      </h1>
    </motion.div>
  );
}

export default Loading;
