import { useState, useEffect } from "react";

function YorumSatiri(props) {
    return (
        <tr>
            <th scope="row">{props.yorum.postId}</th>
            <td>{props.yorum.id}</td>
            <td>{props.yorum.name}</td>
            <td>{props.yorum.email}</td>
            <td>{props.yorum.body}</td>
        </tr>
    )
}
function Yorumlar() {
    const [yorumlar, setYorumlar] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data => setYorumlar(data));
    }, []);

    return (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Comment</th>
                    </tr>
                </thead>
                <tbody>
                    {yorumlar.map((yorum) =>
                        <YorumSatiri yorum={yorum} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Yorumlar;