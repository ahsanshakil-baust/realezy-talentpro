const axios = require('axios');
const FormData = require('form-data')
export default async function handler(req:any, res:any) {
  if (req.method === "POST") {
    const formDataPostal = new FormData()
    formDataPostal.append('APIKey', '724F4D6F2FF84584B9CCFC519D58E957120A673988844D29B87215870B46026D')
    formDataPostal.append('APISecret', 'AF932C847621406CBD57D8D6EAC7BB0E8B3DCB716288463E922D138C1A8CD1B8')
    formDataPostal.append('Postcode', req.body.postalCode)
    const { data } = await axios.post("https://www.sglocate.com/api/json/searchwithpostcode.aspx", formDataPostal, {
      headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": `multipart/form-data; boundary=${formDataPostal._boundary}`,
      }
    })
    if(data.IsSuccess && data.ErrorCode === '1'){
      return res.status(200).json({
        "status" : "success",
        "Postcodes": data.Postcodes
      })
    }
    else{
      return res.status(200).json({
        "status" : "not found",
        "Postcodes": []
      })
    }
    // console.log(result)
    // console.log(req.body.postalCode)
    // return res.status(200).json(req.body)
  }
}
