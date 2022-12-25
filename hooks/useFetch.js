import { useState, useEffect } from 'react';

export default function useFetch(url){
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);



    useEffect(()=>{
        fetch(url,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        }).then(res=> {
            return res.json()
        }).then(res=> {
            setData(res);
            setLoading(false);
            setError(false)
        }).catch(err=> {
            setLoading(false);
            setError(err.response);
        })
    },[url])

    return {
        data,
        error,
        loading
    }
}
