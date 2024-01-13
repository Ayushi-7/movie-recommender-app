import express from 'express';
import cors from 'cors';
import Store from './store.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/movies', (req, res) => {
  const movies = Store.read();
  res.send(movies);
});

app.get('/title', (req, res) => {
    const title = Store.readTitle();
    res.send(title);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  console.log(`(${process.pid}) Query Service Received Event: ${type}`);

    if (type === 'GenreMoviesFound') {
        let movies = Store.read();
        let results = data.movies;
        movies = results;
        Store.write(movies);
    }

    if (type === 'DetailMoviesFound') {
        let movies = Store.readTitle();
        let results = data.movies;
        movies = results;
        Store.writeTitle(movies);
    }

  res.send({ status: 'OK' });
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
