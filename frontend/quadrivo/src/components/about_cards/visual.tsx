import React from 'react'
import Image from 'next/image'

interface VisualProps {
    src: string;
}
const Visual: React.FC<VisualProps> = ({ src }) => {
    return (
        <div className='basis-4/12'>
            <Image src={src} alt='visual' width={500} height={500} className='border-2 border-white-100 rounded-3xl'/>
        </div>
    )
}

export default Visual