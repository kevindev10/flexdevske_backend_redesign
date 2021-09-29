const express = require('express');
const request = require ('request');
const fetch = require ('node-fetch');
const cors = require('cors');
const nodemailer = require("nodemailer");



const app = express();
app.use(cors());
app.use(express.json())







app.get('/', (req,res)=>{
	res.json('this is working bruh');
})

app.post('/contactUs', async (req,res) =>{
  try{
    
      console.log(req.body)
    if(
      req.body.captcha === undefined ||
      req.body.captcha === '' ||
      req.body.captcha === null
  ){
      return res.json({"success": false, "msg":"*Please  select the captcha"})
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

  const { email, phone, yourName, message} = req.body;
  const output = `
		<p>You have a new message</p>
		<h3>Website Details</h3>
		<ul>
			
			<li>Your Name :${yourName}</li>
			<li>Email :${email}</li>
			<li>Phone :${phone}</li>
			<h3>Message</h3>
			<p>${message}</p>
			
		</ul>
	`;
  async function main() {
			  

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.flexdevske.co.ke",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sales@flexdevske.co.ke', // generated ethereal user
        pass: 'Achieng2021', // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Nodemailer Contact" <sales@flexdevske.co.ke>', // sender address
      to: "flexdevske@gmail.com", // list of receivers
      subject: "Website Quotation Request", // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
  }

  main().catch(console.error);
  return res.json({ success: true, msg: 'Thanks for getting in touch! Expect an answer from us in the next few hours.' });


  }
  catch (error) {
    console.error(error);
  }


});






const PORT = process.env.PORT || 3001 ;
	
app.listen (PORT,  ()=>{
	console.log(`Server is running on port ${PORT}`)
})