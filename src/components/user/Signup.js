import React, { Component } from 'react'
import { signUp } from "../../actions/userActions"
import { resetErrors } from "../../actions/commonActions"
import { connect } from 'react-redux'
import classNames from 'classnames'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            email: "",
            fullName: "",
            password: "",
            company: "",
            address: ""
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const user = this.state
        this.props.signUp(user, this.props.history)
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
                                <i className="material-icons prefix">account_circle</i>
                                <input id="fullName" type="text" className={classNames({ "validate": !errors.fullName, "invalid": errors.fullName })} value={this.state.fullName} onChange={this.onChange} />
                                <label htmlFor="fullName">Name</label>
                                <p className="invalid-feedback">{errors.fullName?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">email</i>
                                <input id="email" type="text" className={classNames({ "validate": !errors.email, "invalid": errors.email })} value={this.state.email} onChange={this.onChange} />
                                <label htmlFor="email">Email</label>
                                <p className="invalid-feedback">{errors.email?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">https</i>
                                <input id="password" type="password" className={classNames({ "validate": !errors.password, "invalid": errors.password })} value={this.state.password} onChange={this.onChange} />
                                <label htmlFor="password">Password</label>
                                <p className="invalid-feedback">{errors.password?.message}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">work</i>
                                <input id="company" type="text" className="validate" value={this.state.company} onChange={this.onChange} />
                                <label htmlFor="company">Company</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">home</i>
                                <input id="address" type="text" className="validate" value={this.state.address} onChange={this.onChange} />
                                <label htmlFor="address">Address</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Sign Up
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

export default connect(mapStateToProps, { signUp, resetErrors })(Signup)

