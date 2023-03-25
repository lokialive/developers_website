import { createSlice } from '@reduxjs/toolkit'
import { fetchCompanyThunk } from '../components/search/search-thunks.js'

const initialState = {
  company: [],
  loading: false,
}

const companiesSlice = createSlice({
  name: 'company',
  initialState,
  extraReducers: {
    [fetchCompanyThunk.pending]: (state) => {
      state.loading = true
      state.company = []
    },
    [fetchCompanyThunk.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.company = payload
    },
    [fetchCompanyThunk.rejected]: (state) => {
      state.loading = false
    },
  },
})

export default companiesSlice.reducer
