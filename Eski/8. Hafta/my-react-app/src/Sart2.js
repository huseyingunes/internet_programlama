function Sart2(props)
{
    return(
        (props.sart)?
            <div>
                <h1>Şart2 - 1 Gerçekleşti</h1>
            </div>
                :
            <div>
                <h1>Şart2 - 1 Gerçekleşemedi</h1>
            </div>
    )
}

export default Sart2;