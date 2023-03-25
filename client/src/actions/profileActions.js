import axios from 'axios'
import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  // SET_CURRENT_USER,
} from './types'

//Get Current User Profile Action
export const getCurrentProfile = () => (dispatch) => {
  // Loading image
  dispatch(setProfileLoading())
  axios('/api/profile')
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      }),
    )
}

// Get User Profile By handle
export const getProfileByHandle = (handle) => (dispatch) => {
  dispatch(setProfileLoading())
  axios(`/api/profile/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: null,
      }),
    )
}

// Create New Profile Action
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post('/api/profile', profileData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Delete Current Acount Action
export const deleteAccout = (user_id, history) => (dispatch) => {
  axios
    .delete(`/api/profile/${user_id}`)
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: '',
      }),
    )
}

// Add Experience Action
export const addExperience = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/experience', expData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

//Add work
export const addWork = (workData, history) => (dispatch) => {
  axios
    .post('/api/profile/work', workData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Add Education Action
export const addEducation = (expData, history) => (dispatch) => {
  axios
    .post('/api/profile/education', expData)
    .then((res) => history.push('/dashboard'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Delete an Experience by experience id
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Delete an Experience by experience id
export const deleteWork = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/work/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Delete an Education by experience id
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Get all developers profiles
export const getProfiles = () => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then((res) =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      }),
    )
    .catch((err) =>
      dispatch({
        type: GET_PROFILES,
        payload: null,
      }),
    )
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  }
}
