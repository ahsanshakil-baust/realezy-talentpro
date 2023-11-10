import { FC } from 'react'

const PlusButtonIcon: FC<any> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" {...props}>
    <g data-name="Layer 2">
      <g data-name="01.Add" transform="translate(4 4)">
        <rect data-name="Rectangle 9111" width={30} height={30} rx={15} transform="translate(-4 -4)" fill="#00ADEE" />
        <path
          d="M19 10.996a1.429 1.429 0 01-1.429 1.429h-4.857a.282.282 0 00-.284.284v4.861a1.43 1.43 0 01-2.859 0v-4.861a.282.282 0 00-.284-.284H4.429a1.429 1.429 0 110-2.858h4.857a.282.282 0 00.284-.284V4.428a1.43 1.43 0 012.859 0v4.855a.282.282 0 00.284.29h4.857a1.429 1.429 0 011.429 1.423z"
          fill="#fff"
          stroke="#034ea1"
          strokeWidth={0.5}
        />
      </g>
    </g>
  </svg>
)

export default PlusButtonIcon
