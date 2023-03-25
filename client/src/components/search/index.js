import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { matchCompaniesThunk } from './search-thunks.js'
import CompanyList from './companyList.js'
import './index.css'

const SearchComponent = () => {
  let [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const [showList, setShowList] = useState(false)
  // useEffect(()=> {
  //         dispatch(matchCompaniesThunk(searchTerm));
  //     }, [])
  return (
    <div>
      <div className="align">
        <div class="form form--search">
          <div class="form__field">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={'Search companies ...'}
            />
            <input type="submit" value="Search" />
          </div>
          <div className="btn-search-div">
            <button
              className="btn-search"
              onClick={() => {
                setShowList(true)
                dispatch(matchCompaniesThunk(searchTerm))
              }}
            >
              search
            </button>
          </div>
        </div>
        {showList ? <CompanyList /> : null}
      </div>

      {/* <div className="align">
        <div className="form__field">
          <input
            value={searchTerm}
            className="search-bar form-control  ps-5"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={'Search companies ...'}
          />
          <i
            className="bi bi-search position-absolute
                           wd-magnifier-nudge-up"
            style={{ color: 'black', height: '30px' }}
          ></i>
        </div>
        <div className="col-1">
          <button
            className="search-button btn btn-primary rounded-pill"
            onClick={() => {
              dispatch(matchCompaniesThunk(searchTerm))
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default SearchComponent
