import React, { Component } from 'react'
import ProjectItem from './project/ProjectItem'
import Welcome from './Welcome'
import { getProjects } from '../actions/projectActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const projects = this.props.projects
        return (
            <div>
                {
                    (projects.length === 0) ? <Welcome type="project"></Welcome> : projects.map((project) => {
                        return <ProjectItem key={project._id} id={project._id} name={project.name} description={project.description} ></ProjectItem>
                    })
                }
                <div className="row">
                    <div className="col s12 m4">
                        <Link to="/createProject" className="waves-effect waves-light btn">Create
                            <i className="material-icons right">add_box</i>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    projects: state.project.projects
})

export default connect(mapStatetoProps, { getProjects })(Dashboard)