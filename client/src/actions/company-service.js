import axios from 'axios';
// assignment 8-11.20 update
//const TUITS_API = 'http://localhost:4000/api/tuits';
//const TUITS_API = 'https://tuiter-node-server-app.herokuapp.com/api/tuits';
const API_BASE = process.env.REACT_APP_API_BASE;

const COMPANY_API = `${API_BASE}/company`;

export const createCompany = async (company) => {
    const response = await axios.post(COMPANY_API, company)
    return response.data;
}


export const findCompanies  = async ()  => {
    const response = await axios.get(COMPANY_API);
    const companies = response.data;
    return companies;
}





