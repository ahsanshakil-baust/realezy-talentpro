//added by oni
import { hideModal, showModal } from '@/store'
import { StoreThunkDispatch } from '@/types'
// import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import UserTypeConfirmation from './UserTypeConfirmation'
// import ChatStepModal from '../ChatFeed/ChatModal/ChatStepModal'
// import { Container, Row, Col, Form } from 'react-bootstrap'
// import { useUpdateUserProfile } from '../member/hooks/useUpdateProfilehook'

const UserTypeSelect = ({ session }: any) => {
  const dispatch = useDispatch<StoreThunkDispatch>()
  // const [showChatStepModal, setShowChatStepModal] = useState(true)
  // const [modalName, setModalName] = useState('')
  // const [usertype, setUsertype] = useState('')
  // const { mutateAsync } = useUpdateUserProfile()

  // const handleTenant = async () => {
  //   setModalName('Congratulations')
  //   setUsertype('Tenant')
  //   const respon = await mutateAsync({
  //     id: session.user.id,
  //     user_type: 'tenant',
  //   })
  // }
  // const handleLandlord = async () => {
  //   setModalName('Congratulations')
  //   setUsertype('Landlord')
  //   const respon = await mutateAsync({
  //     id: session.user.id,
  //     user_type: 'landlord',
  //   })
  // }

  // NOT USED

  return (
    <>
      <div className="bg-red-500">
        <div className="p-2 rounded white-bg">
          <h1 className="text-center">Are you Tenant or Landlord?</h1>
          <h3 className="text-center">Please select your user type!</h3>
          <div className="mt-2 p-0">
            <div className="text-center">
              <button
                className="btn btn-info btn-lg me-2"
                onClick={() => {
                  dispatch(hideModal('select_user_type'))
                  dispatch(
                    showModal({
                      open: true,
                      name: 'are_you_sure',
                      children: (
                        <div>
                          <UserTypeConfirmation
                            userId={session.user.id}
                            userType="Tenant"
                            userName={session.user.name}
                          />
                        </div>
                        // </Box>
                      ),
                      className: '',
                    })
                  )
                }}>
                Tenant
              </button>
              <button
                className="btn btn-primary btn-lg ms-2"
                onClick={() => {
                  dispatch(hideModal('select_user_type'))
                  dispatch(
                    showModal({
                      open: true,
                      name: 'are_you_sure',
                      children: (
                        <div>
                          <UserTypeConfirmation
                            userId={session.user.id}
                            userType="Landlord"
                            userName={session.user.name}
                          />
                        </div>
                        // </Box>
                      ),
                      className: '',
                    })
                  )
                }}>
                Landlord
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserTypeSelect
//added end
