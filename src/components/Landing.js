import React, { Component } from 'react'
import logo from '../ppm_logo.png'; 

export default class Landing extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s5">
                    </div>
                    <div className="col s2">
                        <div className="card" id="welcome_card">
                            <div className="card-image">
                                <img src={logo} alt="Logo">
                                </img>    
                                </div>
                                <div className="card-content">
                                    <p>Welcome to PPM tool. Signup for free, or login if you already have an account</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
