import React from 'react';
import styles from '../../../styles/Body.module.css'
import girlPic from '../../../assets/images/Image.svg';
function SearchBox() {
   
    return (
        <div className={styles.Container} id='blog'>
            <div>
            <h6 className={styles.h6}>Best Destinations around the world</h6>
            <h2 className={styles.h2} >Travel, enjoy
                <span>and live a new</span>
                and full life</h2>
                <p className={styles.p} >Built Wicket longer admire do barton vanity itself do in it.
                     Preferred to sportsmen it engrossed listening. Park gate sell 
                     they west hard for the.</p>
            </div>
            <div>
                <img src={girlPic} className={styles.img} alt='girl travel'/>
            </div>
        </div>
    );
}

export default SearchBox;