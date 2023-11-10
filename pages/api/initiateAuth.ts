const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// sgMail.setApiKey("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")


export default function handler(req:any, res:any) {
  return new Promise((resolve:any, _:any) => {
    if(req.method === "POST"){
      // const vericode = Math.floor(100000 + Math.random() * 900000)
      // const msg = {
      //   to: req.body.email,
      //   // from: "realezy.tech@gmail.com",
      //   from: process.env.SENDGRID_EMAIL,
      //   subject: 'Your Realezy Verification OTP is ' + vericode,
      //   html: 'Your Realezy Verification OTP is <strong>' + vericode + '</strong>',
      // }
    }
    else{
      // console.log("have to post method")
      res.status(400).end()
      return resolve()
    }
  })
}
