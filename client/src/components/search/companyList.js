import React from 'react'
import { useSelector } from 'react-redux'
import CompanyItem from './companyItem.js'

const CompanyList = () => {
  const { companies, loading } = useSelector((state) => state.companies)
  return (
    <div className="company-list">
      <ul className="company-list list-group m-2">
        {loading && <li className="company-list loading">loading...</li>}
        {companies.map((company) => (
          <CompanyItem key={company.orb_num} company={company} />
        ))}
      </ul>
    </div>
  )
}
export default CompanyList
