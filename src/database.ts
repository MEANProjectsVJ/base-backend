import mongoose from "mongoose";
import config from "./config/config";

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

export const conection = () => {
  return new Promise<string>((resolve, reject) => {
    console.log("conectando a la base de datos")
    mongoose.connect(config.DB, dbOptions)
    .then(() => {
      console.log("Connected")
      resolve(`Connected`)
    })
    .catch(err => {
      console.log(err)
      reject()
    })
  })
}

