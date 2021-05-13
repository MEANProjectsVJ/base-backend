import { Router } from "express"; //Router para las rutas
import * as userCtrl from "./../controllers/user.controller"

const router = Router();

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);


export default router;
