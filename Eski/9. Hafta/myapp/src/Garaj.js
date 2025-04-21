function Arac(props)
{
    return (
        <li>{props.marka}</li>
    );

}

function Garaj()
{
    const araclar = ["TOGG", "Anadol", "BMC"]
    return (
        <ul>
       {araclar.map((arac) => <Arac marka={arac} />)}
       </ul>
    );
}

export default Garaj;