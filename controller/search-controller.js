const axios = require("axios") ;

const url = 'https://api.orb-intelligence.com/3/match/'
const api_key = "c66c5dad-395c-4ec6-afdf-7b78eb94166a"
const fetch_url = 'https://api.orb-intelligence.com/3/fetch/'

const matchCompaniesByName = async (req, res) => {
    const name = req.query.name
    const response = await axios.get(`${url}?api_key=${api_key}&country=us&name=${name}`);
    res.json(response.data)
}
const fetchCompanyByID = async (req, res) => {
    const id = req.query.id
    const response = await axios.get(`${fetch_url}${id}/?api_key=${api_key}`)
    res.json(response.data)
}

module.exports = function (app) {
    app.get('/api/search', matchCompaniesByName)
    app.get('/api/companies', fetchCompanyByID)
}
