import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
// import isEmpty from '../../validation/is-empty'
class AnonyCompanyItem extends Component {
  render() {
    const { profile } = this.props
    const mystyle = {
      opacity: 0.6,
      // width: '50%',
    }
    let location = profile.location == null ? 'No location' : profile.location
    let yearFounded = profile.yearFounded
      ? profile.yearFounded
      : 'No founded year'
    return (
      <div>
        <div className="card card-body bg-dark mb-2" style={mystyle}>
          <div className="row">
            <div className="col-lg-6 col-md-4 col-4 ">
              <h4>{profile.companyName}</h4>
              <p>{location}</p>
              <p>{yearFounded}</p>
              {/* need to update */}
              <Link
                to={`/profile/anony/${profile.handle}`}
                className="btn btn-info small"
              >
                More Information
              </Link>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <h4>Work Position</h4>
              <ul className="list-group" style={{ opacity: '0.5' }}>
                {profile.work.slice(0, 3).map((work, index) => (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {work.title}
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

AnonyCompanyItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default AnonyCompanyItem
