import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Spinner from '../../common/Spinner'
import { getProfiles } from '../../actions/profileActions'
import AdminComItem from './AdminComItem'
class AdminCompanies extends Component {
  // Get data
  componentDidMount() {
    this.props.getProfiles()
  }
  render() {
    const { profiles, loading } = this.props.profile
    let profileItems

    if (profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if (profiles.length > 0) {
        profileItems = profiles
          .filter((profile) => profile.type === 'Employer')
          .map((profile) => (
            <AdminComItem key={profile._id} profile={profile} />
          ))
      } else {
        profileItems = <h4>Currently, there is not company account...</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">All Companies Profile</h1>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminCompanies.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(AdminCompanies)
