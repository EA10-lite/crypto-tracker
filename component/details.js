import React, {  useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/details.module.css';

import CandleStick from './chart/cryptochart';

// icons
import { MdInfo, MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

// data
import { trending  } from '../data/coin_data';

export default function Details({ data, chart_data}){
    const formatter = new Intl.NumberFormat('en');

    const [ chart_type, set_chart_type ] = useState("price");

    return (
        <>
            <div className={styles.container}>
                
                {/* header */}
                <div className={styles.header}>
                    <div className={styles.left}>
                        <ul>
                            <li className={styles.label}> Cryptocurrency </li>
                            <span className={styles.border}> / </span>
                            <li className={styles.label}> Coin </li> 
                            <span className={styles.border}> / </span>
                            <li className={`${styles.label} ${styles.id}`}> { data.id } </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.gridContainer}>

                    <div className={styles.info}>
                        <div className={styles.main}>
                            <div className={styles.coinLogo}>
                                <Image src={ data?.image?.thumb } alt='' width={36} height={36} className={styles.img} />
                            </div>
                            <h4 className={styles.coinName}> { data.name } <span className={styles.coinRank}> #{ data.market_cap_rank } </span></h4>
                        </div>
                        <div className={styles.price}>
                            <h2 className={styles.h2}> ${ formatter.format(data.market_data.current_price.usd) } </h2>
                            { data.market_data.price_change_percentage_24h > 0 ? (
                                <span style={{color:"#16c784"}}> <MdArrowDropUp size={20} /> { data.market_data.price_change_percentage_24h}% </span>
                            ) : (
                                <span style={{color:"#ea3943"}}> <MdArrowDropDown size={20} /> { data.market_data.price_change_percentage_24h } </span>
                            )}
                        </div>
                        <div className={styles.tagsContainer}>
                            <h4 className={styles.title}> Tags: </h4>
                            <div className={styles.tags}>
                                
                                <div className={styles.tag}>
                                    <a className={styles.link} href={data?.links?.homepage[0]}> { data?.name } </a>
                                </div>
                                { data?.links?.subreddit_url && <div className={styles.tag}>
                                    <a className={styles.link} href={data?.links?.subreddit_url}> Reddit </a>
                                </div> }
                            </div>
                        </div>
                    </div>
                    
                    {/* trending */}
                    <div className={styles.trendingContainer}>
                        {trending.map((trend,i)=> ( 
                            <div className={`${styles.trend} ${i === trending.length - 1 &&styles.last}`} key={trend.rank}>
                                <div className={styles.trendHeader}>
                                    <div className={styles.trendLogo} />
                                    <h4 className={styles.rank}> #{ trend.rank } </h4>
                                </div>
                                <Link href={`/coin/${trend.name}`}>
                                    <a className={styles.trendDetails}>
                                        <h4 className={styles.name}> { trend.name } </h4>
                                        <h5 className={styles.symbol}> { trend.symbol } </h5>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                    
                    {/* global */}
                    <div className={styles.global}>
                        <div className={`${styles.item} ${styles.item1}`}>
                            <div className={styles.itemHeader}>
                                <h4 className={styles.itemTitle}> Market Cap </h4>
                                <MdInfo size={24} color="lightgray" />
                            </div>

                            <div className={styles.numbers}>
                                <h3 className={styles.big}> <span> $ </span> { formatter.format(data.market_data.market_cap.usd)} </h3>
                                <h6 className={styles.small}>
                                    { data.market_data.market_cap_change_percentage_24h > 0 ? (
                                        <div>
                                            <MdArrowDropUp color="#16c784" size={20} />
                                            <span style={{color:"#16c784"}}> { formatter.format(data.market_data.market_cap_change_percentage_24h
                                            ) }% </span>
                                        </div>
                                    ) : (
                                        <>
                                            <MdArrowDropDown color="#ea3943" size={20} />
                                            <span style={{color:"#ea3943"}}> { formatter.format(data.market_data.market_cap_change_percentage_24h) } </span>
                                        </>
                                    )}
                                </h6>
                            </div>
                        </div>
                        <div className={`${styles.item} ${styles.item2}`}>
                            <div className={styles.itemHeader}>
                                <h4 className={styles.itemTitle}> Fully Diluted </h4>
                                <MdInfo size={24} color="lightgray" />
                            </div>
                            <div className={styles.numbers}>
                                <h3 className={styles.big}> <span> $ </span> { formatter.format(data.market_data.fully_diluted_valuation.usd)} </h3>
                                
                            </div>
                        </div>
                        <div className={`${styles.item} ${styles.item3}`}>
                            <div className={styles.itemHeader}>
                                <h4 className={styles.itemTitle}> Volume </h4>
                                <MdInfo size={24} color="lightgray" />
                            </div>
                            <div className={styles.numbers}>
                                <h3 className={styles.big}> <span> $ </span> { formatter.format(data.market_data.total_volume.usd)} </h3>
                            </div>
                        </div>
                        <div className={`${styles.item} ${styles.item4}`}>
                            <div className={styles.itemHeader}>
                                <h4 className={styles.itemTitle}> Circulating supply </h4>
                                <MdInfo size={24} color="lightgray" />
                            </div>
                            <div className={styles.numbers}>
                                <h3 className={styles.big}> <span> $ </span> { formatter.format(data.market_data.circulating_supply)} </h3>
                                <h6 className={styles.small}>
                                    <span style={{color:"lightgray"}}>${ formatter.format(data.market_data.total_supply) }</span>
                                </h6>
                            </div>
                        </div>
                    </div>

                    {/* charts */}
                    <div className={styles.charts}>
                        <div className={styles.chartHeader}>
                            <p className={styles.type}> { data?.name } 24hr Price Chart </p>
                        </div>
                        <div className={styles.chartType}>
                            <div 
                                className={`${styles.type} ${chart_type === "price" && styles.active}`} 
                                onClick={()=> set_chart_type("price")}
                            > Price </div>

                            <div 
                                className={`${styles.type} ${chart_type === "market_cap" && styles.active}`} 
                                onClick={()=> set_chart_type("market_cap")}
                            > Market_caps </div>

                            <div 
                                className={`${styles.type} ${chart_type === "volume" && styles.active}`} 
                                onClick={()=> set_chart_type("volume")}
                            > Volume </div>
                        </div>
                        <div className={styles.chart}>
                            <CandleStick chart_data={chart_data} chart_type={chart_type} />
                        </div>
                    </div>

                     {/* Stats */}
                    <div className={styles.statsContainer}>
                        <div className={styles.statsHeader}>
                            <div className={styles.logo}></div>
                            <div>
                                <h4 className={styles.h4}> { data.symbol} </h4>
                                <h5 className={styles.h5}> Price statistics</h5>
                            </div>
                        </div>
                        <ul className={styles.stats}>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> Price </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.current_price.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> Price change </h5>
                                <h5 className={styles.value}>
                                    { data.market_data.price_change_percentage_24h > 0 ? (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropUp size={20} color="#16c784" /> 
                                            <span style={{color:"#16c784"}}>{ formatter.format(data.market_data.price_change_percentage_24h)}% </span>
                                        </div>
                                    ) : (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropDown size={20} color="#ea3943" />
                                            <span style={{color:"#ea3943"}}>  { formatter.format(data.market_data.price_change_percentage_24h)}% </span>
                                        </div>
                                    )}
                                </h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> 24 High </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.high_24h.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> 24 Low </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.low_24h.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label} title="All time high"> ATH </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.ath.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> ATH %</h5>
                                <h5 className={styles.value}>
                                    { data.market_data.ath_change_percentage.usd > 0 ? (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropUp size={20} color="#16c784" /> 
                                            <span style={{color:"#16c784"}}>{ formatter.format(data.market_data.ath_change_percentage.usd)}% </span>
                                        </div>
                                    ) : (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropDown size={20} color="#ea3943" />
                                            <span style={{color:"#ea3943"}}>  { formatter.format(data.market_data.ath_change_percentage.usd)}% </span>
                                        </div>
                                    )}
                                </h5>
                            </li>
                            <li className={styles.stat} title="All time low">
                                <h5 className={styles.label}> ATL </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.atl.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> ATL %</h5>
                                <h5 className={styles.value}>
                                    { data.market_data.atl_change_percentage.usd > 0 ? (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropUp size={20} color="#16c784" /> 
                                            <span style={{color:"#16c784"}}>{ formatter.format(data.market_data.atl_change_percentage.usd)}% </span>
                                        </div>
                                    ) : (
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <MdArrowDropDown size={20} color="#ea3943" />
                                            <span style={{color:"#ea3943"}}>  { formatter.format(data.market_data.atl_change_percentage.usd)}% </span>
                                        </div>
                                    )}
                                </h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> Volume </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.total_volume.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> Market cap </h5>
                                <h5 className={styles.value}> ${ formatter.format(data.market_data.market_cap.usd)}</h5>
                            </li>
                            <li className={styles.stat}>
                                <h5 className={styles.label}> Rank </h5>
                                <h5 className={styles.value}> #{ formatter.format(data.market_data.market_cap_rank)}</h5>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </>
    )
}