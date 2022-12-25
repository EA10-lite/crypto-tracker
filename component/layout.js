import React from 'react';
import Head from 'next/head';
import styles from '../styles/layout.module.css';

// components
import Footer from './footer';
import Header from './header';

// icons
import {TbArrowUp } from 'react-icons/tb'

export default function Layout({ children }){
    const handleClick = ()=> {
        window.scrollTo({
            top:10,
            behavior:'smooth'
        })
    }

    return (
        <div>
            <Head>
                <title>Crypto Market</title>
                <meta name="description" content="crypto price trackers" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <Header />
            <div className={styles.main}>
                { children }
            </div>
            <div className={styles.iconContainer}>
                <TbArrowUp  onClick={handleClick} size={20} color="white" />
            </div>
            <Footer />
        </div>
    )
}