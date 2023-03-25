import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      // add type for login 11：20-13：20
      type: '',
      errors: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      // add new type element
    }
    // console.log(newUser);
    this.props.loginUser(newUser)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Use exist account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                {/* role checkbox for login   11.20- 13:16 */}

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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login)
