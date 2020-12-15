const setJWTToken = (token) => {
    localStorage.setItem('jwtToken', token)
    authHeaders.headers.Authorization = `Bearer ${getJWTToken()}`
}

const getJWTToken = () => {
    return localStorage.getItem('jwtToken')
}

const clearJWTToken = () => {
    localStorage.removeItem('jwtToken')
    delete authHeaders.headers.Authorization 
}

const authHeaders = {
    headers: {
        'Authorization': `Bearer ${getJWTToken()}`
    }
}

export {
    setJWTToken,
    getJWTToken,
    clearJWTToken,
    authHeaders
}