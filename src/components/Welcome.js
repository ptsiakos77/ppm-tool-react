import React, { Component } from 'react'

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Welcome!</span>
                <p>There are no {this.props.type}s created yet. Start by creating some!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

