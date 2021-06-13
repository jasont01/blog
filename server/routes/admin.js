import express from 'express';
import AdminCtrl from '../api/admin.controller.js';

const router = express.Router();

router.route('/config').get(AdminCtrl.apiGetConfig);
router.route('/config').post(AdminCtrl.apiResetConfig);
router.route('/config').put(AdminCtrl.apiUpdateConfig);
router.route('/config').delete(AdminCtrl.apiDeleteConfig);

export default router;
