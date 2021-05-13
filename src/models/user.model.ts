import { Schema, Model, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends Document{
    username: String,
    password: String,   
    email: String,
}

export interface IUserModel extends Model<IUserDocument>{
    encryptPassword(password: String);
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

userSchema.statics.encryptPassword = async (password) =>{
    const salt = 10
    const hashedPw = await bcrypt.hash(password, salt)
    return hashedPw
}

export const User: IUserModel = model<IUserDocument, IUserModel>('user', userSchema)
export default User;

