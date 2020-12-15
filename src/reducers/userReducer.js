const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state, isLoggedIn: true
            }
        }
        case "LOGOUT": {
            return {
                ...state, isLoggedIn: false
            }
        }
        case "GET_USER": {
            return {
                ...state, user: action.payload
            }
        }
        case "SET_USER": {
            return {
                ...state, user: action.payload
            }
        }
        case "ENABLE_2FA": {
            return {
                ...state, user: { ...state.user, has2fa: true, secret2fa: action.payload.secret2fa }
            }
        }
        default: return state
    }
}

export default userReducer