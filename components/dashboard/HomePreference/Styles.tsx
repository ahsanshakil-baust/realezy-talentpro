// ButtonStyles

export const ButtonStyles = {
  buttonGroup: {
    boxShadow: '0',
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // gap: '0.50rem',
    '.MuiButtonBase-root': {
      borderRadius: '10px !important',
      border: '1 !important',
      borderColor: '#D4E8FF !important',
    },
  },
  button: {
    '&.MuiButton-containedPrimary': {
      backgroundColor: '#00ADEE',
      color: '#FFFFFF',
    },
    // '@media (min-width: 1536px)': {}
    fontSize: '16px',
    fontWeight: 'regular',
    lineHeight: 1,
    // padding: '15px 18px',
    color: '#202020',
    // borderRadius: '12px !important',
    // border: '1 !important',
  },
  publishButton: {
    '&.MuiButton-contained': {
      fontSize: '22px',
      backgroundColor: '#00ADEE',
      color: '#FFFFFF',
      width: '124px',
      height: '60px',
    },
    '&.Mui-disabled': {
      backgroundColor: '#D1D1D1 !important',
      // color: '#dadada',
    },
  },
  resetButton: {
    '&.MuiButton-root': {
      fontSize: '22px',
      color: '#505050',
      // color: '#202020',
      width: '124px',
      height: '60px',
    },
  },
}

export const SliderStyles = {
  width: '91%',
  height: 7,
  color: '#00ADEE',
  '& .MuiSlider-thumb': {
    height: '20px',
    width: '20px',
    backgroundColor: '#FFFFFF',
    border: '4px solid currentColor',
  },
  '& .MuiSlider-rail': {
    color: '#D4E8FF !important',
  },

  // '&.MuiSlider-root.Mui-disabled': {
  //   '& .MuiSlider-track': {
  //     color: '#00ADEE !important',
  //   },
  //   '& .MuiSlider-thumb': {
  //     backgroundColor: '#FFFFFF !important',
  //     border: '4px solid #00ADEE !important',
  //   },
  // },

  '& .MuiSlider-markLabel': {
    // Postioning marks if available
    '&[data-index="0"]': {
      transform: 'translateX(-16%)',
    },
    '&[data-index="1"]': {
      transform: 'translateX(-86%)',
    },
  },
  // '& .Mui-disabled .MuiSlider-rail': {
  //   color: '#D4E8FF !important',
  // },
}
