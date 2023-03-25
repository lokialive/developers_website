import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'
import { connect } from 'react-redux'
import { deleteAccout } from '../../actions/profileActions'
class ProfileItem extends Component {
  onDeleteClick(user_id) {
    this.props.deleteAccout(user_id, this.props.history)
  }

  render() {
    const { profile, auth } = this.props

    let user_id = profile.user._id
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>{profile.status}</p>
            <p>
              {isEmpty(profile.location) ? (
                'No location.'
              ) : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              More Information
            </Link>
          </div>
          <div className="col-md-4 d-lg-block">
            <h4>Skills</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8"> </div>
          <div className="col-md-1">
            {auth.user.type === 'Admin' ? (
              <button
                onClick={this.onDeleteClick.bind(this, user_id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                Delete Account
              </button>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteAccout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteAccout })(ProfileItem)
