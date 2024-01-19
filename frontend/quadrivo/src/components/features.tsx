'use client'
import React from 'react'
import { aboutData } from '@/constants/data'
import Description from './about_cards/description'
import Visual from './about_cards/visual'
import { motion, transform } from 'framer-motion'
const Features = () => {
  return (
    <div id="features" className='w-full flex justify-center items-center flex-wrap'>
      <motion.div className="flex justify-center items-center basis-full py-4 my-12"
        initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-[80%] flex justify-evenly items-center">
          <Description title={aboutData[0].title} content1={aboutData[0].content1} content2={aboutData[0].content2} description={aboutData[0].description} />
          <Visual src={aboutData[0].src} />
        </div>
      </motion.div>
      <motion.div className="flex justify-center items-center basis-full py-4 my-12"
        initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-[80%] flex justify-evenly items-center">
          <Visual src={aboutData[1].src} />
          <Description title={aboutData[1].title} content1={aboutData[1].content1} content2={aboutData[1].content2} description={aboutData[1].description} />
        </div>
      </motion.div>
      <motion.div className="flex justify-center items-center basis-full py-4 my-12"
        initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-[80%] flex justify-evenly items-center">
          <Description title={aboutData[2].title} content1={aboutData[2].content1} content2={aboutData[2].content2} description={aboutData[2].description} />
          <Visual src={aboutData[2].src} />
        </div>
      </motion.div>
    </div>
  )
}

export default Features