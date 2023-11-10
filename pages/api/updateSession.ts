import { postRequest } from '@/util/axios'
import { getSession } from 'next-auth/react'

export default async function handler(req:any, res:any) {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    try {
      // Get the updated session data from the request body (assuming it's in JSON format).
      // const { payload } = req?.body

      // let response = await postRequest('index.php/auth/loginMobile', JSON.stringify(payload))
      let response = await postRequest('index.php/auth/loginMobile', JSON.stringify(req?.body?.payload))

      let user = response?.data

      // Merge the updated data into the existing session.
      const newSession = {
        ...session,
        user: user,
      }

      // Update the session.
      //await updateSessionSomehow(newSession) // Implement your update session logic here.

      // Respond with success or updated session data.
      return res.status(200).json({ success: true, session: newSession })
    } catch (error) {
      console.error('Error updating session:', error)
      return res.status(500).json({ success: false, error: 'Session update failed' })
    }
  } else {
    return res.status(405).end() // Method Not Allowed
  }
}
