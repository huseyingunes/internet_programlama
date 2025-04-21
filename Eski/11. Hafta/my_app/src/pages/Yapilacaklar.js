import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
                <Link to={`/ygoster/${yapilacak.id}`}>{yapilacak.title}</Link>                  
                    
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