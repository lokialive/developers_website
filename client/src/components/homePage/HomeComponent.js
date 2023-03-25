import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import ProfileHeader from '../profile/ProfileHeader'
// import ProfileAbout from '../profile/ProfileAbout'
// import ProfileCreds from '../profile/ProfileCreds'
// import ProfileGithub from '../profile/ProfileGithub'
import { getProfileByHandle } from '../../actions/profileActions'
import Spinner from '../../common/Spinner'
import SavedList from '../savedItem/SavedList'

class HomeComponent extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent

    console.log(this.props)

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Return My Account
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="h5">My HomePage</div>
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>

        <div className="container">
          <div className="fw-bolder pt-2">Your Recent Saved Item:</div>

          <div className="row">
            <div className="col-md-12  pt-2">
              <SavedList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HomeComponent.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { getProfileByHandle })(HomeComponent)
