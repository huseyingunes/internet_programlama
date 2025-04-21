import { useState, useEffect } from "react";

function TikKutusu(props)
{
    return(
        <div>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" readonly checked={props.tik} />
        </div>
    )
}
function Yapilacaklar() {
    const [yapilacaklar, setYapilacaklar] = useState([]);
    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setYapilacaklar(data));
    }, []);

    return (
        <div>
            <ul class="list-group">
                {yapilacaklar.map((yapilacak) => 
                <li class="list-group-item">
                    <TikKutusu tik={yapilacak.completed} />
                    {yapilacak.title}
                </li>)}
                /*
                <li class="list-group-item">
                    
                    An item 
                </li>
                */
            </ul>
        </div>
    )
}

export default Yapilacaklar;