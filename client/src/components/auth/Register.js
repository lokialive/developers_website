import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { PropTypes } from 'prop-types'
import TextFieldGroup from '../../common/TextFieldGroup'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      // 添加用户类型 role： employee, employer, admin - 11.22-12:05
      type: '',
      password: '',
      password2: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      // 添加用户类型 type：
      type: this.state.type,
    }

    this.props.registerUser(newUser, this.props.history)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  render() {
    const { errors } = this.state
    // const { user } = this.props.auth;

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">Sign Up</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="We are using the gravatar global avatar. If you want to show your avatar, please rehister on the gavatar."
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                {/* role checkbox  for register 11.20- 12:16 */}

                <div>
                  <span>My role:</span>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type={'radio'}
                    value={'Employee'}
                    checked={this.state.type === 'Employee'}
                    onChange={this.onChange}
                    name="type"
                  />{' '}
                  Employee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type={'radio'}
                    value={'Employer'}
                    checked={this.state.type === 'Employer'}
                    onChange={this.onChange}
                    name="type"
                  />{' '}
                  Employer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type={'radio'}
                    value={'Admin'}
                    checked={this.state.type === 'Admin'}
                    onChange={this.onChange}
                    name="type"
                  />{' '}
                  Admin
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

// export default Register;
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
