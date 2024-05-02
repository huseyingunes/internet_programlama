import { useState, useEffect } from "react";

function Sayac()
{
    const [sayac, setSayac] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setSayac(sayac => sayac + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return(
        <div>
            <h1>{sayac}</h1>
        </div>
    )
}

export default Sayac;