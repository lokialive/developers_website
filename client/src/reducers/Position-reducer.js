import { createSlice } from '@reduxjs/toolkit'

import {
  findPositionsThunk,
  deletePositionThunk,
  createPositionThunk,
  updatePositionThunk,
} from '../components/Position/Position-thunks.js'

const initialState = {
  positions: [],
  loading: false,
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  extraReducers: {
    [findPositionsThunk.pending]: (state) => {
      state.loading = true
      state.positions = []
    },
    [findPositionsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.positions = payload
    },
    [findPositionsThunk.rejected]: (state) => {
      state.loading = false
    },

    [deletePositionThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.positions = state.positions.filter((t) => t._id !== payload)
    },

    [createPositionThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.positions.push(payload)
    },

    [updatePositionThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      const positionNdx = state.positions.findIndex(
        (t) => t._id === payload._id,
      )
      state.positions[positionNdx] = {
        ...state.positions[positionNdx],
        ...payload,
      }
    },
  },
})

export default positionsSlice.reducer
