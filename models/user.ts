import mongoose from "mongoose";
import { encrypt } from "@/utils/crypto";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  },
  {
    writeConcern: {
      w: 1,
    },
  }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await encrypt(this.password);
});

export default mongoose.models.User || mongoose.model("User", userSchema);