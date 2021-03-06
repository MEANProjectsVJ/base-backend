//LOGICA NEGOCIO

import User from "../models/user.model";
import { signToken } from "./../util/auth.util";
import config from "./../config/config";
import * as validator from "./../util/validator.util";

const rulesInsertUser = {
  username: "required|string|min:2|max:10",
  password: "required|string|min:6|max:10",
  email: "required|email",
};

export const register = (usuario) => {
  return new Promise(async (resolve, reject) => {

    if (!validator.validarObjeto(usuario, rulesInsertUser, reject)) {
      return;
    }

    const { username, password, email } = usuario;

    const newUser = new User({
      username,
      password: await User.encryptPassword(password),
      email,
    });

    try {
      const savedUser = await newUser.save();
      const token = await signToken(savedUser._id, config.SECRET);
      resolve({user: savedUser.username ,token });

    } catch (error) {
      console.log(error);
      reject({ code: 500, message: "Error Trying to insert in database" });
    }
  });
};

export const login = (userLogin) => {
  const { username, password } = userLogin
  return new Promise (async (resolve, reject) => {

    const foundUser = await User.findOne({ username })
    if (!foundUser) {
      reject({ code: 404, message: "User not found"})
      return
    }
    const matchPw = await User.compareEncryptPassword(password, foundUser.password)
    if(!matchPw) {
      reject({ code: 401, message: "Invalid Password"})
      return
    }
    const token = await signToken(foundUser._id, config.SECRET)
    resolve({token})
  })
}