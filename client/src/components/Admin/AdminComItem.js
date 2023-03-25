import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import isEmpty from '../../validation/is-empty'
import { connect } from 'react-redux'
import { deleteAccout } from '../../actions/profileActions'
class AdminComItem extends Component {
  onDeleteClick(user_id) {
    this.props.deleteAccout(user_id, this.props.history)
  }

  render() {
    const { profile } = this.props

    let user_id = profile.user._id
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img className="rounded-circle" src={profile.user.avatar} alt="" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.companyName}</h3>
            <p>
              {isEmpty(profile.location) ? (
                'No location.'
              ) : (
                <span>{profile.location}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.yearFounded) ? (
                'No founded year.'
              ) : (
                <span>{profile.yearFounded}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.website) ? (
                'No website.'
              ) : (
                <span>{profile.website}</span>
              )}
            </p>
          </div>
          <div className="col-md-4 d-lg-block">
            <h4>Works</h4>
            <ul className="list-group">
              {profile.work.slice(0, 3).map((work, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {work.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-8"> </div>
          <div className="col-md-1">
            <button
              onClick={this.onDeleteClick.bind(this, user_id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    )
  }
}

AdminComItem.propTypes = {
  profile: PropTypes.object.isRequired,
  deleteAccout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteAccout })(AdminComItem)
