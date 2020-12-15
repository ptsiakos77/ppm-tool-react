import axios from 'axios'
import { authHeaders } from '../helpers/securityUtils'
import fileDownload from 'js-file-download';

const getTasks = (projectId) => async dispatch => {
    const res = await axios.get(`/api/projects/${projectId}/tasks`, authHeaders)
    const tasks = res.data.tasks
    dispatch({
        type: "GET_TASKS",
        payload: tasks
    })
}

const getTask = (taskId) => async dispatch => {
    const res = await axios.get(`/api/tasks/${taskId}`, authHeaders)
    const task = res.data.task
    dispatch({
        type: "GET_TASK",
        payload: task
    })
}

const downloadAttachment = (fileName, key) => {
    const params = {
        key
    }
    axios.get('/api/attachments', { ...authHeaders, params, responseType: 'blob' })
        .then((res) => fileDownload(res.data, fileName))
        .catch((err) => console.log(err))
}

const createTask = (projectId, task, history) => async dispatch => {
    try {
        const headers = { ...authHeaders.headers, "Content-Type": "multipart/form-data" }
        await axios.post(`/api/projects/${projectId}/tasks`, task, { headers })
        history.push(`/projects/${projectId}/tasks`)
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const updateTask = (taskId, updatedData, navigateBack, history) => async dispatch => {
    try {
        const headers = { ...authHeaders.headers, "Content-Type": "multipart/form-data" }
        const res = await axios.put(`/api/tasks/${taskId}`, updatedData, { headers })
        const updatedTask = res.data.task
        dispatch({
            type: "UPDATE_TASK",
            payload: updatedTask
        })
        if (navigateBack) {
            history.goBack()
        }
    } catch (err) {
        const errors = err.response.data.errors
        dispatch({
            type: "GET_ERRORS",
            payload: errors
        })
    }
}

const searchTask = (searchTerm) => async dispatch => {
    const params = {
        data: searchTerm
    }
    const res = await axios.get('/api/searchtasks', { ...authHeaders, params })
    const tasks = res.data.tasks
    dispatch({
        type: "SEARCH_TASKS",
        payload: tasks
    })
}

const getAllDBTasks = () => async dispatch => {
    const res = await axios.get('/api/alltasks', authHeaders)
    const tasks = res.data.tasks
    dispatch({
        type: "SEARCH_TASKS",
        payload: tasks
    })
}

const deleteTask = (taskId) => async dispatch => {
    await axios.delete(`/api/tasks/${taskId}`, authHeaders)
    dispatch({
        type: "DELETE_TASK",
        payload: taskId
    })
}

export { getTasks, getTask, downloadAttachment, createTask, updateTask, deleteTask, searchTask, getAllDBTasks }