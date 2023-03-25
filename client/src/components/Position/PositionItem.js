import React from 'react'
import position from '../../img/position.png'
import { useDispatch, useSelector } from 'react-redux'
import { deletePositionThunk } from './Position-thunks'
const PositionItem = ({
  post = {
    _id: 123,
    title: 'Software Development Engineer',
    description: 'Amazon',
    location: 'Boston,MA',
    jobDescription: '',
  },
}) => {
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const deletePositionHandler = (id) => {
    dispatch(deletePositionThunk(id))
  }

  return (
    <li className="list-group-item pt-2">
      <div className="row border ">
        <div className="col-2  ">
          <img
            width={30}
            className="float pt-2 rounded-pill "
            alt={'position'}
            src={position}
          />
        </div>

        <div className="col-10 pt-1 pb-1 pe-0">
          <i
            className="bi bi-x-lg float-end"
            onClick={
              user.type === 'Admin'
                ? () => deletePositionHandler(post._id)
                : null
            }
          ></i>

          <div className="ps-3 fw-bolder">{post.title}</div>
          <div className="ps-3 fw-bolder">{post.location}</div>

          <div className="text-secondary  ps-3 pe-1  wd-text-post-small">
            Description: {post.jobDescription}
          </div>
        </div>
      </div>
    </li>
  )
}

export default PositionItem
