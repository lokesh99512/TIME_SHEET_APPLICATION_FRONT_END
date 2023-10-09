import React from 'react'

export default function CheckboxCommon({
    label,id,name,className,array,setArray
}) {
    const handleChange = (e, name) => {
        let newObj = {...array, [name]: e.target.checked}
        setArray(newObj);
    }
    return (
        <>
            <div className={`form-check ${className || ''}`}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    name={name}
                    onChange={(e) => handleChange(e, name)}
                    checked={array[name]}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
    )
}
