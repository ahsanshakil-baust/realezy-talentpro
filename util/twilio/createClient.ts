 const createClient = ()=>{
    const accountSid = "ACdafc06d3bf25e6f91efc0194a03a6342";
    const authToken = "5b49b38d883d16b826123948fe5f0ebc";
    const client = require('twilio')(accountSid, authToken);

    return client;
}

export default createClient;