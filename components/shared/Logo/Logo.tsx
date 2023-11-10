import { logo } from '@/public'
import Image from 'next/image'

const Logo = ({ width = '100%', height = 'auto', otherProps }: any) => {
  return (
    <div style={{ width, height }}>
      <Image src={logo} alt="RealEzy" {...otherProps} />
    </div>
  )
}
export default Logo
