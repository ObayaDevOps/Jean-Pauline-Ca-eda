// TODO Not currently used

// import mongoose from 'mongoose';
// // // eslint-disable-next-line
// // import User from '../../models/user/user';
// // // eslint-disable-next-line
// // import Team from '../../models/team/team';
// // // eslint-disable-next-line
// // import Org from '../../models/org/organization';
// // // eslint-disable-next-line
// // import OrgInvite from '../../models/invites/orgInvite';
// // // eslint-disable-next-line
// // import Clxn from '../../models/clxn/clxn';
// // // eslint-disable-next-line
// // import TeamInvite from '../../models/invites/teamInvite';
// // // eslint-disable-next-line
// // import ClxnInvite from '../../models/invites/clxnInvite';
// // // eslint-disable-next-line
// // import Point from '../../models/item/point';
// // // eslint-disable-next-line
// // import Photo from '../../models/photo/photo';
// // // eslint-disable-next-line
// // import PointComment from '@/models/comments/pointComment';
// // // eslint-disable-next-line
// // import Property from '@/models/item/property';
// // // eslint-disable-next-line
// // import Record from '@/models/records/record';

// /*
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */

// let cached = global.mongoose;

// if (!cached) {
//   // eslint-disable-next-line
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect(dbName = '') {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       minPoolSize: 10,
//       useNewUrlParser: true,
//       serverSelectionTimeoutMS: 9000,
//     };

//     // moving this here instead of the top of the file below imports solved
//     // the issue but it could be a weak fix... process.env seems to be available at this point
//     // but the error below was thrown when placed early in this file...
//     const { MONGODB_URL, NODE_ENV } = process.env;
//     if (!MONGODB_URL) {
//       throw new Error(
//         'Please define the MONGODB_URL environment variable inside .env.local'
//       );
//     }
//     // end moved section

//     let MODIFIED_MONGO_URL = MONGODB_URL;

//     if (NODE_ENV === 'test') {
//       // notice an error here I think... process.env has modifiers,
//       // appending test incorrectly here
//       if (dbName === '') MODIFIED_MONGO_URL = `${MONGODB_URL}test`;
//       // <-- BUG!
//       else MODIFIED_MONGO_URL = MONGODB_URL + dbName.toString();
//     }

//     mongoose.set('strictQuery', false);

//     cached.promise = mongoose
//       .connect(MODIFIED_MONGO_URL, opts)
//       // eslint-disable-next-line
//       .then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;
