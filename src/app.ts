
import express from "express";
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import * as database from "./database";
import config from "./config/config";

//Rutas
import userRoutes from "./routes/user.routes";

database.conection()
  .then(() => {
      startServer()
  })
  .catch(err => {
    console.log(err)
  })


  const startServer = () => {
    //************ CONFIG DEL SERVIDOR *****************/

    const app = express();
    dotenv.config();// Usa la configuracion config/config.ts. Se puede cambiar usando path //require("dotenv").config(); //{path: './config/config.ts'}
    const PORT = config.PORT

    app.use(morgan("tiny")) //muestra peticiones entrantes
    app.use(cors())
    app.use(helmet()) //protección y validacion
    app.use(express.json({ limit: "5mb" }))//limitar peticiones body

    //************ CONFIG DEL SERVIDOR *****************/

    //Uso Rutas
    app.use(userRoutes)

    app.listen(PORT)
    console.log("Escuchando en el puerto:", PORT)
  }
