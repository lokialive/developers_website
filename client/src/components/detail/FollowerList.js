import React, { useEffect } from 'react'
import FollowerItem from './FollowerItem'
import { useDispatch, useSelector } from 'react-redux'
import { findFollowersThunk } from '../follower/Follower-thunk'
// import { getFollowers } from './follower-thunks'

const FollowerList = () => {
  const { company } = useSelector((state) => state.company)

  const dispatch = useDispatch()
  let companyId = company.orb_num
  useEffect(() => {
    console.log(companyId)
    dispatch(findFollowersThunk(companyId))
  }, [companyId])
  const { followers } = useSelector((state) => state.followers)
  const state = useSelector((state) => state)
  console.log(state)
  return (
    <ul className="list-group">
      {followers &&
        followers.map((follower) => (
          <FollowerItem key={follower._id} follower={follower} />
        ))}
    </ul>
  )
}
export default FollowerList
