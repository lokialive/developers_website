import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import PositionItem from './PositionItem'

import { findPositionsThunk } from './Position-thunks'

const PositionList = () => {
  const { positions } = useSelector((state) => state.positions)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findPositionsThunk())
  }, [])

  return (
    <ul className="list-group">
      {positions.map((position) => (
        <PositionItem key={position._id} post={position} />
      ))}
    </ul>
  )
}
export default PositionList
