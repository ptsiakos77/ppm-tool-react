/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTask, downloadAttachment } from '../../actions/taskActions'

class TaskItem extends Component {

    constructor() {
        super()
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.onAttachmentClick = this.onAttachmentClick.bind(this)
        this.dragStart = this.dragStart.bind(this)
        this.dragEnd = this.dragEnd.bind(this)
    }

    dragStart(e) {
        e.dataTransfer.setData("task", e.target.id);
        e.target.style.opacity = '0.4';
    }

    dragEnd(e) {
        e.target.style.opacity = '1';
    }

    onDeleteClick() {
        const toDelete = window.confirm("Are you sure you want to delete this task?")
        if (toDelete) {
            this.props.deleteTask(this.props.id)
        }
    }

    onAttachmentClick(e) {
        e.preventDefault()
        const fileName = e.target.innerHTML
        const key = e.target.getAttribute('value')
        downloadAttachment(fileName, key)
    }

    render() {
        return (
            <div id={this.props.id} draggable="true" className="card blue-grey darken-1" onDragStart={this.dragStart} onDragEnd={this.dragEnd}>
                <div className="card-content white-text">
                    <span id='card_title' className="card-title">{this.props.summary}</span>
                    <p id='card_description'>{this.props.description}</p>
                    {this.props.labels?.map((label) => { return <div id='card_label' className="btn-flat disabled" style={{ paddingLeft: '0px' }}>{label}</div> })}
                    {(this.props.attachments?.length > 0) ?
                        (<p>{this.props.attachments.map((attachment) => {
                            return <a id='card_attachments'
                                className="btn-flat"
                                onClick={this.onAttachmentClick}
                                value={attachment}
                                style={{ paddingLeft: '0px', color: '#afb42b' }}>
                                {attachment.substring(attachment.lastIndexOf('/') + 1)}
                            </a>
                        })}</p>)
                        : <div></div>}
                </div>
                {(!this.props.showOnly) ?
                    <div className="card-action">
                        <Link to={`/tasks/${this.props.id}/update`} className="waves-effect waves-light btn" id="btn_update_task">Edit
                        <i className="material-icons right">create</i>
                        </Link>
                        <a
                            onClick={this.onDeleteClick}
                            className="waves-effect waves-light btn"
                            id="btn_delete_task"
                            style={{ marginLeft: "20px" }}
                        >Delete
                        <i className="material-icons right">delete</i>
                        </a>
                    </div> : <div></div>}
            </div>
        )
    }
}

export default connect(null, { deleteTask })(TaskItem)