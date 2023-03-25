import axios from 'axios'

const FOLLOWER_API = '/api/follow'

export const createFollower = async (data) => {
  let datas = data.split('-')
  let id = datas[0]
  let companyName = datas[1]
  let user = datas[2]
  let Handle = datas[3]
  fetch(
    `http://localhost:8080/api/profile/follow/${user}/${id}/${companyName}`,
    {
      method: 'POST',
    },
  )

  const response = axios.post(`${FOLLOWER_API}/add/${id}/${user}/${Handle}`)
  return response.data
}

export const findFollowers = async (companyId) => {
  console.log(companyId)
  const response = await axios.get(
    `http://localhost:8080/api/follow/${companyId}`,
  )
  console.log(response)
  const followers = response.data
  console.log('a')
  console.log(followers)
  return followers
}
