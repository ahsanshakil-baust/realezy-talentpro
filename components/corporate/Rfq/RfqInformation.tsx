import { CircularProgress } from "@mui/material"
import Image from "next/image"
import RFQDetailsIcon from 'public/corporate-icon/RFQDetails.svg'
import BedIcon from 'public/corporate-icon/bed.svg'
import BathIcon from 'public/corporate-icon/bath.svg'
import AreaIcon from 'public/corporate-icon/Area.svg'
import ConnectIcon from 'public/corporate-icon/connect.svg'
import MessageIcon from 'public/corporate-icon/message.svg'
import DollorIcon from 'public/corporate-icon/dollor.svg'
import Subtraction from 'public/corporate-icon/Subtraction2.svg'
import chat from 'public/corporate-icon/chat.svg'
import marker from 'public/corporate-icon/marker.svg'

const RfqInformation = ({ rfqLoading, rfqDetails, handleChatButton }: any) => {
    return (
        <div className='bg-[#F1F7FF] border-none'>
            <h2 className='text-[#202020] font-semibold pb-5 text-xl'>RFQ Basic Info</h2>
            {
                rfqLoading ?
                    <div className='flex justify-center'>
                        <CircularProgress />
                    </div>
                    : <>
                        <div className='flex items-center gap-5'>
                            <button className='px-3 py-2 border border-dashed border-[#6495CC] rounded-md flex items-center gap-3 cursor-pointer bg-transparent'>
                                <Image src={BedIcon} alt='' />
                                <span className='text-2xl text-[#034EA1]'>{rfqDetails?.bedroom}</span>
                            </button>
                            <button className='px-3 py-2 border border-dashed border-[#6495CC] rounded-md flex items-center gap-3 cursor-pointer bg-transparent'>
                                <Image alt='' src={BathIcon} />
                                <span className='text-2xl text-[#034EA1]'>{rfqDetails?.bathroom}</span>
                            </button>
                            <button className='px-3 py-2 border border-dashed border-[#6495CC] rounded-md flex items-center gap-3 cursor-pointer bg-transparent'>
                                <Image alt='' src={AreaIcon} />
                                <span className='text-2xl text-[#034EA1]'>{rfqDetails?.floor_range}</span>
                            </button>
                            <div className='flex items-center gap-4'>
                                <Image alt='' src={ConnectIcon} />
                                <span className='text-2xl text-[#034EA1]'>{rfqDetails?.max_rfq}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex items-center gap-2'>
                                <span className='w-5 h-5 rounded-full flex items-center justify-center text-[#999999] '>
                                    <Image alt='' src={DollorIcon} />
                                </span>
                                <p className='text-[#505050] text-xl'>{rfqDetails?.budget_range}</p>
                            </div>
                            <p className='text-[#D9A85B] underline text-xl'>{rfqDetails?.rental_type}</p>
                            <p className='text-[#7B549B] underline text-xl'>{rfqDetails?.property_type}</p>
                            <div className='flex items-center gap-2'>
                                <span className='w-5 h-5 rounded-md bg-[#7AA1CC] block'></span>
                                <p className='text-[#7AA1CC] text-xl'>{rfqDetails?.district?.short_code}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex items-center gap-2'>
                                <span className='w-5 h-5 rounded-md  flex items-center justify-center text-[#999999]'>
                                    <Image alt='' src={Subtraction} />
                                </span>
                                <p className='text-[#505050] text-xl'>{rfqDetails?.start_date} - <span className='text-[#E21B1B]'>{rfqDetails?.end_date}</span></p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 mt-4'>
                            <div className='flex items-center gap-2'>
                                <span className='w-5 h-5 rounded-md flex items-center justify-center text-[#999999]'>
                                    <Image alt='' src={marker} />
                                </span>
                                <p className='text-[#505050] text-xl'>{rfqDetails?.areas}</p>
                            </div>
                        </div>
                        <h2 className='mb-8 text-[#202020] font-semibold text-base mt-4'>Number of Occupiers : {rfqDetails?.no_of_occupiers}</h2>
                    </>
            }

            <div className='mt-4'>
                <button onClick={handleChatButton} className='bg-[#00ADEE] rounded-md px-6 py-3 text-white flex items-center gap-5 cursor-pointer text-base'>
                    <Image src={chat} /> Find Property
                </button>
            </div>

        </div>
    )
}

export default RfqInformation