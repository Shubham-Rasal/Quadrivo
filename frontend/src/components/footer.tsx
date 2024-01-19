'use client'
import React from 'react'
import { motion } from 'framer-motion'
const Footer = () => {
  return (
    <motion.footer className="rounded-lg shadow mt-4 dark:bg-gray-900 w-full"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-lg sm:text-center dark:text-white">Quadrivo</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-md">GitHub</a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-md">Devfolio</a>
          </li>
          <li>
            <a href="#" className="hover:underline text-md">Contact</a>
          </li>
        </ul>
      </div>
    </motion.footer>
  )
}

export default Footer