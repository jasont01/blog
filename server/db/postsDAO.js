import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let collection;

export default class PostsDAO {
  static async injectDB(conn) {
    if (collection) {
      return;
    }
    try {
      collection = await conn.db(process.env.DB_NS).collection('posts');
      console.log('Successfully connected to MongoDB.');
    } catch (e) {
      console.error(`Unable to establish collection handles in postsDAO: ${e}`);
    }
  }

  static async getPosts({ page, postsPerPage } = {}) {
    let docs;

    try {
      docs = await collection.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { posts: [], totalNumPosts: 0 };
    }

    const cursor = docs.limit(postsPerPage).skip(postsPerPage * page);

    try {
      const posts = await cursor.toArray();
      const totalNumPosts = await collection.countDocuments();

      return { posts, totalNumPosts };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { posts: [], totalNumPosts: 0 };
    }
  }

  static async getPostByID(id) {
    try {
      // const pipeline = [
      //   {
      //     $match: {
      //       _id: new ObjectId(id),
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'comments',
      //       let: {
      //         id: '$_id',
      //       },
      //       pipeline: [
      //         {
      //           $match: {
      //             $expr: {
      //               $eq: ['$post_id', '$$id'],
      //             },
      //           },
      //         },
      //         {
      //           $sort: {
      //             date: -1,
      //           },
      //         },
      //       ],
      //       as: 'comments',
      //     },
      //   },
      //   {
      //     $addFields: {
      //       reviews: '$comments',
      //     },
      //   },
      // ];
      // return await collection.aggregate(pipeline).next();

      return await collection.findOne({ _id: ObjectId(id) });
    } catch (e) {
      console.error(`Something went wrong in getPostByID: ${e}`);
      throw e;
    }
  }

  static async createPost(title, author, article, date) {
    try {
      const doc = {
        title,
        author,
        date,
        article,
      };

      return await collection.insertOne(doc);
    } catch (e) {
      console.error(`Unable to create post: ${e}`);
      return { error: e };
    }
  }

  static async updatePost(postId, title, author, article, date) {
    try {
      const updateResponse = await collection.updateOne(
        { _id: ObjectId(postId) },
        { $set: { title, author, article, date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deletePost(postId) {
    try {
      const deleteResponse = await collection.deleteOne({
        _id: ObjectId(postId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete post: ${e}`);
      return { error: e };
    }
  }
}
