import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
// import isEmpty from '../../validation/is-empty'
class AnonyProfileItem extends Component {
  render() {
    const { profile } = this.props
    const mystyle = {
      opacity: 0.6,
      // width: '50%',
    }
    return (
      <div>
        <div className="card card-body bg-dark mb-2" style={mystyle}>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-4 ">
              <h4>{profile.user.name}</h4>
              <p>{profile.location ? profile.location : 'No location.'}</p>
              <p>{profile.status ? profile.status : 'No status.'}</p>
              <Link
                to={`/profile/anony/${profile.handle}`}
                className="btn btn-info small"
              >
                More Information
              </Link>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <h4>Skills</h4>
              <ul className="list-group" style={{ opacity: '0.5' }}>
                {profile.skills.slice(0, 3).map((skill, index) => (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AnonyProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default AnonyProfileItem
