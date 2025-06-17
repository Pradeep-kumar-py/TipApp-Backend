import e, { Router } from 'express';
import { ValidateOtpAurToken } from '../controllers/otp.controller.js';

const router = Router();

router.route('/verify').post(ValidateOtpAurToken)


export default router;