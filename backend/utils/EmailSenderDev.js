import nodemailer from 'nodemailer';


export const sendEmail = async (options) =>{
    // CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    //Define the email options
    const mailOptions = {
        from: 'Ahmad Yasser <AHMAD@AHMADYASSER.COM>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
    

}