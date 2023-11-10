import { Box } from '@mui/material'
import React from 'react'

export default function Wrapper({ bg_color = '#F8FBFF', children, ...otherProps }: any) {
  return (
    <Box
      sx={{
        backgroundColor: bg_color,
        borderRadius: '10px',
        px: '48px',
        pt: '25px',
        mx: '50px',
        mb: '32px',
        mt: '36px',
      }}
      {...otherProps}
      >
      {children}
    </Box>
  )
}
