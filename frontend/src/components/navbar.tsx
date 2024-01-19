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
        </nav>
    )
}

export default Navbar