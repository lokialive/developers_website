import axios from 'axios';
// assignment 8-11.20 update
//const TUITS_API = 'http://localhost:4000/api/tuits';
//const TUITS_API = 'https://tuiter-node-server-app.herokuapp.com/api/tuits';
//const API_BASE = process.env.REACT_APP_API_BASE;

//const POSITIONS_API = `${API_BASE}/positions`;
const SAVED_API = "http://localhost:8080/api/savedItems";

export const createSavedItem = async (savedItem) => {
    const response = await axios.post(SAVED_API, savedItem)
    return response.data;
}


export const findSavedItems  = async ()  => {
    const response = await axios.get(SAVED_API);
    const savedItems = response.data;
    return savedItems;
}


export const deleteSavedItem = async (_id) => {
    const response = await axios
        .delete(`${SAVED_API}/${_id}`)
    return response.data

}


export const updateSavedItem = async (savedItem) => {
    const response = await axios
        .put(`${SAVED_API}/${savedItem._id}`, savedItem);
    return savedItem;

}