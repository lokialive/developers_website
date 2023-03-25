import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../../common/Spinner'
// import ProfileActives from './ProfileActives'
// import Experience from './Experience'
// import Education from './Education'
// import CompanyProfileActives from './CompanyProfileActives'
import Work from '../dashboard/Work'
import PostSummary from '../dashboard/PostSummary'
import FollowedList from './FollowedList'
// import Profiles from '../profiles/Profiles'

class LoginHome extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile

    let dashboardContent = <div></div>

    // console.log(this.props)
    // check id prfofile is null or loading is true
    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (user.type === 'Employer') {
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <div className="container">
                <div className="row user-list">
                  <div className="col-sm-8 user">
                    {/* <img
                      class="img-circle"
                      src="../../../public/img/position.png"
                      width="140"
                      height="140"
                    /> */}
                    <h2>Company Information</h2>
                    <p>
                      Location :{' '}
                      {profile.location ? profile.location : 'No location.'}
                    </p>
                    <p>
                      Industry :{' '}
                      {profile.industry ? profile.industry : 'No data.'}
                    </p>
                    <p>
                      Website : {profile.website ? profile.website : 'No data.'}
                    </p>
                    <p>phone : {profile.phone ? profile.phone : 'No data'}</p>
                    <p>
                      Introduction : {profile.bio ? profile.bio : 'No data'}
                    </p>
                  </div>
                </div>
                <br></br>
                <Work work={profile.work} />
                <br></br>
                <PostSummary />
              </div>
            </div>
          )
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome, {user.name}!</p>
              <p>There is no detail information, please add more!</p>
              <Link
                className="btn btn-lg btn-info"
                to="/create-company-profile"
              >
                Create My Profile
              </Link>
            </div>
          )
        }
      } else if (user.type === 'Employee') {
        if (Object.keys(profile).length > 0) {
          dashboardContent = (
            <div>
              <div className="container">
                <div className="row user-list">
                  <div className="col-sm-7 user">
                    {/* <img
                      class="img-circle"
                      src="../../img/user.jpeg"
                      width="140"
                      height="140"
                    /> */}
                    {/* <h2>Personal Information</h2>
                    <p>
                      Location :{' '}
                      {profile.location ? profile.location : 'No data.'}
                    </p>
                    <p>
                      Status : {profile.status ? profile.status : 'No data.'}
                    </p>
                    <p>
                      Current Company :{' '}
                      {profile.company ? profile.company : 'No data'}
                    </p> */}
                    <PostSummary />
                  </div>

                  {/* Company list */}
                  <div className="col-sm-5 user">
                    <FollowedList />
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome, {user.name}!</p>
              <p>There is no detail information, please add more!</p>
              <Link className="btn btn-lg btn-info" to="/create-profile">
                Create My Profile
              </Link>
            </div>
          )
        }
      } else {
        dashboardContent = (
          <p>
            You can go to Developers page to manage the developers accounts.
          </p>
        )
      }
      //check if ther is profile data exist
    }
    return (
      <div className="dashboard personal-home">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

LoginHome.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(LoginHome)
