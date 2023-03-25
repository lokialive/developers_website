import axios from 'axios'

// const url = 'https://api.orb-intelligence.com/3/match/'
// const api_key = "c66c5dad-395c-4ec6-afdf-7b78eb94166a"
// const fetch_url = 'https://api.orb-intelligence.com/3/fetch/'
// ${url}?api_key=${api_key}&country=us&name=${name}
// ${fetch_url}${id}/?api_key=${api_key}
export const matchCompaniesByName = async (name) => {
  const response = await axios.get(
    `http://localhost:8080/api/search/?name=${name}`,
  )
  const companies = response.data.results
  return companies
}

export const fetchCompanyByID = async (id) => {
  const response = await axios.get(
    `http://localhost:8080/api/companies/?id=${id}`,
  )
  const company = response.data
  return company
}

export const fetchFollowerListById = async (id) => {
  console.log(id)
  const response = await axios.get(`http://localhost:8080/api/follow/${id}`)
  const list = response.data
  console.log(list)
  console.log('t')

  return list
}

export const followCompany = async (data) => {
  //1. add company name and company id to the user profile by userId
  let datas = data.split('-')

  let id = datas[0]
  let companyName = datas[1]
  let userId = datas[2]
  let userHandle = datas[3]
  console.log(userHandle)
  await fetch(
    `http://localhost:8080/api/profile/follow/${userId}/${id}/${companyName}`,
    {
      method: 'POST',
    },
  )
  await fetch(
    `http://localhost:8080/api/follow/add/${id}/${userId}/${userHandle}`,
    {
      method: 'POST',
    },
  )
}
