import axios from 'axios'
import { authHeaders, handleForbidden } from '../helpers/securityUtils'

const getProjects = () => async dispatch => {
    const res = await axios.get('/api/projects', authHeaders)
    const projects = res.data.projects
    dispatch({
        type: "GET_PROJECTS",
        payload: projects
    })
}

const getProject = (projectId, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/projects/${projectId}`, authHeaders)
        const project = res.data.project
        dispatch({
            type: "GET_PROJECT",
            payload: project
        })
    } catch(err) {
        handleForbidden(err.response, history) //Not ideal solution for centralized handling - TBR
    }
}

const createProject = (project, history) => async dispatch => {
    try {
        await axios.post(`/api/projects/`, project, authHeaders)
        history.push("/dashboard")
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const updateProject = (projectId, dataToUpdate, history) => async dispatch => {
    try {
        const res = await axios.put(`/api/projects/${projectId}`, dataToUpdate, authHeaders)
        const project = res.data.project
        dispatch({
            type: "UPDATE_PROJECT",
            payload: project
        })
        history.push("/dashboard")
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const deleteProject = (projectId) => async dispatch => {
    await axios.delete(`/api/projects/${projectId}`, authHeaders)
    dispatch({
        type: "DELETE_PROJECTS",
        payload: projectId
    })
}

export { createProject, getProjects, getProject, updateProject, deleteProject }
