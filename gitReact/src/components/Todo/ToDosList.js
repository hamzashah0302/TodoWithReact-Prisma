import React, { useState } from 'react'
import { EditableRow } from './EditableRow'
import { ReadOnlyRow } from './ReadOnlyRow'
import {NoDataFound} from '../NoDataFound'

export const ToDosList = ({ toDosList, handleEditFormSubmit, deleteTodo, sortByDay }) => {
    const [editContent, setEditContact] = useState({})
    const [editRowIndex, setEditRowIndex] = useState(null)

    const handleEditRowSubmit = (event) => {
        event.preventDefault()
        handleEditFormSubmit(event, editRowIndex, editContent)
        setEditContact({});
        setEditRowIndex(null)
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        setEditContact({ ...editContent, [event.target.name]: event.target.value })
    }

    const setSelectedEditRow = (event, row, index) => {
        event.preventDefault();
        setEditContact(row);
        setEditRowIndex(index)
    }

    return (

        <div className='min-w-[50%] h-2/3  my-0 rounded px-6 pt-3 pb-3 mb-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-opacity-20 border-gray-200 bg-green-50'>
            <div className='flex justify-between'>
                <h4 className='font-mono'>Tasks {toDosList.length}</h4>
                {sortByDay && <h4 className='font-mono capitalize'>Sorted by <b>{sortByDay}</b></h4>}
            </div>
            <form onSubmit={handleEditRowSubmit} className="w-full h-90 overflow-auto" >
                {!toDosList.length && <NoDataFound/>}
                {toDosList.map((contact, i) => {
                    return (
                        <div key={i} className="py-1.5 px-4 my-1 rounded-lg border-gray-200 dark:border-gray-600 bg-slate-400 shadow bg-opacity-60 hover:bg-gradient-to-l hover:from-gray-200 hover:to-gray-300 bg-gradient-to-l from-gray-50 to-gray-150" >
                            {editRowIndex == contact.id ?
                                <EditableRow handleEditFormChange={handleEditFormChange} editContent={editContent} i={i} />
                                :
                                <ReadOnlyRow contact={contact} setSelectedEditRow={setSelectedEditRow} deleteTodo={deleteTodo} i={i} />
                            }

                        </div>
                    )
                }
                )}
            </form>
        </div>

    )
}
