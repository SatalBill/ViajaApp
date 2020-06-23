import { USER_LOGIN_SUCESS, USER_LOGOUT, USER_FIRST_LOGIN } from '../actions'

export default function userReducer(state = null, action) {
    switch (action.type) {
        case USER_LOGIN_SUCESS:
            return action.user
        case USER_FIRST_LOGIN:
            return "primeiro"
        case USER_LOGOUT:
            return null
        default:
            return state;
    }
}