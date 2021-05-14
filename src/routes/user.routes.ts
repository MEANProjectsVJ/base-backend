import { Router } from "express"; //Router para las rutas
import * as userCtrl from "./../controllers/user.controller"
import { checkDuplicateUsernameEmail } from "./../middleware/handleUser.interceptor";

const router = Router();

router.post("/register", checkDuplicateUsernameEmail, userCtrl.register);
router.post("/login", userCtrl.login);


export default router;
