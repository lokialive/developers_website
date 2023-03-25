import React from 'react'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

const CompanyItem = ({
  company = {
    name: 'Northeastern University',
    orb_num: '',
    city: 'Boston',
    state: 'Massachusetts',
    fetch_url: '',
  },
}) => {
  // const dispatch = useDispatch();
  return (
    <li className="company-list">
      <div className="row">
        <div className="col-10">
          <h6>{company.name}</h6>
          ID: {company.orb_num}
          <span>
            {' '}
            {company.city}, {company.state}
          </span>
        </div>
        <div className="col-2">
          <Link to={`/companies/${company.orb_num}`} className="btn btn-detail">
            See Details
          </Link>
        </div>
      </div>
    </li>
  )
}

export default CompanyItem
