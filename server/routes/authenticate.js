import express from 'express';
import AuthCtrl from '../api/authentication.controller.js';

const router = express.Router();

router.route('/').post(AuthCtrl.apiValidateUser);

export default router;
