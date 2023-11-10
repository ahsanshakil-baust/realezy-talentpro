const customValidator = (fields) => {
  let keys = Object.keys(fields);
  let values = Object.values(fields);

  let error = {}

  keys.forEach((item, i) => {
      let value = values[i]
      if (value === 0 || !value) {
          const itemName = item.replace(/([A-Z])/g, " $1")
          const itemNameUpperCase = itemName.charAt(0).toUpperCase() + itemName.slice(1)
          error[item] = `The ${itemNameUpperCase} field is required!`
      }

      if (item === 'confirmPassword') {
          let findIndex = keys.indexOf('password')
          if (value !== values[findIndex]) {
              error.confirmPassword = `Confirm password doesn't match!`
          }
      }

  })

  return {
      isValid: Object.keys(error).length === 0,
      error
  }
}

export default customValidator
