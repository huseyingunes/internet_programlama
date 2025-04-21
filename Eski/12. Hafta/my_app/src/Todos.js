import { memo } from "react";
const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };

function Todos(props)
{
    return(
        <div>
            <h1 style={{color: "red", backgroundColor: "lightblue"}}>{props.todos}</h1>
            <h1 style={myStyle}>{Math.floor(Math.random() * 10) + 1}</h1>
        </div>
    )
}

export default memo(Todos)