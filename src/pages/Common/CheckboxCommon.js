import React from 'react'

export default function CheckboxCommon({
    label,id,name,className,array,setArray
}) {
    const handleChange = (e, name) => {
        console.log(name, e.target.checked, array)
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
                    checked={array[name] || false}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
    )
}
