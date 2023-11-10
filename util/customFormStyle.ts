export const customFormStyle = {
  sx_text_field: {
    borderRadius: '10px',
    '& .MuiOutlinedInput-root': {
      '& > fieldset': {
        border: '1px solid #D1D1D1',
        // border: '1px solid #D4E8FF',
        // borderRadius: '10px',
      },
      '&.Mui-focused': {
        '& > fieldset': {
          borderColor: '#00ADEE',
        },
      },
    },
    '& .MuiFormLabel-root': {
      '&.Mui-focused': {
        color: '#00ADEE',
      },
    },

    '& .MuiOutlinedInput-root:hover': {
      '& > fieldset': {
        border: '1px solid #00ADEE',
      },
    },

    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& > fieldset': {
        border: '1px solid',
      },
    },

    '&:hover .MuiInputLabel-root': {
      color: '#00ADEE',
    },

    '& .MuiInputLabel-root.Mui-disabled': {
      color: '#505050',
    },
  },
  sx_select_field: {

  },
  sx_radio_field: {

  },
  sx_textarea_field: {

  },
  sx_checkbox_field: {

  },
  sx_button: {

  },
  sx_button_primary: {

  },
  sx_publish_button: {
    backgroundColor: '#034EA1 ',
    opacity: 1,
    color: '#fff',
    ':hover': {
      backgroundColor: '#00ADEE',
    },
    ':disabled': {
      backgroundColor: '#034EA1',
      opacity: 0.6,
    },
  },

  sx_text_field_for_login: {
    // width: { sm: 250, md: 350 },
    '& .MuiInputBase-input':{
        height:'.75em'
    },
    marginBottom:'1rem',
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#F1F7FF',
      '& > fieldset': {
        // border: '2px solid #E4F0FE',
        border: '2px solid #E4F0FE',
        borderRadius: '10px',
      },
      '&.Mui-focused': {
        '& > fieldset': {
          borderColor: '#00ADEE',
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
        fontSize:"14px"
      },
    },
  },

  sx_tab: {
    color: '#999999',
    '&.Mui-selected': {
      color: '#00ADEE',
    },
  }


}
