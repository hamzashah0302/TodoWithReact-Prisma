import React from 'react'

const options = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
]

export const EditableRow = ({ handleEditFormChange, editContent }) => {
    return (
        <div className='flex justify-between '>
            <input
                className='border text-grey-darkest rounded-lg p-1 w-[30%]'
                type="text"
                required="required"
                name="name"
                value={editContent.name}
                onChange={handleEditFormChange}
            ></input>
            <select name="day" value={editContent.day ? editContent.day : ''} onChange={handleEditFormChange} required className='border text-grey-darkest rounded-lg p-1 w-[30%]'>
                <option value="" disabled>
                    Select a Day...
                </option>
                {options.map(item => (
                    <option name='day' value={item.value} key={item.label}>
                        {item.label}
                    </option>
                ))}
            </select>
            <button type="submit" className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Save</button>
        </div>
    )
}
