import express from 'express';
import AdminCtrl from '../api/admin.controller.js';
import PostsCtrl from '../api/posts.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.use((req, res, next) => {
  if (!req.token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        next();
      }
    });
  }
});

router.route('/featured').put(AdminCtrl.apiUpdateFeaturedPost);
router.route('/user').put(AdminCtrl.apiUpdateUser);

router.route('/post').post(PostsCtrl.apiCreatePost);
router.route('/post').put(PostsCtrl.apiUpdatePost);
router.route('/post').delete(PostsCtrl.apiDeletePost);

export default router;
