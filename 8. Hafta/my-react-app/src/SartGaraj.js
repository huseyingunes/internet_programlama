function SartGaraj(props)
{
    const arabalar = props.arabalar;
    return (
      <>
        <h1>Garaj</h1>
        {arabalar.length > 0 &&
          <h2>
            Garajında {arabalar.length} aracın var.
          </h2>
        }
      </>
    );
}

export default SartGaraj;