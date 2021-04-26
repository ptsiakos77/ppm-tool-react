/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/userActions'
import { getJWTToken } from '../helpers/securityUtils'

class Header extends Component {

    constructor() {
        super()
        this.onLogoutClick = this.onLogoutClick.bind(this)
        this.isLoggedIn = this.isLoggedIn.bind(this)
    }

    onLogoutClick() {
        this.props.logout()
    }

    isLoggedIn() {
        return this.props.isLoggedIn || getJWTToken() !== null
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper teal lighten-4">
                    <div id="app-logo" className="brand-logo">PMTool</div>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.isLoggedIn() ?
                            <div><li><Link to="/logout" id="logout" onClick={this.onLogoutClick}>Logout</Link></li>
                                <li><Link to="/dashboard" id="dashboard" >Dashboard</Link></li>
                                <li><Link to="/tasks/db" id="task_db" >TaskDB</Link></li>
                                <li><Link to="/settings" id="settings" >Settings</Link></li></div> :
                            <div><li><Link to="/login" id="login" >Login</Link></li> <li><Link to="/signup" id="signup">Sign Up</Link></li></div>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStatetoProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStatetoProps, { logout })(Header)
