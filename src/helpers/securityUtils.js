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

const handleForbidden = (res, history) => {
    if(res.status === 403) {
        history.push("/dashboard")
    }
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
    handleForbidden,
    authHeaders
}
