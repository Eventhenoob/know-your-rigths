import mongoose from "mongoose";

const dbLink = process.env.DB_LINK;

export async function connect() {
  if (mongoose.connection.readyState === 0)
    return await mongoose.connect(`${dbLink}`);
}


export function closeDataBase() {
  mongoose.connection.close();
}