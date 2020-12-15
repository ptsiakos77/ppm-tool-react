import React, { Component } from 'react'
import { createProject } from "../../actions/projectActions"
import { resetErrors } from "../../actions/commonActions"
import { connect } from 'react-redux'
import classNames from 'classnames'

class CreateProject extends Component {

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
        const project = this.state
        this.props.createProject(project, this.props.history)
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount() {
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
                        <button className="btn waves-effect waves-light" type="submit" name="action">Create
                            <i className="material-icons right">add_box</i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.error.errors
})

export default connect(mapStateToProps, { createProject, resetErrors })(CreateProject)