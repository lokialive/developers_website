import { createAsyncThunk } from '@reduxjs/toolkit'
import * as service from './search-service.js'

export const matchCompaniesThunk = createAsyncThunk(
  'matchCompaniesbyName',
  async (name) => await service.matchCompaniesByName(name),
)

export const fetchCompanyThunk = createAsyncThunk(
  'fetchCompany',
  async (id) => await service.fetchCompanyByID(id),
)

export const fetchFollowerListThunk = createAsyncThunk(
  'fetchFollowerList',
  async (id) => await service.fetchFollowerListById(id),
)

export const followCompanyThunk = createAsyncThunk(
  'followCompany',
  async (data) => {
    console.log(data)
    await service.followCompany(data)
  },
)
