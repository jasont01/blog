import ConfigDAO from '../db/configDAO.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AdminController {
  static async apiValidateUser(req, res) {
    try {
      const { username, password } = req.body;

      const { adminUsername, hash } = await ConfigDAO.getAdminCredentials();

      if (username !== adminUsername) {
        res.sendStatus(401);
        return;
      }
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          const payload = { username };
          const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h',
          });
          res
            .cookie('token', token, { httpOnly: true })
            .status(200)
            .json({ username, token });
        } else {
          res.sendStatus(401);
        }
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
