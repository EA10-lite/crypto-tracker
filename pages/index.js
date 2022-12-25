// components
import Hero from "../component/hero";
import List from "../component/list";

export default function Home({ data }) {

  return (
    <>
     <Hero />
     <List data={data} />
    </>
  )
}

export const getStaticProps = async () => {
  const data = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=24h%2C7d');
  return {
    props:{
      data: data ? await data.json() : [],
    }
  }
}