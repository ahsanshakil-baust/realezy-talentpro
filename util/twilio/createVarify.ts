import createClient from "./createClient";
import sendToken from "./sendToken";

const verifyToken = async (serviceSid:number,countryCode:number,number:number,token:number)=>{
    const client = createClient()
    const response = await client.verify.v2.services(serviceSid)
      .verificationChecks
      .create({to: countryCode+number, code: token})
    return response.status;
}

export default verifyToken;