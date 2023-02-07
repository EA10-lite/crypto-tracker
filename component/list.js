import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/list.module.css';

// icons
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri'

export default function List({ data }){
    const formater = new Intl.NumberFormat('en');
    const [ reverse, setReverse ] = useState(false);
    const handleSort = ()=> {
        data.reverse();
        setReverse(!reverse);
    }
    return (
        <>
            { data && <div className={styles.container}>
                <div className={styles.header}>
                    <h3 className={styles.title}> Top 100 Currencies </h3>
                    <h5 className={styles.subtitle}> by market capitalization </h5>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th className={styles.rank}>
                                    <div className={styles.stack_left}>
                                        <span> # </span>
                                        { !reverse && <RiArrowUpSFill size="16" onClick={handleSort} />}
                                        { reverse && <RiArrowDownSFill size="16" onClick={handleSort} /> }
                                    </div>
                                </th>
                                <th className={styles.name}>Coin</th>
                                <th className={`${styles.price} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        
                                        <span>  Price </span>
                                    </div>
                                </th>
                                <th className={`${styles.change} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        <span> 24h% </span>
                                    </div>
                                </th>
                                <th className={`${styles.change} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        <span> 7d% </span>
                                    </div>
                                </th>
                                <th className={`${styles.marketCap} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        
                                        <span>  Market Cap </span>
                                    </div>
                                </th>
                                <th className={`${styles.marketCap} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        <span>  24h% </span>
                                    </div>
                                </th>
                                <th className={`${styles.volume} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        <span>  Volume </span>
                                    </div>
                                </th>
                                <th className={`${styles.circulating} ${styles.numbers}`}>
                                    <div className={styles.flex}>
                                        <span>  Circulating Supply </span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            { data && data.map(item=> (
                                <tr key={item.id}>
                                    <td className={styles.rank}> { item.market_cap_rank } </td>
                                    <td className={styles.name}>
                                        <Link href={`/coin/${item.id}`}>
                                            <a className={styles.link}>
                                                <Image src={item.image} alt='' width={36} height={36} /> 
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                    <span> { item.name } </span>
                                                    <span className={styles.symbol}> { item.symbol } </span>
                                                </div>   
                                            </a>    
                                        </Link>    
                                    </td>
                                    <td className={`${styles.numbers} ${styles.price}`}> ${ formater.format(item.current_price) } </td>
                                    <td className={`${styles.numbers} ${styles.change} ${item.price_change_percentage_24h > 0 ? styles.increase : styles.decrease }`}>
                                        <div className={styles.stack_left}>
                                            { item.price_change_percentage_24h > 0 ? <RiArrowUpSFill color="#16c784"  size={26} /> : <RiArrowDownSFill color="#ea3943" size={26} />}
                                            <span> {formater.format(parseFloat(item.price_change_percentage_24h.toFixed(2)))}% </span>
                                        </div>
                                    </td>
                                    <td className={`${styles.numbers} ${styles.change} ${item.price_change_percentage_7d_in_currency > 0 ? styles.increase : styles.decrease }`}>
                                        <div className={styles.stack_left}>
                                            { item.price_change_percentage_7d_in_currency > 0 ? <RiArrowUpSFill color="#16c784"  size={26} /> : <RiArrowDownSFill color="#ea3943" size={26} />}
                                            <span> {formater.format(parseFloat(item.price_change_percentage_7d_in_currency.toFixed(2)))}% </span>
                                        </div>
                                    </td>
                                    <td className={`${styles.numbers} ${styles.marketCap}`}> 
                                        <div className={styles.stack}>
                                            <h4> ${ formater.format(item.market_cap) } </h4>
                                        </div>
                                    </td>
                                    <td className={`${styles.numbers} ${styles.marketCap}`}> 
                                        <div className={styles.stack_left}>
                                            { item.market_cap_change_percentage_24h > 0 ? <RiArrowUpSFill color="#16c784"  size={26} /> : <RiArrowDownSFill color="#ea3943" size={26} />}
                                            <span className={`${item.market_cap_change_percentage_24h > 0?styles.increase : styles.decrease}`}> { parseFloat(item.market_cap_change_percentage_24h.toFixed(2))}%</span> 
                                        </div>
                                    </td>
                                    <td className={`${styles.numbers} ${styles.volume}`}> ${ formater.format(item.total_volume) } </td>
                                    <td className={`${styles.numbers} ${styles.circulating}`}> 
                                        <div className={styles.stack}>
                                            <div>
                                                { formater.format(item.circulating_supply) } 
                                                <span className={styles.symbol}>{ item.symbol.toUpperCase()}</span> 
                                            </div>
                                            <span className={styles.span}> { formater.format(item.total_supply) } </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> }
        </>
    )
}