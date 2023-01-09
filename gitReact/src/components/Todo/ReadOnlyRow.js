import React from 'react'
import { editSvg } from '../Icons/editSvg'
import { deleteSvg } from '../Icons/deleteSvg'

export const ReadOnlyRow = ({contact ,setSelectedEditRow ,deleteTodo , i}) => {
    // console.log("content ", contact)
    return (
        <div className='flex justify-between'>
            <label className='flex-1 capitalize'>{contact.name}</label>
            <label className='font-mono flex-1 capitalize'>{contact.day}</label>
            <div className='flex gap-0.5'>
                <button type="button" onClick={(event) => { setSelectedEditRow(event, contact, contact.id) }} className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{editSvg()}</button>
                <button aria-label="Edit" type="button" onClick={(event) => { deleteTodo(event,contact.id) }} className='font-mono text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-1.5 text-center dark:bg-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>{deleteSvg()}</button>
            </div>

        </div>
    )
}
