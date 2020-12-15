import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchTaskBar from './SearchTaskBar'
import TaskItem from './TaskItem'
import { getAllDBTasks } from '../../actions/taskActions'

class TaskDB extends Component {

  constructor() {
    super()
    this.state = {
      foundTasks: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      foundTasks: nextProps.tasks
    })
  }

  componentDidMount() {
    this.props.getAllDBTasks()
  }

  render() {
    return (
      <div>
        <SearchTaskBar></SearchTaskBar>
        <div className="wrapper">
          <div id="items" className="row">
            <div className="col s3" >
              {this.state.foundTasks.map(task => {
                return <TaskItem key={task._id} id={task._id} summary={task.summary} description={task.description} labels={task.labels} attachments={task.attachments} showOnly='true'></TaskItem>
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  tasks: state.task.dBTasks,
})

export default connect(mapStatetoProps, { getAllDBTasks })(TaskDB)