'use client'
import React from 'react'
import styles from '@/components/styles/navstyles'
import { navLinks } from '@/constants/data'
import { useState } from 'react'
const Navbar = () => {
    const [color, setColor] = useState(false)
    const changeNavbarColor = () => {
        if (window.scrollY >= 80) {
            setColor(true)
        } else {
            setColor(false)
        }
    }
    window.addEventListener('scroll', changeNavbarColor)
    return (
        <nav className={color ? styles.navComponentScroll : styles.navComponent}>
            <div className={styles.navDiv}>
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className={styles.name}>Quadrivo</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className={styles.navLinkList}>
                        {
                            navLinks.map((link: any) => (
                                <li key={link.id}>
                                    <a href={link.url} className={styles.navlinks}>{link.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar