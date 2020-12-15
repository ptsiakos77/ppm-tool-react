/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTask, updateTask } from '../../actions/taskActions'
import { resetErrors } from "../../actions/commonActions"
import classNames from 'classnames'
import { Multiselect } from 'multiselect-react-dropdown'
import './Task.css'

class UpdateTask extends Component {

    constructor() {
        super()
        this.state = {
            summary: "",
            description: "",
            status: "TO DO",
            labels: [],
            selectedValues: [],
            attachments: [],
            removedAttachments: [],
            progress: "",
            options: [{ name: 'backend', id: 1 }, { name: 'frontend', id: 2 },
            { name: 'performance', id: 3 }, { name: 'techdept', id: 4 },
            { name: 'ci', id: 5 }, { name: 'jenkins', id: 6 },
            { name: 'design', id: 7 }, { name: 'testing', id: 8 }]
        }
        this.fileInput = React.createRef();
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onRemoveAttachment = this.onRemoveAttachment.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const task = new FormData()
        task.append('summary', this.state.summary)
        task.append('description', this.state.description)
        task.append('status', this.state.status)
        for (const label of this.state.labels) {
            task.append('labels', label)
        }
        const attachments = this.fileInput.current.files
        for (const attachment of attachments) {
            task.append('attachments', attachment)
        }
        task.append('removedAttachments', this.state.removedAttachments)
        const taskId = this.props.history.location.pathname.split('/')[2]
        this.props.updateTask(taskId, task, true, this.props.history)
        this.setState({
            progress: "active"
        })
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSelect(e) {
        const labels = e.map(item => item.name)
        this.setState({
            labels
        })
    }

    onRemove(e) {
        const labels = e.map(item => item.name)
        this.setState({
            labels
        })
    }

    onRemoveAttachment(e) {
        const parent = e.target.parentElement
        parent.style.display = 'none'
        const removedAttachment = parent.getAttribute('value')
        this.setState({
            removedAttachments: [...this.state.attachments, removedAttachment]
        })
    }

    componentWillReceiveProps(nextProps) {
        const { summary, description, status, labels } = nextProps.task
        const selectedValues = labels?.map((label) => { return { name: label } })
        this.setState({
            progress: ""
        })
        if (!nextProps.errors.name && !nextProps.errors.description) {
            this.setState({
                summary, description, status, labels, selectedValues
            })
        }
    }

    componentDidMount() {
        this.props.resetErrors()
        var elems = document.querySelectorAll('select');
        // eslint-disable-next-line no-undef
        M.FormSelect.init(elems)
        const taskId = this.props.history.location.pathname.split('/')[2]
        this.props.getTask(taskId)
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
                                <input id="summary" type="text" className={classNames({ "validate": !errors?.summary, "invalid": errors?.summary })} name="summary" value={this.state.summary} onChange={this.onChange} />
                                <label htmlFor="summary" className="active">Summary</label>
                                <p className="invalid-feedback">{errors?.summary?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <textarea id="description" className={classNames({ "materialize-textarea": true, "validate": !errors?.description, "invalid": errors?.description })} value={this.state.description} name="description" onChange={this.onChange}></textarea>
                                <label htmlFor="description" className="active">Description</label>
                                <p className="invalid-feedback">{errors?.description?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <select id="status" name="status" value={this.state.status} onChange={this.onChange}>
                                    <option value="TO DO" defaultValue>TO DO</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="IN REVIEW">IN REVIEW</option>
                                    <option value="DONE">DONE</option>
                                </select>
                                <label htmlFor="status" className="active">Status</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <Multiselect options={this.state.options}
                                    style={{
                                        searchBox: { border: 'none' },
                                        chips: {
                                            background: '#4db6ac'
                                        },
                                        option: {
                                            color: '#26a69a'
                                        }
                                    }}
                                    displayValue="name"
                                    selectedValues={this.state.selectedValues}
                                    avoidHighlightFirstOption="true"
                                    onSelect={this.onSelect}
                                    onRemove={this.onRemove}
                                />
                                <label htmlFor="labels" className="active">Labels</label>
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="attachments" className="active" style={{ paddingLeft: '10px' }}>Attachments</label>
                            {(this.props.task?.attachments?.length > 0) ?
                                (<p name="attachments" style={{ paddingLeft: '10px' }}>{this.props.task?.attachments?.map((attachment) => {
                                    return <span id='card_attachments'
                                        className="btn-small teal lighten-2"
                                        value={attachment}
                                        style={{ paddingLeft: '10px', marginRight:'10px' }}>
                                        <i onClick={this.onRemoveAttachment} className="material-icons right">delete_forever</i>
                                        {attachment.substring(attachment.lastIndexOf('/') + 1)}
                                    </span>
                                })}</p>)
                                : <div></div>}
                            <div className="row">
                                <div className="file-field input-field col s6">
                                    <div className="btn" style={{ marginLeft: '10px' }} >
                                        <span>Files</span>
                                        <input type="file" id="attachments" name="attachments" ref={this.fileInput} multiple />
                                    </div>
                                    <div className="file-path-wrapper" >
                                        <input className="file-path validate" type="text" placeholder="Upload file" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Update
                        <i className="material-icons right">send</i>
                        </button>
                    </form>
                    <div className="row">
                        <div className={"preloader-wrapper " + this.state.progress} style={{ marginTop: "20px", marginLeft: "20px" }}>
                            <div className="spinner-layer spinner-green-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.error.errors,
    task: state.task.selectedTask
})

export default connect(mapStateToProps, { getTask, updateTask, resetErrors })(UpdateTask)