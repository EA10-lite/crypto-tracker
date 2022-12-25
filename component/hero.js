import React from "react";
import styles from '../styles/hero.module.css';


export default function Hero(){
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h4 className={styles.title}> The easiest way to   </h4>
                <h4 className={styles.title}> Track multiple cryptocurrencies </h4>
                <p className={styles.subtitle}> With Coinsgrate, you can keep track of your favorite cryptos and set reminder for rise and fall in price....</p>
            </div>
        </section>
    )
}