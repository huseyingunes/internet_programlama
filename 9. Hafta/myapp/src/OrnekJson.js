import React, { useState, useEffect } from 'react';

function OrnekJson(){
    const [veri, setVeri] = useState([]);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setVeri(data));
    return(
        <div>
            <ul>
                {veri.map((kisi) => <li>{kisi.name}</li>)}  
            </ul>
        </div>
    )
}

export default OrnekJson;