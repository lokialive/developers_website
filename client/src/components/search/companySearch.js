import React, { useState } from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'
import { matchCompaniesThunk } from './search-thunks.js'
import CompanyList from './companyList.js'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ]

const CompanySearch = () => {
  return <div></div>
  //   const [searchTerm, setSearchTerm] = useState('')
  //   const dispatch = useDispatch()

  //   return (
  //     <div className="search">
  //       <div class="form__field">
  //         <Select
  //           value={searchTerm}
  //           onChange={(event) => setSearchTerm(event.target.value)}
  //           placeholder={'Search companies ...'}
  //           options={options}
  //         />
  //       </div>
  //       <div className="btn-search-div">
  //         <button
  //           className="btn-search"
  //           onClick={() => {
  //             dispatch(matchCompaniesThunk(searchTerm))
  //           }}
  //         >
  //           search
  //         </button>
  //       </div>
  //     </div>
  //   )
}

export default CompanySearch
