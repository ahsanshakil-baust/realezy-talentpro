import axios from "axios"
import { getSession } from "next-auth/react"

export const API_BASE_URL = "https://dev-api.real-ezy.com/"

export const API = axios.create({
  baseURL: API_BASE_URL
})
API.interceptors.request.use(async (config) => {
  const session = await getSession()

  config.headers["Content-Type"] = "application/json"
  config.headers["Client-Service"] = "frontend-client"
  config.headers["Auth-Key"] = "simplerestapi"
  config.headers["User-ID"] = session?.user?.id
  config.headers["token"] = session?.user?.token

  return config
})
