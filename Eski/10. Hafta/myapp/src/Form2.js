import {useState} from "react"

function Form2()
{
    const [ad, adBelirle] = useState('')

    function konsolaYaz()
    {
        console.log(ad)
    }

    const adBelirleHandle = (veri) => {
        console.log(veri)
        adBelirle(veri)
        //document.getElementById("yazi").innerHTML = veri
    }

    return(
        <form>
            Ad Girin
            <input 
                type="text"
                onChange={(e) => adBelirleHandle(e.target.value)} 
            />
            <button onClick={konsolaYaz} type="button">Tıkla</button>
            <hr />
            <h3>{ad}</h3>
        </form>
    )
}

export default Form2