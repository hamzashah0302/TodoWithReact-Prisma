import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LogoutAction } from './store/action/todoAction'
import { logoutSvg } from './Icons/logoutSvg'


export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const isLoggedin = useSelector(state => state.isLoggedin)
    console.log("check redux ", isLoggedin)

    const logout = () => {
        localStorage.removeItem('user_data')
        dispatch(LogoutAction())
        history.push('/')
    }


    let user_name = ''
    if (localStorage.getItem('user_data'))
        user_name = JSON.parse(localStorage.getItem('user_data')).name
    // return null


    return (
        <nav className="w-full p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-15 fixed top-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
            <div className="flex flex-wrap items-center justify-between mx-auto px-4">
                <a href="" className="flex items-center">
                    <img src="https://www.egenienext.com/wp-content/themes/egenienext/images/logo.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo" />
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {isLoggedin ?
                            <li>
                                <div>
                                    <p>
                                        Hi! {user_name.toUpperCase()}
                                    </p>
                                    <button onClick={() => { logout() }} className="py-2 pl-3 pr-4 text-white flex items-end bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" >Logout {logoutSvg()}
                                    </button>
                                </div>

                            </li>
                            :
                            <li>
                                <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" >Login</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    )
}
