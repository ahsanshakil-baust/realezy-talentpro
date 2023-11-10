import axios from "axios"

export default function handler(req:any, res:any) {
    console.log('req.bidy',req.body)
  return new Promise((resolve:any, _:any) => {
    if(req.method === "POST"){
      const msg = {
        id: req.body.id,
        user_type: req.body.user_type,
        name:req.body.userName,

      }

       axios.put(`https://dev-api.real-ezy.com/index.php/profile/update/${req.body.id}`,
       msg,{
        headers:{
            "Content-Type":"application/json",
            "Client-Service":"frontend-client",
            "Auth-Key":"simplerestapi",
            "User-ID":req.body.id
        }
       }).then((result:any) => {
        res.status(200).json({status:result.data.status})
        return resolve()
      }).catch((err:any)=>{
        res.status(200).json(err)
        return resolve()
      })

    }
    else{
      // console.log("have to post method")
      res.status(400).end()
      return resolve()
    }
  })
}
