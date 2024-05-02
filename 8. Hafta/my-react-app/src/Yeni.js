function tikla()
{
    alert("Tıklandı")
}

function Yeni(props)
{
    const tiklaa = (arg) => {alert("Tıklandıı" + arg)}
    const tiklaa2 = (arg, arg2) => {
        alert("Tıklandıı" + arg)
        console.log(arg2)
    }
    return(
        <div>
            <h1>{props.ileti} Yeni Sayfa</h1>
            <h2>{props.renk}</h2>
            <h3>{props.arac.marka}</h3>
            <button onClick={tikla}>Tıkla 1</button>
            <button onClick={() => tiklaa("Mı?")}>Tıkla 2</button>
            <button onClick={(event) => tiklaa2("Mı?", event)}>Tıkla 2</button>
        </div>
    )
}

export default Yeni;