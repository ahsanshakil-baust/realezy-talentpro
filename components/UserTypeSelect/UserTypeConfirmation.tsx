//added by oni
// import { postRequest, putRequest } from '@/util/axios'
import axios from 'axios'
// import { useEffect, useState } from 'react'
// import ChatStepModal from '../ChatFeed/ChatModal/ChatStepModal'
// import { Container, Row, Col, Form } from 'react-bootstrap'
// import { useUpdateUserProfile } from '../member/hooks/useUpdateProfilehook'

const UserTypeConfirmation = ({ userId, userType, userName }: any) => {
  const handleSubmitok = async () => {
    /* const response = await putRequest(
      `index.php/profile/update/${parseInt(userId)}`,
      JSON.stringify({
        user_type: userType.toLowerCase(),
        id: userId,
      })
    ) */
    const response = await axios.post('/api/userType', {
      id: userId,
      user_type: userType.toLowerCase(),
      userName: userName,
    })
    console.log("🚀 ~ file: UserTypeConfirmation.tsx:23 ~ handleSubmitok ~ response:", response)

    if (response.status === 200) {
      window.location.reload()
    }

    /*  const response = await instance.put(
      `index.php/profile/update/${parseInt(userId)}`,
      JSON.stringify({
        id: userId,
        user_type: userType.toLowerCase(),
      })
    ) */
  }

  return (
    <>
      <div className="schedule-full-wrap">
        <div className="p-2 rounded white-bg" style={{ backgroundColor: '#fff' }}>
          <h1 className="text-center">User type selected as {userType}</h1>
          <div className="mt-2 p-0">
            <div className="text-center">
              <button className="btn btn-primary px-5 submit-btn" onClick={handleSubmitok}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserTypeConfirmation
//added end
