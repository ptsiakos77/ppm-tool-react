import React, { Component } from 'react'
import { updateProject, getProject } from "../../actions/projectActions"
import { resetErrors } from "../../actions/commonActions"
import { connect } from 'react-redux'
import classNames from 'classnames'

class UpdateProject extends Component {

    constructor() {
        super()
        this.state = {
            name: "",
            description: ""
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const projectId = this.props.history.location.pathname.split('/')[2]
        const updatedData = this.state
        this.props.updateProject(projectId, updatedData, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        const { name, description } = nextProps.project
        if (!nextProps.errors.name && !nextProps.errors.description) {
            this.setState({
                name, description
            })
        }
    }

    componentDidMount() {
        const projectId = this.props.history.location.pathname.split('/')[2]
        this.props.getProject(projectId)
        this.props.resetErrors()
    }

    render() {
        const errors = this.props.errors
        return (
            <div>
                <div className="row" style={{ marginTop: "20px" }}>
                    <form className="col s12" onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="name" type="text" className={classNames({ "validate": !errors.name, 'invalid': errors.name })} value={this.state.name} onChange={this.onChange} />
                                <label htmlFor="name" className="active">Name</label>
                                <p className="invalid-feedback">{errors.name?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="description" type="text" className={classNames({ 'validate': !errors.description, 'invalid': errors.description })} value={this.state.description} onChange={this.onChange} />
                                <label htmlFor="description" className="active">Description</label>
                                <p className="invalid-feedback">{errors.description?.message}</p>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Update
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.error.errors,
    project: state.project.selectedProject
})

export default connect(mapStateToProps, { updateProject, getProject, resetErrors })(UpdateProject)