import React, { useState } from 'react'
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';
import { Todo } from '../Todo/todo';
import { Login } from '../Login';
import { SignUp } from '../SignUp';
import { Header } from '../header';


export const Router = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route
                    exact
                    path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route>
                    <ProtectedRoute
                        path="/home" component={Todo}>
                    </ProtectedRoute>
                </Route>
            </Switch>
        </>
    )
}
