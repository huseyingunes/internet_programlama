import {useState} from "react"

function Form1()
{
    const [ad, adBelirle] = useState('')

    function konsolaYaz()
    {
        console.log(ad)
    }

    return(
        <form>
            Ad Girin
            <input 
                type="text"
                value={ad}
                onChange={(e) => adBelirle(e.target.value)} 
            />
            <button onClick={konsolaYaz} type="button">Tıkla</button>
        </form>
    )
}

export default Form1