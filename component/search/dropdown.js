import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './dropdown.module.css';

export default function Dropdown({ result }){
    return (
        <div className={styles.container}>
            { result && result.slice(0,10).map(data=> (
                <Link href={`/search/${data.id}`} key={data.id}>
                    <a className={styles.resultContainer}>
                        <div className={styles.details}>
                            <Image src={data.thumb} alt='' width={36} height={36} className={styles.img} />
                            <div className={styles.info}>
                                <h4 className={styles.name}> { data.name } </h4>
                                <h6 className={styles.symbol}> { data.symbol } </h6>
                            </div>
                        </div>
                        <span> #{ data.market_cap_rank} </span>
                    </a>
                </Link>
            ))}
        </div>
    )
}