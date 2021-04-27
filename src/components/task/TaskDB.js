import React, {Component} from 'react'
import {connect} from 'react-redux'
import SearchTaskBar from './SearchTaskBar'
import TaskItem from './TaskItem'
import {getAllDBTasks} from '../../actions/taskActions'
import {orderBy} from 'lodash';

class TaskDB extends Component {

    constructor() {
        super()
        this.state = {
            foundTasks: [],
            sortParams: {
                direction: undefined,
                icon: 'arrow_circle_down'
            }
        }
        this.onClickSorting = this.onClickSorting.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            foundTasks: nextProps.tasks
        })
    }

    componentDidMount() {
        this.props.getAllDBTasks()
    }

    onClickSorting() {
        const {
            foundTasks,
            sortParams: {direction, icon}
        } = this.state;
        const sortDirection = direction === "asc" ? "desc" : "asc";
        const sortIcon = icon === "arrow_circle_up" ? "arrow_circle_down" : "arrow_circle_up";
        const sortedTasks = orderBy(foundTasks, ["summary"], [sortDirection]);
        this.setState({
            foundTasks: sortedTasks,
            sortParams: {
                direction: sortDirection,
                icon: sortIcon
            }
        })
    }

    render() {
        return (
            <div>
                <SearchTaskBar></SearchTaskBar>
                <div className="wrapper">
                    <div id="items" className="row">
                        <div className="col s3">
                            {this.state.foundTasks.map(task => {
                                return <TaskItem key={task._id} id={task._id} summary={task.summary}
                                                 description={task.description} labels={task.labels}
                                                 attachments={task.attachments} showOnly='true'></TaskItem>
                            })}
                        </div>
                        {this.state.foundTasks.length !== 0 ?
                            <div className="col s3" id="sort_area">
                                <a className="waves-effect blue-grey darken-1 btn-small left" id="sort_tasks"
                                   style={{marginTop: "8px"}} onClick={this.onClickSorting}><i
                                    className="material-icons right">{this.state.sortParams.icon}</i>Sort by Summary</a>
                            </div> : ""}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => ({
    tasks: state.task.dBTasks,
})

export default connect(mapStatetoProps, {getAllDBTasks})(TaskDB)
