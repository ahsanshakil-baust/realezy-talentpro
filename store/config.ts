import config from '@/config'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import { getSession } from 'next-auth/react'
const getUserInfo = async (typ : any) => {
  const session : any = await getSession()
  return session?.user[typ]
}
const baseQuery =(baseUrl:any)=> fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers) => {
    //const tokenLocalStorage = localStorage.getItem("token")
    //const token = tokenLocalStorage ? tokenLocalStorage : null
    headers.set('Content-Type', 'application/json; charset=UTF-8')
    headers.set('Client-Service', 'frontend-client')
    headers.set('Auth-Key', 'simplerestapi')
    headers.set('user-id', await getUserInfo('id'))
    headers.set('token', await getUserInfo('token'))
    return headers
  },
})

export default baseQuery(config.API_URL)

export const baseAdminQuery = baseQuery(config.ADMIN_URL)

 // '$6$rounds=5042$61a9f776d664a5.2$id/9.5ooBpti/wzmjgZfJnCzsA3VDc8kCJLb/pET12Pn1vxEc86h8w14L8A9sZ6Jk8HZEpa5G/cd8hTyswXvF0'
