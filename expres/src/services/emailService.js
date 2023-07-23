require("dotenv").config();
import { lang } from "moment/moment";
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: '"Ataki Souma 👻" <hoangnam1772004@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Information Booking Appointment in  Dentist Care", // Subject line
    html: `
            <h3>Dear ${dataSend.patientName}</h3>
            <p>You have received this email because you have booked a appointment in Dentist Care .vn</p>
            <p>Information booking appointment</p>
            <div>
            <b>Duration: ${dataSend.time}</b></br>
            <b>Dentist Doctor: ${dataSend.doctorName}</b>
            </div>
            <p>If These inforamtion are right please click this link below here to confim
            an accept to approve appointment booking service in my website
            </p>
            <div>
            <a href="${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
        
            <div>Thanks you for your Booking</div>
            <div>Dentist Care</div>
            <div> > Always protect your teeth < </div>
            `,
  });
};
let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: '"Ataki Souma 👻" <hoangnam1772004@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Result Appointment in  Dentist Care", // Subject line
        html: `
            <h3>Dear ${dataSend.patientName}</h3>
            <p>You have received this email because you have booked a appointment in Dentist Care .vn</p>
            <p>Information booking appointment</p>
            <p>If These inforamtion are right please click this link below here to confim
            an accept to approve appointment booking service in my website
            </p>
            <div>
            <p>Prescription information and results are sent in the attachment</p>
            </div>
        
            <div>Thanks you for your Booking</div>
            <div>Dentist Care</div>
            <div> > Always protect your teeth < </div>
            `,
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};
