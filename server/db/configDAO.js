let collection;
export default class ConfigDAO {
  static async injectDB(conn) {
    if (collection) {
      return;
    }
    try {
      collection = await conn.db(process.env.DB_NS).collection('config');
    } catch (e) {
      console.error(
        `Unable to establish collection handles in configDAO: ${e}`
      );
    }
  }

  static async getFeaturedPost() {
    try {
      const config = await collection.findOne({});
      return config.featured_post;
    } catch (e) {
      console.error(`Unable to get featured post, ${e}`);
      return {};
    }
  }

  static async updateFeaturedPost(featuedPost) {
    try {
      return await collection.updateOne(
        {},
        { $set: { featured_post: featuedPost } }
      );
    } catch (e) {
      console.error(`Unable to update config: ${e}`);
      return { error: e };
    }
  }

  static async updateUser(username, hash) {
    try {
      if (hash) {
        return await collection.updateOne(
          {},
          { $set: { admin: { username, password: hash } } }
        );
      } else {
        return await collection.updateOne(
          {},
          { $set: { 'admin.username': username } }
        );
      }
    } catch (e) {
      console.error(`Unable to update user config: ${e}`);
    }
  }

  static async getAdminCredentials() {
    try {
      const doc = await collection.findOne({});
      const adminUsername = doc.admin.username;
      const hash = doc.admin.password;
      return { adminUsername, hash };
    } catch (e) {
      return { error: e };
    }
  }
}
