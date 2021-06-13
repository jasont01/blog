import express from 'express';
import PostsCtrl from '../api/posts.controller.js';

const router = express.Router();

router.route('/').get(PostsCtrl.apiGetPosts);
router.route('/featured').get(PostsCtrl.apiGetFeaturedPost);
router.route('/:id').get(PostsCtrl.apiGetPostById);

export default router;
