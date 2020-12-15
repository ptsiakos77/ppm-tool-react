const initialState = {
    projects: [], selectedProject: {}
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_PROJECTS": {
            return {
                ...state, projects: action.payload
            }
        }
        case "GET_PROJECT": {
            return {
                ...state, selectedProject: action.payload
            }
        }
        case "VIEW_PROJECT": {
            return {
                ...state, projects: action.payload
            }
        }
        case "DELETE_PROJECTS": {
            return {
                ...state, projects: state.projects.filter(project => project._id !== action.payload)
            }
        }
        case "UPDATE_PROJECT": {
            const updatedProject = action.payload
            const projectToUpdate = state.projects.find(project => project._id === updatedProject._id)
            const index = state.projects.indexOf(projectToUpdate)
            const newProjectList = [...state.projects]
            newProjectList[index] = updatedProject
            return {
                ...state, newProjectList
            }
        }
        default: return state
    }
}

export default projectReducer