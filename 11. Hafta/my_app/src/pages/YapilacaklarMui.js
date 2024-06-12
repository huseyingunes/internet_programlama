import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function YapilacaklarMui() {
    const [yapilacaklar, setYapilacaklar] = useState([]);
    useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setYapilacaklar(data));
    }, []);

    return (
        <>
            <List>
                {yapilacaklar.map((yapilacak) => 
                <ListItem disablePadding>
                    <ListItemButton component="a" href={`/ygoster/${yapilacak.id}`}>
                
                        <ListItemText primary={yapilacak.title} />
                    
                    </ListItemButton>
                </ListItem>
                )}
            </List>
        </>
    )
}


export default YapilacaklarMui;