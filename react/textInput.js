import React from "react";

const TextInput = (props) => {
    return (
        <label>
            {props.label}
            <input type="text" {... props}/> 
        </label>        
    )
}

export default TextInput;