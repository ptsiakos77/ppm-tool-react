/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import TaskItem from './TaskItem'
import { getTasks, updateTask } from '../../actions/taskActions'
import './Task.css'

class TaskList extends Component {

    constructor() {
        super()
        this.allowDrop = this.allowDrop.bind(this)
        this.drop = this.drop.bind(this)
    }

    allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        const dropStatus = e.target.getAttribute("status")
        if (dropStatus !== null) {
            e.target.classList.add('over')
        }
    }

    drop(e) {
        e.preventDefault()
        const taskId = e.dataTransfer.getData("task");
        const status = e.target.getAttribute("status")
        const task = new FormData()
        task.append('status', status)
        task.append('onDrop', true)
        if (status !== null) {
            this.props.updateTask(taskId, task)
            for (let el of document.querySelectorAll('div.drop')) {
                el.classList.remove('over')
            }
        }
    }

    componentDidMount() {
        const projectId = this.props.history.location.pathname.split('/')[2]
        this.props.getTasks(projectId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedTask) {
            const projectId = this.props.history.location.pathname.split('/')[2]
            this.props.getTasks(projectId)
        }
    }

    render() {
        const tasks = this.props.tasks
        return (
            <div>
                <div className="row teal lighten-2">
                    <div className="col s3">
                        <h6>TO DO</h6>
                    </div>
                    <div className="col s3">
                        <h6>IN PROGRESS</h6>
                    </div>
                    <div className="col s3">
                        <h6>IN REVIEW</h6>
                    </div>
                    <div className="col s3">
                        <h6>DONE</h6>
                    </div>
                </div>

                <div className="wrapper">
                    <div id="items" className="row">
                        <div id="to_do_items" drop="true" status='TO DO' className="group col s3 drop" onDrop={this.drop} onDragOver={this.allowDrop} >
                            {tasks.filter(task => task.status === 'TO DO').map(task => {
                                return <TaskItem key={task._id} id={task._id} summary={task.summary} description={task.description} labels={task.labels} attachments={task.attachments}></TaskItem>
                            })}
                        </div>
                        <div id="in_progress_items" drop="true" status='IN PROGRESS' className="group col s3 drop" onDrop={this.drop} onDragOver={this.allowDrop}>
                            {tasks.filter(task => task.status === 'IN PROGRESS').map(task => {
                                return <TaskItem key={task._id} id={task._id} summary={task.summary} description={task.description} labels={task.labels} attachments={task.attachments}></TaskItem>
                            })}
                        </div>
                        <div id="in_review_items" drop="true" status='IN REVIEW' className="group col s3 drop" onDrop={this.drop} onDragOver={this.allowDrop}>
                            {tasks.filter(task => task.status === 'IN REVIEW').map(task => {
                                return <TaskItem key={task._id} id={task._id} summary={task.summary} description={task.description} labels={task.labels} attachments={task.attachments}></TaskItem>
                            })}
                        </div>
                        <div id="done_items" drop="true" status='DONE' className="group col s3 drop" onDrop={this.drop} onDragOver={this.allowDrop}>
                            {tasks.filter(task => task.status === 'DONE').map(task => {
                                return <TaskItem key={task._id} id={task._id} summary={task.summary} description={task.description} labels={task.labels} attachments={task.attachments}></TaskItem>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    tasks: state.task.tasks,
    updatedTask: state.task.updatedTask
})

export default connect(mapStatetoProps, { getTasks, updateTask })(TaskList)