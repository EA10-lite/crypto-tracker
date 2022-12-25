import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './trending.module.css';

export default function Trending({ trend }){
    return (
        <div className={styles.trend}>
            <div className={styles.trendHeader}>
                <div className={styles.trendLogo}>
                    <Image src={trend.thumb} alt='' width={36} height={36} />
                </div>
                <h4 className={styles.rank}> #{ trend.market_cap_rank } </h4>
            </div>
            <Link href={`/coin/${trend.id}`}>
                <a className={styles.trendDetails}>
                    <h4 className={styles.name}> { trend.name } </h4>
                    <h5 className={styles.symbol}> { trend.symbol } </h5>
                </a>
            </Link>
        </div>
    )
}