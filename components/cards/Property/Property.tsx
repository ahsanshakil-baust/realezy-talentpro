import { Icon } from '@/components/shared'
import { Box, Card, CardMedia, Typography, useTheme } from '@mui/material'
// import Image from 'next/image'
// import styles from './Property.module.css'

export interface IProperty {
  tag: string
  title: string
  body: string
  author: string
  time: string
}

const Property: React.FC<IProperty> = ({ tag, title, body, author, time }) => {
  // const theme = useTheme()

  return (
    <Card
      sx={{
        display: 'flex',
        direction: 'column',
        width: '872px',
        height: '242px',
      }}
    >
      <Box sx={{ paddingLeft: '16px', paddingTop: '12px', marginRight: '28px' }}>
        <CardMedia
          component="img"
          sx={{ width: '317px', height: '218px', borderRadius: '10px' }}
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
          alt="Live from space album cover"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          marginTop: '22px',
          marginBottom: '28px',
          marginRight: '28px',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography component="div" variant="h6">
            Awesome Family Home
          </Typography>
          <Typography
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#A1A1A1' }}
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            <Icon className="!w-[16px] !h-[22px]" name="marker" /> Marcy Ave,Brooklyn, 12456
          </Typography>

          <Box style={{ display: 'flex', gap: '20px', margin: '10px 0' }}>
            <Typography
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1A1' }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <Icon className="!w-[20px] !h-[22px]" name="bed" /> 3
            </Typography>
            <Typography
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1A1' }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <Icon className="!w-[20px] !h-[22px]" name="bath" /> 3
            </Typography>
            <Typography
              style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A1A1A1' }}
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              <Icon className="!w-[20px] !h-[22px]" name="area" /> 3 1250 Sq Ft
            </Typography>
          </Box>

          <Box style={{ display: 'flex', color: '#A1A1A1' }}>
            <Typography variant="subtitle1" color="text.secondary" component="h6">
              Whole Unit
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="h6">
              Partially Furnished
            </Typography>
          </Box>
        </Box>
        <Box style={{ marginBottom: '12px' }}>
          <Typography component="div" variant="h6">
            $5,800/mo
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span
              style={{
                width: 10,
                height: 10,
                background: '#133d99',
                borderRadius: 50,
                display: 'inline-block',
                marginRight: '5px',
              }}
            ></span>
            D8-BISHAN
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default Property
