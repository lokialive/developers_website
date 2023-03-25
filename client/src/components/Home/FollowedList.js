import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { PropTypes } from 'prop-types'
import { getPosts } from '../../actions/postActions'
import { Link } from 'react-router-dom'
import './index.css'

class FollowedList extends Component {
  render() {
    const { profile } = this.props.profile

    let companyItems = null
    if (profile.followed && profile.followed.length > 0) {
      companyItems = profile.followed.map((company, index) => (
        <tr key={index}>
          <td>
            {' '}
            <Link to={`/companies/${company.companyId}`} className="no-deco">
              {index + 1}.
            </Link>
          </td>
          <td>
            <Link to={`/companies/${company.companyId}`} className="no-deco">
              {company.companyName}
            </Link>
          </td>
        </tr>
      ))
    }

    return (
      <div className="followed-company">
        <div className="module">
          <p className="module-title">Followed Companies</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'whitesmoke' }}>&nbsp; No. </th>
              <th style={{ color: 'whitesmoke' }}>&nbsp;Company Name</th>
            </tr>
            {companyItems}
          </thead>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { getPosts })(FollowedList)
