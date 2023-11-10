import sendToken from "@/util/twilio/sendToken"


export default function handler(req:any, res:any) {
  return new Promise((resolve, _) => {
    if(req.method === "POST"){
      sendToken(req.body.countryCode+req.body.number).then((result) => {
        res.status(200).json(result)
        return resolve(res)
      }).catch((error) => {
        res.status(400).json({ error })
        return resolve(res)
      })
    }
    else{
      res.status(400).end()
      return resolve(res)
    }
  })
}