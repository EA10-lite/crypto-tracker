import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

// icons
import { FiSearch } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

// components
import Dropdown from './search/dropdown';

// hooks
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';


const formater = new Intl.NumberFormat('en');
const abortCont = new AbortController()

export default function Header(){
    const { data } = useFetch('https://api.coingecko.com/api/v3/global');
    
    const [ searchInput , setSearchInput ] = useState('');
    const [ result, setResult ] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.coingecko.com/api/v3/search?query=${searchInput}`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
            }
        }, { signal: abortCont.signal})
        .then(res=> {
            return res.json();
        })
        .then(res=> {
            setResult(res);
        })
        .catch(err=> console.log(err))
    }

    const debounceSearch = useDebounce(searchInput, 500);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true)

            fetch(`https://api.coingecko.com/api/v3/search?query=${debounceSearch}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                }
            }, { signal: abortCont.signal})
            .then(res=> {
                return res.json()
            })
            .then(res=> setResult(res))
            .catch(err=> console.log(err))
        }

        if(debounceSearch){
            fetchData();
        }

    },[debounceSearch])

    const handleCancel = () => {
        setSearchInput("")
        setResult([])
    }

    return (
        <div className={styles.container}>
           {data && <div className={styles.general}>
                <div className={styles.content}>
                    <div className={`${styles.flex} ${styles.flex1}`}>
                        <h4 className={styles.subtitle}>Cryptocurrencies:</h4>
                        <h4 className={styles.title}> { data && formater.format(data?.data?.active_cryptocurrencies)} </h4>
                    </div>
                    <div className={`${styles.flex} ${styles.flex6}`}>
                        <h4 className={styles.subtitle}>Exchanges:</h4>
                        <h4 className={styles.title}> { data && formater.format(data?.data?.markets)} </h4>
                    </div>
                    <div className={`${styles.flex} ${styles.flex2}`}>
                        <h4 className={styles.subtitle}>Market Cap: </h4>
                        <h4 className={styles.title}>${ data && formater.format(data?.data?.total_market_cap.usd)} </h4>
                    </div>
                    <div className={`${styles.flex} ${styles.flex3}`}>
                        <h4 className={styles.subtitle}> Market Cap change 24h %: </h4>
                        <h4 className={`${data?.data?.market_cap_change_percentage_24h_usd > 0 ? styles.increase 
                        : styles.decrease } ${styles.title}`}>{ data && formater.format(parseFloat(data?.data?.market_cap_change_percentage_24h_usd.toFixed(2)))}% </h4>
                    </div>
                    <div className={`${styles.flex} ${styles.flex4}`}>
                        <h4 className={styles.subtitle}> Dominance : </h4>
                        <h4 className={styles.title}> <span> BTC : </span>{ data && formater.format(parseFloat(data?.data?.market_cap_percentage.btc.toFixed(2)))}% </h4>
                        
                        <h4 className={styles.title}> <span> ETH : </span>{ data && formater.format(parseFloat(data?.data?.market_cap_percentage.eth.toFixed(2)))}% </h4>
                    </div>
                    <div className={`${styles.flex} ${styles.flex5}`}>
                        <h4 className={styles.subtitle}> Volume </h4>
                        <h4 className={styles.title}>${ data && formater.format(data?.data?.total_volume.usd) } </h4>
                    </div>
                </div>
            </div> }

            {/* nav */}

            <nav className={styles.nav}>
                <div className={styles.left}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <a className={styles.logo}> Coinsgrate </a>
                        </Link>
                    </div>
                    <div className={styles.searchArea}>
                        <div className={styles.searchInput}>
                            <FiSearch size={20} className={styles.searchIcon} color= "lightgray" />
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="text" placeholder='Search' 
                                    className={styles.input} name="search" value={searchInput} 
                                    onChange={(e)=> setSearchInput(e.target.value)}
                                />
                            </form>
                            { searchInput.length > 0 && <MdCancel size={20} className={styles.icon} color="lightgray" onClick={handleCancel} /> }
                        </div>
                        <div className={styles.dropdown}>
                            { searchInput.length > 0 && <Dropdown result={result.coins ? result.coins : []} /> }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}