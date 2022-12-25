
// components
import Details from "../../component/details";

export const getStaticPaths = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false&price_change_percentage=24h%2C7d")
    const data = await res.json()

    const paths = data.map(coin => {
        return {
            params: { id: coin.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res1 = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false&sparkline=false`);

    const res2 = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`)

    const data = await res1.json();
    const chart_data = await res2.json();


    return {
        props: {
            data,
            chart_data
        }
    }
}

export default function CoinDetails({ data, chart_data }){
    console.log(data);
    console.log(chart_data);

    return (
        <>
            { data && data.name && <Details 
                data={data} 
                chart_data={chart_data} 
            />}
        </>
    )
}
