import * as React from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

const driverObj = driver()

driverObj.highlight({
  element: '#add-property',
  popover: {
    title: 'Add Property Button',
    description: 'This is Button to add new property',
  },
})
