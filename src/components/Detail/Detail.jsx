import React from "react";
import { useState, useEffect } from "react";
import './Detail.css'

function Detail({ label, value, valueKey, editing, handleEdit, handleSave, defaultValue = "Empty..." }) {
    const [inputValue, setInputValue] = useState(value); 

    useEffect(() => {
        setInputValue(value);
    }, [value]);
    return (
        <div onClick={() => handleEdit(valueKey)}>
        <strong>{label}:</strong>
        {editing === valueKey ? 
            <input 
                type="text" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onBlur={(e) => handleSave(valueKey, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave(valueKey, e.target.value)}
            /> :
            value || defaultValue
        }
    </div>
    );
}

export default Detail;
