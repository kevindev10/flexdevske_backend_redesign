const express = require('express');
const request = require ('request');
const fetch = require ('node-fetch');
const cors = require('cors')



const app = express();
app.use(cors());
app.use(express.json())






app.get('/', (req,res)=>{
	res.json('this is working bruh');
})

app.post('/contactUs', async (req,res) =>{
  try{
    

    if(
      req.body.captcha === undefined ||
      req.body.captcha === '' ||
      req.body.captcha === null
  ){
      return res.json({"success": false, "msg":"Please select captcha"})
  }
  //Secret Key
  const secretKey = '6LegIIMcAAAAAJ3A4fILYSuC_FJETY_WQF3rSb4j';

  //Veryify URL
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.socket.remoteAddress}`

  //Make Request To VerifyURl
  const body = await fetch(verifyURL).then(res => res.json());

  // If not successful
    if (body.success !== undefined && !body.success)
    return res.json({ success: false, msg: 'Failed captcha verification' });

  // If successful
  return res.json({ success: true, msg: 'Captcha passed' });


  }
  catch (error) {
    console.error(error);
  }


});






const PORT = process.env.PORT || 3001 ;
	
app.listen (PORT,  ()=>{
	console.log(`Server is running on port ${PORT}`)
})