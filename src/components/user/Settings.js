import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { getUserInfo, updateUser, enable2FA } from "../../actions/userActions"
import { resetErrors } from "../../actions/commonActions"

class Settings extends Component {

  constructor() {
    super()
    this.state = {
      email: "",
      fullName: "",
      password: "",
      company: "",
      address: "",
      has2fa: false,
      secret2fa: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChange2FA = this.onChange2FA.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const user = this.state
    this.props.updateUser(user, this.props.history)
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onChange2FA() {
    this.setState({
      has2fa: !this.state.has2fa
    })
    if (!this.state.has2fa) {
      this.props.enable2FA()
    } else {
      this.setState({
        secret2fa: null
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { email, fullName, company, address, has2fa, secret2fa } = nextProps.user
    if (!nextProps.errors.email && !nextProps.errors.fullName) {
      this.setState({
        email, fullName, company, address, has2fa, secret2fa
      })
    }
  }

  componentDidMount() {
    this.props.getUserInfo()
  }

  render() {
    const errors = this.props.errors
    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input id="fullName" type="text" className={classNames({ "validate": !errors.fullName, "invalid": errors.fullName })} value={this.state.fullName} onChange={this.onChange} />
              <label htmlFor="fullName" className="active">Name</label>
              <p className="invalid-feedback">{errors.fullName?.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="email" type="text" className={classNames({ "validate": !errors.email, "invalid": errors.email })} value={this.state.email} onChange={this.onChange} />
              <label htmlFor="email" className="active">Email</label>
              <p className="invalid-feedback">{errors.email?.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="password" type="password" className={classNames({ "validate": !errors.password, "invalid": errors.password })} value={this.state.password} onChange={this.onChange} />
              <label htmlFor="password" className="active">Password</label>
              <p className="invalid-feedback">{errors.password?.message}</p>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="company" type="text" className="validate" value={this.state.company} onChange={this.onChange} />
              <label htmlFor="company" className="active">Company</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="address" type="text" className="validate" value={this.state.address} onChange={this.onChange} />
              <label htmlFor="address" className="active">Address</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <label>
                <input id="has2fa" type="checkbox" checked={this.state.has2fa} onClick={this.onChange2FA} />
                <span>Enable 2FA</span>
              </label>
            </div>
          </div>
          {(this.state.secret2fa?.qr) ? <div><img src={this.props.user.secret2fa?.qr} alt="" /></div> : <div></div>}
          <button className="btn waves-effect waves-light" type="submit" name="action" style={{ marginTop: '50px' }}>Update info
          <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  errors: state.error.errors,
  user: state.user.user,
})

export default connect(mapStatetoProps, { getUserInfo, updateUser, resetErrors, enable2FA })(Settings)

