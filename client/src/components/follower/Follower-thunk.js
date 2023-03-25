import { createAsyncThunk } from '@reduxjs/toolkit'
import * as service from './Follower-service'

export const findFollowersThunk = createAsyncThunk(
  'followerss/findFollowers',
  async (companyId) => {
    return await service.findFollowers(companyId)
  },
)

export const createFollowerThunk = createAsyncThunk(
  'followers/createFollower',
  async (data) => await service.createFollower(data),
)
