
import express from "express";
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import * as database from "./database";

database.conection()
  .then(() => {
      startServer()
  })
  .catch(err => {
    console.log(err)
  })

  const startServer = () => {
    const app = express();
    dotenv.config();// Usa la configuracion config/config.ts. Se puede cambiar usando path //require("dotenv").config(); //{path: './config/config.ts'}
    const PORT = process.env.PORT

    app.use(morgan("tiny"))
    app.use(cors())
    app.use(helmet())
    app.use(express.json({ limit: "5mb" }))

    app.listen(PORT)
    console.log("Escuchando en el puerto:", PORT)
  }
