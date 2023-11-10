import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
// import InboxIcon from '@mui/icons-material/Inbox'
// import DraftsIcon from '@mui/icons-material/Drafts'
import { BiRightArrowAlt } from 'react-icons/bi' // BiLeftArrowAlt
import Link from 'next/link'

export default function HMFAQlistTT() {
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 0}
            onClick={event => handleListItemClick(event, 0)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="About the company & the service (9)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="How to use the platform (23)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 2)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="How to Book (5)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 3)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="Fees & Payment (6)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 4)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="Cancellation & Refund (4)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Divider />
        <Link passHref href="/faq">
          <ListItemButton
            className="!w-full !h-[80px] !bg-white  !text-[#034ea1] !text-left "
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 4)}
            style={{ fontSize: '25px !important' }}>
            <ListItemText
              primary="Legal (9)"
              className="text-[#034ea1] !text-left !tracking-[0.20px] !xl:tracking-[0.36px]  hm-fq-point-text"
            />
            <ListItemIcon className="!text-[#034ea1] !text-[25px] !-mr-[25px]">
              <BiRightArrowAlt />
            </ListItemIcon>
          </ListItemButton>
        </Link>
      </List>
    </Box>
  )
}
