"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TransitionEffect() {
  return (
    <AnimatePresence>
      <motion.div
        className='fixed top-0 bottom-0 w-screen h-screen z-50 bg-red-600'
       
        animate={{ x: "0%", width: "0%" }}
     
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />

<motion.div
        className='fixed top-0 bottom-0 w-screen h-screen z-40 bg-violet-500'
       
        animate={{ x: "0%", width: "0%" }}
     
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <motion.div
        className='fixed top-0 bottom-0 w-screen h-screen z-30 bg-orange-600'
       
        animate={{ x: "0%", width: "0%" }}
     
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />



    </AnimatePresence>
  );
}

export default TransitionEffect;
