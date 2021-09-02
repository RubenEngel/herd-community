import React from 'react';
import { motion } from 'framer-motion';

function Loading() {
  return (
    <motion.div
      animate={{ scale: 1.2, y: -5 }}
      transition={{ duration: 0.9, yoyo: Infinity }}
    >
      <h1 className="text-secondary text-2xl text-center">
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
