import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, Redirect , useHistory } from "react-router-dom";
export const ProtectedRoute = ({ component }) => {
    const history = useHistory()
    const Component = component
    const isLoggedin = useSelector(state => state.isLoggedin)
    return  !isLoggedin
                ?
                history.push('/')
                :
                <Component/>
}
