import express from 'express';
import { signUp, logIn, forgotPass, logOut } from '../controllers/authentication.js';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/logIn', logIn);
router.post('/forgotPass', forgotPass);
router.post('/logOut', logOut);

export default router;
