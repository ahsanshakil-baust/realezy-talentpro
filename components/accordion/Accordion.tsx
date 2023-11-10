// import React, { useState } from 'react'
// import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
// import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'

// export interface AccordionItem {
//   title: string
//   content: string
// }

// const AccordionWithExpandIcons: React.FC<any> = ({
//   item,
//   classNameExpand,
//   classNameShrink,
//   classNameText,
//   classNameIcon,
//   expandIcon,
//   shrinkIcon,
// }) => {
//   const [items, setItems] = useState<AccordionItem[]>(item)
//   const [expandedIndex, setExpandedIndex] = useState<number | false>(0)

//   const handleChange = (index: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
//     setExpandedIndex(isExpanded ? index : false)
//   }

//   return (
//     <>
//       {items?.map((item, index) => (
//         <Accordion key={index} expanded={expandedIndex === index} onChange={handleChange(index)}>
//           <MuiAccordionSummary
//             className={expandedIndex === index ? classNameExpand.join(' ') : classNameShrink.join(' ')}
//             expandIcon={
//               expandedIndex === index ? (
//                 <Typography className={classNameIcon.join(' ')}> {shrinkIcon} </Typography>
//               ) : (
//                 <Typography className={classNameIcon.join(' ')}> {expandIcon} </Typography>
//               )
//             }
//           >
//             <Typography className={classNameText.join(' ')} variant="h5">
//               {item.title}
//             </Typography>
//           </MuiAccordionSummary>
//           <AccordionDetails>
//             <Typography className={classNameText.join(' ')}> {item.content}</Typography>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </>
//   )
// }

// export default AccordionWithExpandIcons

import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'

export interface AccordionItem {
  title: string
  content: string
}

const AccordionWithExpandIcons: React.FC<any> = ({ item }) => {
  const [items, setItems] = useState<AccordionItem[]>(item)
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0)

  const handleChange = (index: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpandedIndex(isExpanded ? index : false)
  }

  return (
    <div>
      {items?.map((item, index) => {
        return index < 6 ? (
          <Accordion
            key={index}
            expanded={expandedIndex === index}
            onChange={handleChange(index)}
            className="w-full h-full rounded-[10px]">
            <MuiAccordionSummary
              className={
                expandedIndex === index
                  ? '!w-full !h-full !bg-[#EBF4FE] !text-blue-500'
                  : '!w-full !h-[80px] !bg-white  !text-blue-500'
              }
              expandIcon={
                expandedIndex === index ? (
                  <Typography className="!text-[#034ea1] !font-bold">
                    {' '}
                    <IoIosRemove size={30} />{' '}
                  </Typography>
                ) : (
                  <Typography className="!text-[#034ea1] !font-bold">
                    {' '}
                    <IoIosAdd size={30} />{' '}
                  </Typography>
                )
              }>
              <Typography className="!text-[#034ea1] !text-left !text-lg md:!text-sm lg:!text-base 2xl:!text-lg !tracking-[0.20px] !xl:tracking-[0.36px]  !font-medium !font-roboto">
                {item.title}
              </Typography>
            </MuiAccordionSummary>
            <AccordionDetails>
              {typeof item.content === 'string' ? (
                <Typography className="!text-[#034ea1] !text-left  !text-base !tracking-[0.16px] xl:!tracking-[0.32px] !leading-[30px] !capitalize !font-normal !font-roboto">
                  {item.content}
                </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Number of rooms</TableCell>
                      <TableCell align="center">Total number of Occupants</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(item.content).map((val: any) => {
                      return (
                        <TableRow key={val.rooms}>
                          <TableCell align="center">{val.rooms}</TableCell>
                          <TableCell align="center">{val.occupants}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </AccordionDetails>
          </Accordion>
        ) : null
      })}
    </div>
  )
}

export default AccordionWithExpandIcons
