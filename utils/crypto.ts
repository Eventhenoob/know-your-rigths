import bcrypt from "bcrypt";

export const encrypt = async (text: string) => {
  return await bcrypt.hash(text, 12);
};

export const compare = async (
  plaintextPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};