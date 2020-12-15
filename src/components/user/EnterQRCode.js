import React, { Component } from 'react'
import { login } from "../../actions/userActions"
import { resetErrors } from "../../actions/commonActions"
import { connect } from 'react-redux'
import classNames from 'classnames'

class EnterQRCode extends Component {

  constructor() {
    super()
    this.state = {
      qrcode: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user'))
    user.qrcode = this.state.qrcode
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
                <i className="material-icons prefix">phone_android</i>
                <input id="qrcode" type="text" className={classNames({ "validate": !errors.message, "invalid": errors.message })} value={this.state.qrcode} onChange={this.onChange} />
                <label htmlFor="qrcode">QRCode</label>
                <p className="invalid-feedback">{errors?.message}</p>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action" >Submit
                        <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.error.errors,
})

export default connect(mapStateToProps, { login, resetErrors })(EnterQRCode)