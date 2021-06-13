import app from './server.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import PostsDAO from './db/postsDAO.js';
import ConfigDAO from './db/configDAO.js';

dotenv.config();

const port = process.env.PORT || 3000;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => {
    console.error(err.statck);
    process.exit(1);
  })
  .then(async (client) => {
    await PostsDAO.injectDB(client);
    await ConfigDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
