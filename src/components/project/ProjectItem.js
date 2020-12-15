/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteProject } from '../../actions/projectActions'
import { Link } from 'react-router-dom';

class ProjectItem extends Component {

    constructor() {
        super()
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }

    onDeleteClick() {
        const toDelete = window.confirm("Are you sure you want to delete this project?")
        if (toDelete) {
            this.props.deleteProject(this.props.id, this.props.history)
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">{this.props.name}</span>
                                <p>{this.props.description}</p>
                            </div>
                            <div className="card-action">
                                 <Link to={`projects/${this.props.id}/createTask`} className="waves-effect waves-light btn" id="btn_add_task">Add Task
                                    <i className="material-icons right">add_box</i>
                                    </Link>
                                 <Link to={`projects/${this.props.id}/tasks`} className="waves-effect waves-light btn" id="btn_view_tasks" style={{ marginLeft: "20px" }}>View Tasks
                                    <i className="material-icons right">remove_red_eye</i>
                                    </Link>
                                <Link to={`projects/${this.props.id}/update`} className="waves-effect waves-light btn" id="btn_update_project" style={{ marginLeft: "20px" }} >Edit
                                     <i className="material-icons right">create</i>
                                    </Link>
                                
                                <a className="waves-effect waves-light btn" id="delete_project" onClick={this.onDeleteClick} style={{ marginLeft: "20px" }}>Delete
                                    <i className="material-icons right">delete</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { deleteProject })(ProjectItem)