// import Image from 'next/image';

// export interface IButton extends React.ComponentPropsWithoutRef<'button'> {}

// const Button: React.FC<any> = ({
//   classNamePrimary,
//   className,
//   label,
//   isPrimary,
//   classNameSecondary,
//   icon,
//   isLabel,
//   ...buttonProps
// }) => {
//   console.log(typeof isPrimary);

//   return (
//     <button
//       className={
//         isPrimary ? classNamePrimary?.join(' ') : classNameSecondary?.join(' ')
//       }
//       {...buttonProps}
//     >
//       {icon && <Image src={icon} width={30} height={30} />}
//       {isLabel ? label : ' '}
//     </button>
//   );
// };

// export default Button;

// import Image from 'next/image'

export interface IButton extends React.ComponentPropsWithoutRef<'button'> {}

export const Button: React.FC<any> = ({onClickEv}) => {
  return (
    <button
    onClick={onClickEv}
      className="w-full  h-[47.5px]  md:h-[47.5px] lg:h-[47px] ] xl:h-[58px]  2xl:h-[70px] px-[22px] lg:px-[27px] xl:px-[30px] 2xl:px-[60px] py-4 md:py-3 2xl:py-5 rounded-[10px]  tracking-[0.32px] xl:tracking-[0.36px] 2xl:tracking-[0.48px] text-base sm:text-[19px] md:text-[16px]  lg:text-[19px] xl:text-[21px] 2xl:text-[24px]  bg-[#00ADEE] text-white  cursor-pointer "
    >
      Search
    </button>
  )
}

