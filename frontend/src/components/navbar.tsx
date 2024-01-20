"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/components/styles/navstyles';
import { navLinks } from '@/constants/data';
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  const [color, setColor] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener('scroll', changeNavbarColor);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <nav className={color ? styles.navComponentScroll : styles.navComponent}>
      <div className={styles.navDiv}>
        <ul className={styles.navLinkList}>
          {navLinks.map((link: any) => (
            <li key={link.id} className='flex items-center justify-center'>
              <a href={link.url} className={styles.navlinks}>
                {link.name}
              </a>
            </li>
          ))}
          <li><ConnectKitButton/></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
