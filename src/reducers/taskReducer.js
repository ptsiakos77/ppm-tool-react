const initialState = {
    tasks: [], selectedTask: {}, updatedTask: null, dBTasks: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TASKS": {
            return {
                ...state, tasks: action.payload, updatedTask: null
            }
        }
        case "GET_TASK": {
            return {
                ...state, selectedTask: action.payload
            }
        }
        case "UPDATE_TASK": {
            const updatedTask = action.payload
            const taskToUpdate = state.tasks.find(task => task._id === updatedTask._id)
            const index = state.tasks.indexOf(taskToUpdate)
            const newTaskList = [...state.tasks]
            newTaskList[index] = updatedTask
            return {
                ...state, newTaskList, updatedTask
            }
        }
        case "DELETE_TASK": {
            return {
                ...state, tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        }
        case "SEARCH_TASKS": {
            return {
                ...state, dBTasks: action.payload
            }
        }
        default: return state
    }
}

export default taskReducer