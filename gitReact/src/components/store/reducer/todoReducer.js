import { isSignin } from "../../utils/auth"

const TodoReducer = (state = {isLoggedin : isSignin()}, action) => {
    switch (action.type) {
        case 'LOGIN': return {isLoggedin :true}
        case 'LOGOUT': return {isLoggedin :false}
        
        default: return state
    }
}
export default TodoReducer;