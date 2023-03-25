// rcc: react class compnent
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { PropTypes } from 'prop-types'
import { clearCurrentProfile } from '../../actions/profileActions'
class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    // window.location.href('http://localhost:3000/')
    this.props.clearCurrentProfile()
    this.props.logoutUser(this.props.history)
    window.location.href = '/'
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href=""
            className="nav-link"
            onClick={this.onLogoutClick.bind(this)}
          >
            {' '}
            Log Out
          </Link>
        </li>
      </ul>
    )

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Sign In
          </Link>
        </li>
      </ul>
    )
    let developersLink
    if (isAuthenticated) {
      developersLink = (
        <Link className="nav-link" to="/profiles">
          Developers
        </Link>
      )
    } else {
      developersLink = <div></div>
    }

    if (isAuthenticated) {
      developersLink = (
        <Link className="nav-link" to="/profiles">
          Developers
        </Link>
      )
    } else {
      developersLink = <div></div>
    }

    let companyLink = <div></div>
    if (isAuthenticated && user.type === 'Admin') {
      companyLink = (
        <Link className="nav-link" to="/admin-companies">
          Companies
        </Link>
      )
    }

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link
              className="navbar-brand"
              style={{ color: 'rgba(255,255,255,.75)' }}
              to="/"
            >
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                {/* <Link className="navbar-brand" to="/search">
                  <li> Go!SearchCompany </li>
                </Link> */}
                <li className="nav-item">{developersLink}</li>
                <li className="nav-item">{companyLink}</li>
              </ul>
              {isAuthenticated ? authLinks : guestLink}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar,
)
