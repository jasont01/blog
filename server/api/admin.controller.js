import ConfigDAO from '../db/configDAO.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
export default class AdminController {
  // static async createDefaultConfig() {
  //   const defaultConfig = {
  //     username: 'admin',
  //     password: '',
  //     featured_post: {
  //       title: 'Featured Post Title',
  //       description:
  //         "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  //       image: 'https://source.unsplash.com/random',
  //       url: '#',
  //     },
  //   };
  //   try {
  //     await ConfigDAO.createDefaultConfig(defaultConfig);
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // static async apiResetConfig(req, res) {
  //   try {
  //     await ConfigDAO.deleteConfig();
  //     await AdminController.createDefaultConfig();
  //     res.sendStatus(200);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // }

  // static async apiGetConfig(req, res) {
  //   const configExists = await ConfigDAO.verifyConfig();
  //   if (!configExists) await AdminController.createDefaultConfig();
  //   const config = await ConfigDAO.getConfig();
  //   res.json(config);
  // }

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

  // static async apiDeleteConfig(req, res) {
  //   try {
  //     await ConfigDAO.deleteConfig();
  //     res.sendStatus(200);
  //   } catch (e) {
  //     res.status(500).json({ error: e.message });
  //   }
  // }
}
