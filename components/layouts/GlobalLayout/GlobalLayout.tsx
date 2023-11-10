import Header from '@/components/navigation/header/Header'
import { FC } from 'react'
import GlobalLoader from '../GlobalLoader/GlobalLoader'
import { ToastContainer } from 'react-toastify'

const GlobalLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <GlobalLoader />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default GlobalLayout
