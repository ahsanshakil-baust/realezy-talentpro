import { Reserved } from '@/public'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ReservedLogo = ({ width = '100%', height = 'auto', otherProps }: any) => {
  const { pathname } = useRouter()

  return (
    <div style={{ width, height }}>
      <Image src={Reserved} alt="Reserved" {...otherProps} />
    </div>
  )
}
export default ReservedLogo
