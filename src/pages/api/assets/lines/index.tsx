import { MongoClient } from 'mongodb';

export default async (req, res) => {
  try {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    // console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    // console.log('Successfully connected to MongoDB Atlas!');

    // return mongoClient;
    const db = mongoClient.db('ASIO');

    const lines = await db
      .collection('Lines')
      .find({})
      .limit(500)
      .toArray();

    res.status(200).json({success: true, data: lines} );
  } catch (e) {
    console.error(e);
  }
};
