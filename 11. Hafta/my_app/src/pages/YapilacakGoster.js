import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'

function YapilacakGoster() {
    const { todo_id } = useParams()
    const [yapilacak, setYapilacak] = useState([]);
    useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todo_id}`)
      .then(response => response.json())
      .then(data => setYapilacak(data));
    }, []);

    return (
        <div>
            <h2>Yapılacak Gösteriliyor</h2>
            <h3>{yapilacak.title}</h3>
        </div>
    )
}

export default YapilacakGoster;