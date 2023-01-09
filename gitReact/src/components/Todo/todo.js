import React, { useState, useRef, useEffect, } from 'react'
import { ToDosList } from './ToDosList'
import { Sidebar } from '../Sidebar';
import Select from "react-select";
import { isSignin } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import { Header } from '../header';
import toast, { Toaster } from 'react-hot-toast';
import axios from '../utils/axiosConfig'
import httpHeader from '../utils/httpHeader';

const options = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },

]
export const Todo = () => {
    const [ToDo, setToDoData] = useState({ name: "", day: "" })
    const [toDosList, setAddToDosList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [sortByDay, setSortByDay] = useState('')
    const selectInputRef = useRef();
    const history = useHistory()


    useEffect(() => {
        if (!isSignin())
            history.push('/')
        getUserTodos()
    }, [])


    const getUserTodos = async () => {
        let user = await JSON.parse(localStorage.getItem('user_data'))
        let { id } = user || {}
        let res = await axios.get(`/usertodos/${id}`, httpHeader())
        // console.log("check list", res);
        if (res.data) {
            setAddToDosList(res.data);
        }

    }


    const handleAddFormChange = (event, isSelect) => {
        if (isSelect) {
            // console.log("check select ", event)
            const fieldValue = event.value;
            const fieldName = isSelect
            const newFormData = { ...ToDo };
            newFormData[fieldName] = fieldValue;
            return setToDoData(newFormData);

        }
        event.preventDefault();
        const fieldValue = event.target.value;
        const fieldName = event.target.getAttribute("name");
        const newFormData = { ...ToDo };
        // console.log("state ", newFormData)
        newFormData[fieldName] = fieldValue;
        setToDoData(newFormData);
    };


    // handle add todo
    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        let data = { ...ToDo }
        let { email } = JSON.parse(localStorage.getItem('user_data'))
        // console.log("log", email,data.day );
        if (!data.day || !email) return toast.error('Please Select a Day')

        data.email = email
        try {
            let res = await axios.post('/add_todo', data, httpHeader())
            if (res.data.id) {
                getUserTodos()
                setToDoData({
                    ...ToDo, name: '', day: ''
                })
                toast.success("added!")
            }
        } catch (error) {
            toast.error(error.response?.data || "Someting went wrong!")
        }

    };


    // handle edit submit
    const handleEditFormSubmit = async (event, currentIndex, changedValue) => {
        let { name, day, id } = changedValue
        event.preventDefault();
        let res = await axios.post('/edit/todo', { name, day, id })
        if (res.data.error)
            return toast.error(res.data.error)
        toast.success('Updated!')
        getUserTodos()
    };


    // delete row
    const deleteTodo = async (event, id) => {
        event.preventDefault();
        const newContacts = [...toDosList];
        let res = await axios.post('/delete/tode', { id }, httpHeader())
        if (res.data.status) {
            getUserTodos()
            toast.success('Deleted!')
        }
        else {
            toast.error("Someting went wrong!")
        }

    }


    const daySelected = (day) => {
        let { value } = day
        setSortByDay(value)
        // console.log("day ", value)
    }


    const resetFilter = () => {
        setSortByDay('')
    }


    useEffect(() => {
        let list = [...toDosList]
        let filterlist = list.filter(ele => ele.day == sortByDay)
        setFilteredList(filterlist)
    }, [sortByDay])


    return (
        <div className='h-screen'>
            {/* <Header /> */}
            <div className='flex pt-10 h-full'>
                <Sidebar daySelected={daySelected} sortByDay={sortByDay} resetFilter={resetFilter} />
                <div className='container mx-auto bg-zinc-300 flex flex-col items-center py-8 bg-gradient-to-t from-cyan-300 to-blue-300 h-full'>
                    <div className='min-w-[50%] shadow-md rounded px-6 pt-6 pb-8 mb-4 bg-opacity-40 border-gray-200 bg-green-50' >
                        <h2 className='font-mono font-bold mb-2'>Add a Todo</h2>
                        <form onSubmit={handleAddFormSubmit} className='flex items-center flex-col w-full gap-1.5'>
                            <div className='flex w-full justify-between gap-1'>
                                <input
                                    className='border text-grey-darkest flex-1 rounded 
                                    border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-1/2 focus:ring-1 px-5 py-2'
                                    type="text"
                                    name="name"
                                    value={ToDo.name}
                                    required="required"
                                    placeholder="Enter a Todo name"
                                    onChange={handleAddFormChange}
                                />
                                <div className='w-1/2'>
                                    <select name="day" value={ToDo.day ? ToDo.day : ''} onChange={(e) => { handleAddFormChange(e) }} required className='border text-grey-darkest rounded h-full
                                    border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full focus:ring-1 px-5 py-2'>
                                        <option value="" disabled>
                                            Select a Day...
                                        </option>
                                        {options.map(item => (
                                            <option name='day' value={item.value} key={item.label}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>


                                    {/* <Select
                                        ref={selectInputRef}
                                        defaultValue={ToDo.day} 
                                        placeholder={'Enter Day'}
                                        onChange={(newValue) => { handleAddFormChange(newValue, 'day') }}
                                        options={options}
                                    /> */}
                                </div>

                            </div>

                            <button type="submit" className='text-white bg-blue-500 my-1 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-23 px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full transition ease-in-out delay-150 hover:scale-y-105'>Add</button>
                        </form>
                    </div>
                    <ToDosList toDosList={sortByDay ? filteredList : toDosList} handleEditFormSubmit={handleEditFormSubmit} deleteTodo={deleteTodo} sortByDay={sortByDay} />
                </div>
                <Toaster />
            </div>
        </div>
    )
}
