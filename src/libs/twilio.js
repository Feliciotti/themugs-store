import twilio from 'twilio';

const accountSid = 'AC469146f8abc6baae0f9d754849ae21ff'; 
const authToken = process.env.TWILIO; 
const client = twilio(accountSid, authToken); 

export { client }