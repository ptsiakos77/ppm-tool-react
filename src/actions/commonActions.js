const resetErrors = () => async dispatch => {
  dispatch({
    type: "GET_ERRORS",
    payload: {}
  })
}

export { resetErrors }