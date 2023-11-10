import createClient from "./createClient";
import createService from "./createService";

const sendToken = async (number:any)=>{
    const serviceSid = await createService()
    const client = createClient()
    try{
        const status = await client.verify.v2.services(serviceSid)
                    .verifications
                    .create({to: number, channel: 'sms'})        
        console.log("status",status)
    }catch(err){
        console.log('Error',err);
    }
    return serviceSid;
}

export default sendToken;