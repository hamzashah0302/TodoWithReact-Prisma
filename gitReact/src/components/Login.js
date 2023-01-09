import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from './utils/axiosConfig'
import { isSignin } from './utils/auth';
import toast, { Toaster } from 'react-hot-toast';
import { LoginAction } from './store/action/todoAction';
import {useSelector, useDispatch} from 'react-redux'
import { Header } from './header';

export const Login = () => {
    const [usedata, setUserData] = useState({ email: '', password: '' })
    const history = useHistory()
    const dispatch = useDispatch()
    const isLoggedin = useSelector(state => state.isLoggedin)

    useEffect(() => {
        if (isLoggedin)
            history.push('/home')
    }, [])


    // handle login
    const handleLoginSubmit = async () => {
        let data = usedata;
        let res = await axios.post('/login', data)
        if (res.data.error) {
            return toast.error(res.data.error);
        }
        localStorage.setItem('user_data', await JSON.stringify(res.data));
        dispatch(LoginAction())
        history.push('/home')
        return toast.success('logged in!');
    }


    // input change handling
    const handleInputChange = ({ target }) => {
        let { value, name } = target;
        setUserData({ ...usedata, [name]: value })
    }

    
    return (
        <>
            {/* <Header /> */}
            <div className="flex items-center min-h-screen p-4 bg-gray-100 flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
                >
                    <div className="p-5 bg-white rounded-lg ">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                        <form className="flex flex-col space-y-5">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>

                            <div>
                                <button
                                    type="button" onClick={() => { handleLoginSubmit() }}
                                    className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    Log in
                                </button>
                                <p className="text-sm font-light text-gray-500 mt-3 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
                <Toaster />
            </div>
        </>

    )
}
