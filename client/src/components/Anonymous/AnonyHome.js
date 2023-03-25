import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Spinner from '../../common/Spinner'
import { getProfiles } from '../../actions/profileActions'
import AnonyProfileItem from './AnonyProfiles'
import AnonyCompanyItem from './AnonyCom'
import SearchComponent from '../search/index'
import LoginHome from '../Home/LoginHome'

class AnonyProfiles extends Component {
  // Get data
  componentDidMount() {
    this.props.getProfiles()
  }
  render() {
    const { profiles, loading } = this.props.profile
    let developers
    let companies
    const { isAuthenticated, user } = this.props.auth
    let personalHome = null
    if (isAuthenticated) {
      personalHome = <LoginHome />
    }
    if (profiles === null || loading) {
      developers = <Spinner />
    } else {
      if (profiles.length > 0) {
        developers = profiles
          .filter((profile) => profile.type === 'Employee')
          .slice(0, 4)
          .map((profile) => (
            <AnonyProfileItem key={profile._id} profile={profile} />
          ))
      } else {
        developers = <h4>Currently, there is not developer info...</h4>
      }
    }

    if (profiles === null || loading) {
      companies = <Spinner />
    } else {
      if (profiles.length > 0) {
        companies = profiles
          .filter((profile) => profile.companyName)
          .slice(0, 4)
          .map((profile) => (
            <AnonyCompanyItem key={profile._id} profile={profile} />
          ))
      } else {
        companies = <h4>Currently, there is not developer info...</h4>
      }
    }

    return (
      // <div>
      //   <div className="profiles">
      //     <div className="row">
      //       <div className="col">
      //         <h3 style={{ textAlign: 'center' }}>Developers</h3>
      //       </div>
      //       <div className="col">
      //         <h3 style={{ textAlign: 'center' }}>Companies</h3>
      //       </div>
      //     </div>

      //     <div className="container">
      //       <div className="row">
      //         <div className="col">{developers}</div>
      //         <div className="col">{companies}</div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div>
        <SearchComponent />
        {personalHome}
      </div>
    )
  }
}

AnonyProfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfiles })(AnonyProfiles)
