import axios from "axios";

const url = 'https://api.orb-intelligence.com/3/match/'
const api_key = "c66c5dad-395c-4ec6-afdf-7b78eb94166a"
const fetch_url = 'https://api.orb-intelligence.com/3/fetch/'

export const matchCompaniesByName = async (name) => {

    const response = await axios.get(`${url}?api_key=${api_key}&country=us&name=${name}`);
    const companies = response.data.results;
    return companies;
}

export const fetchCompanyByID = async (id) => {
    const response = await axios.get(`${fetch_url}${id}/?api_key=${api_key}`)
    const company = response.data;
    return company;
}