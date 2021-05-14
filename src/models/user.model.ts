import { Schema, Model, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends Document{
    username: String;
    password: String;
    email: String;
}

export interface IUserModel extends Model<IUserDocument>{
    encryptPassword(password: String);
    compareEncryptPassword(dbPw: String, receivedPw: String);
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.statics.encryptPassword = async (password) => {
    // const salt = await bcrypt.genSaltSync(10)
    const salt = 10
    const hashedPw = await bcrypt.hash(`${password}`, salt)
    return hashedPw
}

userSchema.statics.compareEncryptPassword = async (receivedPw, dbPw) => {
  return await bcrypt.compare(receivedPw, dbPw) // first pw later dbPw
}

export const User: IUserModel = model<IUserDocument, IUserModel>('user', userSchema)
export default User;

