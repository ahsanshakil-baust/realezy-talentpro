import verifyToken from "@/util/twilio/createVarify"


export default function handler(req:any, res:any) {
  return new Promise((resolve, _) => {
    if(req.method === "POST"){
        verifyToken(req.body.serviceSid,req.body.countryCode,req.body.number, req.body.token).then((result) => {
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