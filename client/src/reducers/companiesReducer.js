import { createSlice } from "@reduxjs/toolkit";
import {matchCompaniesThunk} from "../components/search/search-thunks.js";

const initialState = {
    companies: [],
    loading: false
}

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    extraReducers: {
        [matchCompaniesThunk.pending]:
            (state) => {
                state.loading = true
                state.companies = []
            },
        [matchCompaniesThunk.fulfilled]:
            (state, {payload}) => {
                state.loading = false
                state.companies = payload
            },
        [matchCompaniesThunk.rejected]:
            (state) => {
                state.loading = false
            }
    }
                                   });

export default companiesSlice.reducer;