import { createSlice } from '@reduxjs/toolkit'

import {
  findFollowersThunk,
  createFollowerThunk,
} from '../components/follower/Follower-thunk'

const initialState = {
  followers: [],
  loading: false,
}

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  extraReducers: {
    [findFollowersThunk.pending]: (state) => {
      state.loading = true
      state.followers = []
    },
    [findFollowersThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.followers = payload
    },
    [findFollowersThunk.rejected]: (state) => {
      state.loading = false
    },

    [createFollowerThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.followers = payload
    },
  },
})

export default followersSlice.reducer
