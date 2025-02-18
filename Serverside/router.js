import { Router } from "express";
import Auth from "./Authentication/Auth.js";
import * as rh from './requesthandler.js';
const router = Router();


router.route('/register').post(rh.register)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyEmail)
router.route('/getUser').get(Auth,rh.getUser)
router.route('/getProfile').get(Auth,rh.getProfile)
router.route('/updateProfile').put(Auth,rh.updateProfile)
router.route('/getUsers').get(Auth,rh.getUsers)
router.route('/getRecievers').get(Auth,rh.getRecievers)
router.route('/getReciever/:id').get(Auth,rh.getReciever)
router.route('/getMessage/:id').get(Auth,rh.getMessages)
router.route('/sendMessage').post(Auth,rh.addMessage)
router.route('/updateSeen').put(Auth,rh.updateSeen)


export default router;
