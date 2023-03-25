import React, { useEffect } from 'react'
import PositionList from '../Position/PositionList'
import './company.css'
import background from '../../img/linkedin.png'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchCompanyThunk } from '../search/search-thunks.js'
import FollowerList from './FollowerList'
import { connect } from 'react-redux'
// import { followCompanyThunk } from '../search/search-thunks.js'
import { createFollowerThunk } from '../follower/Follower-thunk'
import { getCurrentProfile } from '../../actions/profileActions'
import { findFollowersThunk } from '../follower/Follower-thunk'

const CompanyComponent = () => {
  const { company, loading } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)
  const { pathname } = useLocation()
  const paths = pathname.split('/')
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  console.log(isAuthenticated)

  let companyId = company.orb_num
  const handleClick = () => {
    let data =
      company.orb_num +
      '-' +
      company.name.split('.')[0] +
      '-' +
      user.id +
      '-' +
      profile.handle

    console.log(data)
    dispatch(createFollowerThunk(data))
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])
  useEffect(() => {
    dispatch(fetchCompanyThunk(paths[2]))
  }, [])

  // useEffect(() => {
  //   let id = company.orb_num
  //   console.log(id)
  //   dispatch(fetchFollowerListThunk(id))
  // }, [company.orb_num])

  useEffect(() => {
    console.log(companyId)
    dispatch(findFollowersThunk(companyId))
  }, [companyId])
  const { followers } = useSelector((state) => state.followers)

  let followButton = (
    <button
      className="btn btn-success rounded-pill float-end pt-2"
      style={{ marginRight: '10px' }}
    >
      Follow
    </button>
  )
  if (!isAuthenticated) {
    followButton = (
      <button
        className="btn btn-success rounded-pill float-end pt-2"
        style={{ marginRight: '10px' }}
        onClick={() => {
          alert('Please sign in first to follow a company.')
        }}
      >
        Follow
      </button>
    )
  } else if (user.type === 'Employer' || user.type === 'Admin') {
    followButton = null
  } else {
    followButton = (
      <button
        className="btn btn-success rounded-pill float-end pt-2"
        style={{ marginRight: '10px' }}
        onClick={() => {
          handleClick()
        }}
      >
        Follow
      </button>
    )
  }

  return (
    <div className="ps-5 pe-5">
      {loading && <li className="list-group-item">loading...</li>}
      <li className="list-group-item">
        <div>
          <img
            width={'100%'}
            className="position-relative pe-0 pt-2 pb-2 "
            alt={'post-img'}
            src={background}
          />
          <img
            style={{ width: 80, height: 80 }}
            className="position-absolute  wd-nudge-up  rounded-2"
            alt={'user'}
            src={company.favicon}
          />
        </div>

        <div className="fw-bolder  pb-2 h2 row">
          <div className="col-10">{company.name}</div>
          <div className="col-2">
            {/* add follow click */}
            {followButton}
          </div>
        </div>

        <div className="text-secondary  pe-1 pt-1 pb-2  wd-text-post-small">
          {company.description}
        </div>

        <div>
          <label className="pe-5 pt-2 text-secondary">
            <i className="bi bi-briefcase-fill"></i> {company.industry}
          </label>
          <label className="pe-5 pt-2 text-secondary">
            <i className="bi bi-people-fill"></i> Employees:{' '}
            {company.employees_range}
          </label>
        </div>

        <div>
          {/*<label className="pe-5 pt-3 text-secondary" >Location: {company.address}</label>*/}
          <label className="pe-5 pt-2 pb-2 text-secondary">
            <i className="bi bi-calendar-check-fill pe-1"></i>Founded:{' '}
            {company.year_founded}
          </label>
        </div>

        <div>
          <button className="btn btn-outline-info rounded-pill">
            <a
              href={`${company.website}`}
              className="ps-2 pe-2 pt-3 fw-bold text-primary"
            >
              Visit Website
              <i className="ps-2 bi bi-box-arrow-up-right"></i>
            </a>
          </button>
        </div>

        <div>
          <label className=" ps-1 pe-5 pt-3 text-secondary">
            Followers: {followers ? followers.length : 0}
          </label>
        </div>

        <div className="fw-bolder pt-3 pe-5">Opening Job Position</div>
      </li>

      <PositionList />
      <div className="fw-bolder pt-3 pe-5">Followers</div>
      <FollowerList />
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps)(CompanyComponent)
