import React, { useState } from 'react';
import styles from '../../../styles/Navbar.module.css';
import logo from '../../../assets/images/logo.jpg';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    

     

    return (
        <nav className={styles.navbar}>
           {/* <img src={logo} alt="Logo" className={styles.logo} /> */}
           <div className={styles.hamburger}>
                <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
            <ul className={`${styles.navOptions} ${isOpen ? styles.showMenu : ''}`}>
                <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
                <li className={styles.navItem}><a href="#blog" className={styles.navLink}>Blog</a></li>
                <li className={styles.navItem}><a href="#distinations" className={styles.navLink}>Distinations</a></li>
                <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
                <li className={styles.navItem}><Link to="/login" className={styles.navLink}  >Login</Link></li>
                <li className={styles.navItem}><Link to="/logout" className={styles.navLink}  >Log Out</Link></li>
                <li className={styles.navItem}><Link to="/app-ads.txt" className={styles.navLink}  >Sajid Link</Link></li>
                <li className={styles.navItem}>
                <Link to="/profile" className={styles.profileLink}>
                {/* <img src="https://via.placeholder.com/200" alt="User Profile" className={styles.profileIcon} /> */}
                    </Link>
                
        </li>
            </ul>
        </nav>
    );
};
