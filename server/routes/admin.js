import express from 'express';
import AdminCtrl from '../api/admin.controller.js';
import PostsCtrl from '../api/posts.controller.js';

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

//router.route('/config').post(AdminCtrl.apiResetConfig);
//router.route('/config').delete(AdminCtrl.apiDeleteConfig);
router.route('/featured').put(AdminCtrl.apiUpdateFeaturedPost);
router.route('/user').put(AdminCtrl.apiUpdateUser);

router.route('/post').post(PostsCtrl.apiCreatePost);
router.route('/post').put(PostsCtrl.apiUpdatePost);
router.route('/post').delete(PostsCtrl.apiDeletePost);

export default router;
