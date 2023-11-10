import { FC } from 'react'

const MinusButtonIcon: FC<any> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" {...props}>
    <path
      data-name="remove"
      d="M15 0a15 15 0 1015 15A15.017 15.017 0 0015 0zm6.563 16.25H8.438a1.25 1.25 0 010-2.5h13.125a1.25 1.25 0 010 2.5z"
      transform="translate(4 4) translate(-4 -4)"
      fill="#00ADEE"
    />
  </svg>
)

export default MinusButtonIcon
