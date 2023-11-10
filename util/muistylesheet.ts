export const muiSxStyle = (errors: any, names: any) => {
  return {
    width: { sm: 250, md: 350 },
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F1F7FF',
      transition: 'ease-in',
      '& > fieldset': {
        // border: '2px solid #E4F0FE',
        border: '2px solid #E4F0FE',
        borderRadius: '10px',
      },
      '&.Mui-focused': {
        '& > fieldset': {
          borderColor: errors.username ? '#c31313' : '#00ADEE',
        },
      },
    },

    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        border: '2px solid #00ADEE',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#000',
      '&.Mui-focused': {
        color: '#00ADEE',
      },
    },
  }
}
