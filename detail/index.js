import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import Store from './store.js';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());

async function getMovies(heading){
    let res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${heading}&include_adult=false&language=en-US&api_key=55e139522d383193a0fc8450ca07fbe7&page=1`);
    let data = await res.json();
    return data.results;
}

app.get('/movies', (req, res) => {
    console.log(`(${process.pid}) Detail Service: GET /movies/`);
    const movies = Store.read();
    res.send(movies || []);
});

app.post('/movies', async (req, res) => {
    console.log(`(${process.pid}) Detail Service: POST /movies/:heading`);
    const { heading } = req.body;
    const movies = await getMovies(heading);
    Store.write(movies);
  
    try {
      await fetch('http://localhost:4005/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'DetailMoviesFound',
          data: {
            movies
          },
        }),
      });
    } catch (err) {
      console.log(`(${process.pid}) Detail Service: ${err}`);
      res.status(500).send({
        status: 'ERROR',
        message: err,
      });
    }
  
    res.status(201).send(movies);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    const type = event.type;
    
    console.log(`(${process.pid}) Detail Service Received Event: ${type}`);
    res.send({});
});

app.listen(4004, () => {
  console.log(`(${process.pid}) Detail Service Listening on 4004`);
});