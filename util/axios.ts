import axios from 'axios'

/* const session = getSession()

export const instance = axios.create({
    baseURL: `https://dev-api.real-ezy.com`,
    timeout: 1000 * 50,
    headers: {
        "Content-Type": "application/json",
        "Client-Service": "frontend-client",
        "Auth-Key": "simplerestapi",
        "user-id": 213,
        "device_token":"LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=",
        "token": "$6$rounds=5042$61a9f776d664a5.2$id/9.5ooBpti/wzmjgZfJnCzsA3VDc8kCJLb/pET12Pn1vxEc86h8w14L8A9sZ6Jk8HZEpa5G/cd8hTyswXvF0",
    }
}); */



import { getSession } from "next-auth/react"

export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_API_URL

export const API = axios.create({
  baseURL: API_BASE_URL
})
API.interceptors.request.use(async (config) => {
  const session:any = await getSession()

  config.headers["Content-Type"] = "application/json"
  config.headers["Client-Service"] = "frontend-client"
  config.headers["Auth-Key"] = "simplerestapi"
  config.headers["User-ID"] = session?.user?.id
  config.headers["token"] = session?.user?.token
  config.headers["device_token"] = session?.user?.token

  return config
})




// GET REQUEST TO GET DOCUMENTS FROM SERVER
/* export const getRequest = async (url:any) => {
    try {
        return  await instance.get(url)
    } catch (error) {
        return error
    }
} */

// POST REQUEST TO INSERT NEW DOCUMENT
export const postRequest = async (url:any, formData:any) => {
    try {
        // return await instance.post(url, formData)
        const { data } = await API.post(url, formData)
        return data
    } catch (error) {
        return error
    }
}

export const putRequest = async (url:any, formData:any) => {
    console.log(`🚀 ~ file: axios.ts:31 ~ postRequest ~ formData:`, formData)
    console.log(`🚀 ~ file: axios.ts:31 ~ postRequest ~ url:`, url)
    try {
        // return await instance.post(url, formData)
        const { data } = await API.put(url, formData)
        return data
    } catch (error) {
        return error
    }
}






// PUT REQUEST TO UPDATE DOCUMENT
/* export const putRequest = async (url:any, formData:any) => {
    try {
        return  await instance.put(url, formData)
    } catch (error) {
        return error
    }
}
 */
// DELETE REQUEST TO REMOVE DOCUMENT
/* export const deleteRequest = async (url:any) => {
    try {
        return  await instance.delete(url)
    } catch (error) {
        return error
    }
}
 */
// export default instance