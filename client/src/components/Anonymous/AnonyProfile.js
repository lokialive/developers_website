import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ProfileHeader from '../profile/ProfileHeader'
// import ProfileAbout from '../profile/ProfileAbout'

import { getProfileByHandle } from '../../actions/profileActions'
import Spinner from '../../common/Spinner'

class AnonyProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    const { profile, loading } = this.props.profile
    let profileContent

    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          {/* <ProfileAbout profile={profile} /> */}
          <h3>To view more, please sign in.</h3>
        </div>
      )
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

AnonyProfile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { getProfileByHandle })(AnonyProfile)
