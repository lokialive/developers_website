import React from 'react'
import { Link } from 'react-router-dom'

const CompanyProfileActives = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-company-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Personal
        Information
      </Link>
      <Link to="/add-work" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Work Position
      </Link>
    </div>
  )
}

export default CompanyProfileActives
