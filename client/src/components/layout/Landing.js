import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import AnonyHome from '../Anonymous/AnonyHome'
class Landing extends Component {
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push('/home')
    // }
  }

  render() {
    let anonyhome = <AnonyHome />
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="web-title">DevelopersMatch</h1>
                {/* <p className="lead"> Help developers match jobs! </p> */}
                {/* <hr /> */}
                {/* <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Register
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link> */}
              </div>
            </div>
            {anonyhome}
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Landing)
