import { FC } from 'react'

const Clapperboard: FC<any> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path
      d="M6.556 3.731l4.724 4.724H3.1a6.5 6.5 0 013.456-4.724zM12.905 3h-3.36c-.207 0-.415.011-.622.022l5.433 5.433h4zm7.549 0H16l5.455 5.455H26.9A6.535 6.535 0 0020.455 3zm-7.11 18.137l5.455-3a1.09 1.09 0 000-1.911l-5.455-3a1.091 1.091 0 00-1.617.956v6a1.091 1.091 0 001.617.956zM27 10.636v9.818A6.551 6.551 0 0120.455 27H9.545A6.551 6.551 0 013 20.455v-9.819z"
      transform="translate(-3 -3)"
      fill="#00adee"
    />
  </svg>
)

export default Clapperboard
