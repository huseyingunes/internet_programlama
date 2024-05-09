import {useState} from "react"

function FormHandleSubmit()
{
    const [ad, adBelirle] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${ad}`)
    }

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
        <form onSubmit={handleSubmit}>
            Ad Girin
            <input 
                type="text"
                onChange={(e) => adBelirleHandle(e.target.value)} 
            />
            <button type="submit">Tıkla</button>
            <hr />
            <h3>{ad}</h3>
        </form>
    )
}

export default FormHandleSubmit