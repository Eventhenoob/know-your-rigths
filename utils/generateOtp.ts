import crypto from "crypto";

function generateOTP(length: number) {
  const chars = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(chars.length);
    otp += chars.charAt(randomIndex);
  }

  return otp;
}

export default generateOTP;