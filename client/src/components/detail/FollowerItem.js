import React from 'react'
import user from '../../img/user.jpeg'
import { Link } from 'react-router-dom'
const FollowerItem = ({ follower }) => {
  console.log(follower)
  return (
    <li className="list-group-item pt-2">
      <div className="row border ">
        <div className="col-2  ">
          <img
            width={30}
            className="float pt-2 rounded-pill "
            alt={'position'}
            src={user}
          />
        </div>

        <div className="col-10 pt-1 pb-1 pe-0">
          <div className="ps-3 fw-bolder">
            <Link to={`/profile/${follower.userHandle}`}>
              {follower.userHandle}
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default FollowerItem
