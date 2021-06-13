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

  // static async verifyConfig() {
  //   try {
  //     const count = await collection.countDocuments();
  //     return count > 0;
  //   } catch (e) {
  //     console.error(`Unable to verify config, ${e}`);
  //     return {};
  //   }
  // }

  static async getFeaturedPost() {
    try {
      const config = await collection.findOne({});
      return config.featured_post;
    } catch (e) {
      console.error(`Unable to get featured post, ${e}`);
      return {};
    }
  }

  // static async createDefaultConfig(defaultConfig) {
  //   try {
  //     return await collection.insertOne(defaultConfig);
  //   } catch (e) {
  //     console.error(`Unable to create default config: ${e}`);
  //     return { error: e };
  //   }
  // }

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

  static async updateUser(userObj) {
    try {
      return await collection.updateOne({}, { $set: { admin: userObj } });
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

  // static async deleteConfig() {
  //   try {
  //     return await collection.deleteOne({});
  //   } catch (e) {
  //     console.error(`Unable to delete post: ${e}`);
  //     return { error: e };
  //   }
  // }
}
