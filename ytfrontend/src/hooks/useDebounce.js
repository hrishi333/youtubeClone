import React, {useEffect, useState} from "react";

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const id = setTimeout(()=>{
            setDebouncedValue(value);
        },delay);

        return ()=> {
            console.log("clearing the timeout");
            clearTimeout(id);
        }
    },[value,delay])

    return debouncedValue;
}

export default useDebounce;