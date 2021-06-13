import ConfigDAO from '../db/configDAO.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
export default class AdminController {
  static async apiUpdateFeaturedPost(req, res) {
    try {
      const featuredPost = req.body;
      await ConfigDAO.updateFeaturedPost(featuredPost);
      res.sendStatus(200);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUser(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        await ConfigDAO.updateUser({ username: username, password: hash });
        res.sendStatus(200);
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
