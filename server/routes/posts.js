import express from 'express';
import PostsCtrl from '../api/posts.controller.js';

const router = express.Router();

router.route('/').get(PostsCtrl.apiGetPosts);
router.route('/:id').get(PostsCtrl.apiGetPostById);
router.route('/').post(PostsCtrl.apiCreatePost);
router.route('/').put(PostsCtrl.apiUpdatePost);
router.route('/').delete(PostsCtrl.apiDeletePost);

export default router;
