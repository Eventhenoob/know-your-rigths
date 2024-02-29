import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "otp1873@gmail.com",
    pass: "lzza bsft dukg glrf",
  },
});

const sendMail = async (email: string, otp: string) => {
  return await transporter.sendMail({
    from: '"Gameverse" <verification@game-verse-ayin.vercel.app>', // sender address
    to: `${email}`, // list of receivers
    subject: "Otp for email verification", // Subject line
    text: "This is an auto generated message, please do not reply ", // plain text body
    html: `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GameVerse</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing GameVerse. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />GameVerse</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>GameVerse Inc</p>
    </div>
  </div>
</div>`,
  });
};

export default sendMail;