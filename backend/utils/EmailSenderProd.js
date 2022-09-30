import sgMail from '@sendgrid/mail'

import { exportEmailTemplate } from './emailTemplate.js'

export const sendEmail = async(options)=>
{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const emailTemplate = exportEmailTemplate(options.title,options.link);
      const msg = {
          to: options.email, // Change to your recipient
          from: 'ahmad@ahmadyasser.com', // Change to your verified sender
          subject: options.subject,
          text: options.message,
          html: emailTemplate,
        }
        sgMail
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
  }


