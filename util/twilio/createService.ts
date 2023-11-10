// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

import createClient from "./createClient";

const createService = async ()=>{
   const client = createClient();
   const service =  await client.verify.v2.services
                    .create({friendlyName: 'Realezy'})

   return service.sid;

}

export default createService;