import axios from 'axios'
import { setJWTToken, clearJWTToken } from '../helpers/securityUtils'
import { authHeaders } from '../helpers/securityUtils'
import ConfirmationMessage from '../components/common/ConfirmationMessage'

const signUp = (user, history) => async dispatch => {
    try {
        await axios.post('/api/register', user)
        history.push("/verifyAccount")
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const getUserInfo = () => async dispatch => {
    try {
        const res = await axios.get('/api/currentUser', authHeaders)
        const user = res.data.user
        dispatch({
            type: "GET_USER",
            payload: user
        })
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const updateUser = (updatedData, history) => async dispatch => {
    try {
        const res = await axios.put('/api/currentUser', updatedData, authHeaders)
        const user = res.data.user
        dispatch({
            type: "SET_USER",
            payload: user
        })
        ConfirmationMessage('User info updated successfully!')
        history.push("/dashboard")
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const login = (user, history) => async dispatch => {
    try {
        const res = await axios.post('/api/login', user)
        setJWTToken(res.data.token)
        dispatch({
            type: "LOGIN"
        })
        localStorage.removeItem('user')
        history.push("/dashboard")
    } catch (err) {
        if (err.response.data.message === 'QR Code Required') {
            localStorage.setItem('user', JSON.stringify(user));
            history.push("/enterqrcode")
        } else {
            const errors = err.response.data
            dispatch({
                type: "GET_ERRORS",
                payload: errors
            })
        }

    }
}

const logout = () => async dispatch => {
    clearJWTToken()
    localStorage.removeItem('user')
    dispatch({
        type: "LOGOUT"
    })
}

const enable2FA = () => async dispatch => {
    try {
        const res = await axios.get('/api/currentUser/enable2fa', authHeaders)
        dispatch({
            type: "ENABLE_2FA",
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

export {
    signUp,
    login,
    logout,
    getUserInfo,
    updateUser,
    enable2FA
}