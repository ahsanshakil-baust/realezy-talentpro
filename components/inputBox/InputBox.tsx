// export interface IinputBox {}

// const InputBox: React.FC<any> = ({ classNameInput, placeholder,icon,iconClass,containerClass }) => {
//   return (
//     <>
//       <div className={containerClass?.join(' ')}>
//         <div className={iconClass?.join(' ')}>
//           {icon}
//         </div>
//         <input
//           type="search"
//           id="default-search"
//           className={classNameInput?.join(' ')}
//           placeholder={placeholder}
//         />
//       </div>

//     </>

//   )
// }

// export default InputBox

export interface IinputBox {}

const InputBox: React.FC<any> = () => {
  return (
    <>
      <div className="relative flex items-center gap-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 sm:pl-10 md:pl-6 2x:pl-10 pointer-events-none">
          <img src={'download/magnifying_Glass.png'} alt="magnifying" className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] md:w-[24px] md:h-[24px] 2xl:w-[30px] 2xl:h-[30px]" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full h-[70px] md:w-[495px] md:h-[47.5px] 2xl:w-[580px] 2xl:h-[70px] p-5 sm:p-9 md:p-3  2xl:p-9 pl-16 sm:pl-20 md:pl-12 lg:pl-16 2xl:pl-20 text-[12px] sm:text-[18px] md:text-sm xl:text-base 2xl:text-[18px] text-[#A1A1A1] text-[#414141B3] font-segoe font-normal tracking-[0.36px] border-[1px] border-solid border-[#034EA133] rounded-[10px] bg-[#FFFFFFCC] outline-none"
          placeholder="Search for area, property name"
        />
      </div>
    </>
  )
}

export default InputBox
