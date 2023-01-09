import React from 'react'

export const Sidebar = ({ daySelected, sortByDay, resetFilter }) => {
    const days = [
        { value: "sunday", label: "Sunday" },
        { value: "monday", label: "Monday" },
        { value: "tuesday", label: "Tuesday" },
        { value: "wednesday", label: "Wednesday" },
        { value: "thursday", label: "Thursday" },
        { value: "friday", label: "Friday" },
        { value: "saturday", label: "Saturday" },
    ]
    return (
        <aside className="w-64 bg-gray-50 dark:bg-gray-800 flex-auto bg-opacity-60 border-gray-200 ">
            <div className="px-3 py-8 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2">
                    <li className='flex items-center'>
                        <a className="font-mono flex items-center p-2 text-base text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                            <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                            <span className="ml-3">Sort By Days</span>
                        </a>
                    </li>
                    <li className='flex justify-end'>
                        {sortByDay && <a onClick={() => { resetFilter() }} className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 hover:cursor-pointer h-6'>
                            Reset
                        </a>}
                    </li>
                    {days.map((day, i) => {
                        let { label, value } = day
                        return (
                            <li key={i} className={sortByDay == value ? "bg-gray-200 rounded-lg" : ''}>
                                <a onClick={() => { daySelected(day) }} className="font-mono flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer">
                                    <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </aside>

    )
}
