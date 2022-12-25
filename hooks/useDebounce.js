import React, { useEffect, useState } from "react";

export default function useDebounce(value, delay = 1000){
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);

        return ()=> {
            clearTimeout(handler)
        }
    },[value, delay])


    return debounceValue;
}