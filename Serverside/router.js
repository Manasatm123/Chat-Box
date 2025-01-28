import { Router } from "express";
// import Auth from "./Authentication/Auth.js";
import * as rh from './requesthandler.js';
const router = Router();


router.route("/register").post(rh.register);
router.route("/login").post(rh.login);
router.route("/verify").post(rh.verifyEmail);

export default router;
