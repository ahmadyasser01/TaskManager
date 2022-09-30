import nodemailer from 'nodemailer';


export const sendEmail = async (options) =>{
    // CREATE TRANSPORTER
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b83eda8e3e349d",
        pass: "c0c537fc2d93fa"
      }
    });
    console.log(options);
    //Define the email options
    const mailOptions = {
        from: 'Jonas Schmedtmann <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html:
    };

    // 3) Actually send the email
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
});    console.log("email sent");
}