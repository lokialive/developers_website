import axios from 'axios'
import {
    GET_COMPANIES,
    COMPANIES_LOADDING,
    GET_ERRORS,
} from './types'

// Add Posts Action


// Get Posts action
export const getCompanies = () => (dispatch) => {
    dispatch(setCompanyLoading)
    axios
        .get('/api/companies')
        .then((res) =>
            dispatch({
                type: GET_COMPANIES,
                payload: res.data,
            }),
        )
        .catch((err) =>
            dispatch({
                type: GET_COMPANIES,
                payload: null,
            }),
        )
}





// Like a Post Action By post id
export const addLike = (id) => (dispatch) => {
    axios
        .post(`/api/companies/like/${id}`)
        .then((res) => window.location.reload())
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            }),
        )
}

// Loading image
export const setCompanyLoading = () => {
    return {
        type: COMPANIES_LOADDING,
    }
}
