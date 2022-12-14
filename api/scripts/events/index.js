const eventEmiter=require("./eventEmmiter")
const nodemailer=require("nodemailer");
module.exports=()=>{
    eventEmiter.on("send_email",(emailData)=>{
        let transporter=nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }
        });
        let info=transporter.sendMail({
            from:process.env.EMAIL_FROM,
            ...emailData
        })
    })
}