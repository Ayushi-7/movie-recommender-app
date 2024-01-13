import fs from 'fs';

//ASYNC AWAIT WHEREVER THERE IS STORE -- mongodb  
// import { MongoClient } from 'mongodb';
// const url = 'mongodb://admin:password@genre-db:27017';
// const client = new MongoClient(url);
// const dbName = 'movies';

// let movies;
// const movieCollection = async () => {
//   if (!movies) {
//     await client.connect();
//     const db = client.db(dbName);
//     movies = db.collection('movies');
//   }
//   return movies;
// };

// const read = async () => {
//   try {
//     const collection = await movieCollection();
//     const docs = await collection.find({}).toArray();
//     return docs[0] || {};
//   }
//   catch (err) {
//     console.log(err);
//   }
// };

// const write = async (genre) => {
//   try {
//     const collection = await movieCollection();
//     await collection.deleteMany({});
//     await collection.insertOne(genre);
//   }
//   catch (err) {
//     console.log(err);
//   }
// };

const read = () => {
  if (fs.existsSync('genre.json')) {
    const genre = fs.readFileSync('genre.json');
    return JSON.parse(genre);
  } else {
    return {};
  }
};

const write = (genre) => {
  if (fs.existsSync('genre.json')) {
    fs.rmSync('genre.json', { force: true });
  }
  fs.writeFileSync('genre.json', JSON.stringify(genre));
};

export default {
  read,
  write,
};
