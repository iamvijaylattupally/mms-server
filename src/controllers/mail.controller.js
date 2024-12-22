import FormData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';
dotenv.config();
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

const sendMail = async () => {
  try {
    const msg = await mg.messages.create('sandbox2e0db7d1c3e14139a8345e1d6bcbec30.mailgun.org', {
      from: "<vijayreddylattupally@gmail.com>",
      to: ["reddyvijay1690@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomeness!",
      html: "<h1>Testing some Mailgun awesomeness!</h1>"
    });

    console.log(msg); // logs response data
  } catch (err) {
    console.error(err); // logs any error
  }
};

export { sendMail };
