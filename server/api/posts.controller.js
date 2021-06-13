import ConfigDAO from '../db/configDAO.js';
import PostsDAO from '../db/postsDAO.js';

export default class PostsController {
  static async apiGetFeaturedPost(req, res) {
    try {
      const featuredPost = await ConfigDAO.getFeaturedPost();
      res.status(200).json(featuredPost);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async apiGetPosts(req, res) {
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const postsPerPage = req.query.postsPerPage
      ? parseInt(req.query.postsPerPage)
      : 5;
    try {
      const { posts, totalNumPosts } = await PostsDAO.getPosts({
        page,
        postsPerPage,
      });

      let response = { posts, totalNumPosts };
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async apiGetPostById(req, res) {
    const id = req.params.id || {};
    try {
      const post = await PostsDAO.getPostByID(id);
      if (!post) {
        res.sendStatus(404);
        return;
      }
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async apiCreatePost(req, res) {
    try {
      const title = req.body.title;
      const author = req.body.author;
      const article = req.body.article;
      const date = new Date();

      await PostsDAO.createPost(title, author, article, date);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdatePost(req, res) {
    try {
      const postId = req.body.post_id;
      const title = req.body.title;
      const author = req.body.author;
      const article = req.body.article;
      const date = new Date();

      await PostsDAO.updatePost(postId, title, author, article, date);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeletePost(req, res) {
    try {
      const postId = req.query.postId;
      await PostsDAO.deletePost(postId);
      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
