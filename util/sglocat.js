import axios from 'axios'

export const getAddress = async ({
  postalCode = '609776',
  returnGeom = 'Y',
  getAddrDetails = 'Y',
  pageNum = '1',
} = {}) => {
  try {
    let params = {
      searchVal: postalCode,
      returnGeom: returnGeom,
      getAddrDetails: getAddrDetails,
      pageNum: pageNum,
    }
    const response = await axios.get('https://developers.onemap.sg/commonapi/search', { params })

    let json = response.data
    return json
  } catch (error) {
    return []
  }
}

module.exports = { getAddress }
