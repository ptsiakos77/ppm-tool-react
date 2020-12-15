import React, { Component } from 'react'
import { login } from "../../actions/userActions"
import { resetErrors } from "../../actions/commonActions"
import { connect } from 'react-redux'
import classNames from 'classnames'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const user = this.state
        this.props.login(user, this.props.history)
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
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="text" className={classNames({ "validate": !errors.message, "invalid": errors.message })} value={this.state.email} onChange={this.onChange} />
                                <label htmlFor="email">Email</label>
                                <p className="invalid-feedback">{errors?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">https</i>
                                <input id="password" type="password" className={classNames({ "validate": !errors.message, "invalid": errors.message })} value={this.state.password} onChange={this.onChange} />
                                <label htmlFor="password">Password</label>
                                <p className="invalid-feedback">{errors?.message}</p>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action" >Login
                        <i className="material-icons right">send</i>
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

export default connect(mapStateToProps, { login, resetErrors })(Login)