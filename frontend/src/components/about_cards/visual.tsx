'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
interface VisualProps {
    src: string;
}
const Visual: React.FC<VisualProps> = ({ src }) => {
    return (
        <motion.div className='basis-4/12'
        whileHover={{ scale: 1.01 }}>
            <Image src={src} alt='visual' width={500} height={500} className='border-2 border-white-100 rounded-3xl'/>
        </motion.div>
    )
}

export default Visual