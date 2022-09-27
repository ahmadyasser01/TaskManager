import sgMail from '@sendgrid/mail'




export const sendEmail = async(options)=>
{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
      const msg = {
          to: options.email, // Change to your recipient
          from: 'ahmad@ahmadyasser.com', // Change to your verified sender
          subject: options.subject,
          text: options.message,
          html: `<strong>${options.message} </strong>`,
        }

        console.log(options.message);
        // sgMail
        // .send(msg)
        // .then(() => {}, error => {
        //   console.error(error);
      
        //   if (error.response) {
        //     console.error(error.response.body)
        //   }
        // });
  }


