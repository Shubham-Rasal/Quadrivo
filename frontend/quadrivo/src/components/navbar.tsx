import React from 'react'
import styles from '@/components/styles/navstyles'
import { navLinks } from '@/constants/data'
const Navbar = () => {
    return (
        <nav className={styles.navComponent}>
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