import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import TodoReducer from './reducer/todoReducer';

export const store = createStore(
    TodoReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__()
 )