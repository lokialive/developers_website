import axios from 'axios'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { GET_ERRORS } from './types'
import { SET_CURRENT_USER } from './types'

//User register action
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// User login action
export const loginUser = (userData) => (dispatch) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      const { token } = res.data
      // console.log(token);
      // store token to local storage
      localStorage.setItem('jwtToken', token)
      // set axios headers token
      setAuthToken(token)

      // decode token
      const decoded = jwt_decode(token)
      // console.log(decoded);
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// logout
export const logoutUser = (history) => (dispatch) => {
  //delete token
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  axios
    .post('/api/profile/test')
    // .then((res) => history.push('/home'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}
