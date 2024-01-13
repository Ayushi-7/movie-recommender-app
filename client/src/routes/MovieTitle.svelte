 <script>
    import { onMount } from 'svelte';
    import { MovieStore, MovieDetailStore } from './stores.js';
    export let movie;
    let movies = [];
    let movieData = [];

    onMount(async () => {
    const res = await fetch('http://localhost:4002/movies');
    const data = await res.json();
    MovieStore.set(data);
    });

  MovieStore.subscribe((_movies) => {
    if (_movies === undefined) {
      return;
    }
    else if(_movies.data !== undefined) {
      movies = _movies.data;
      console.log(`MovieTitle: ${JSON.stringify(movies)}`);
    }
    else{
      movies = _movies;
      console.log(`MovieTitle: ${JSON.stringify(movies)}`);
    }

  });

    MovieDetailStore.subscribe((state, bool) => {
        movie = state.titleForDetail;
        movieData = movies.filter((m) => {
            return m.title === movie;
        });
    });

</script>

{#if movieData.length > 0}
    <h2> Title:{movieData[0].title}</h2>
    <p> <headers>Overview: </headers>{movieData[0].overview}</p>
    <p> <headers> Release Date: </headers>{movieData[0].release_date}</p>
    <p><headers>Adult: </headers>{movieData[0].adult}</p>
    <p><headers>Popularity: </headers>{movieData[0].popularity}</p>
    <p><headers>Vote Count: </headers>{movieData[0].vote_count}</p>
{/if}

<style>
    h2 {
      color: peru;
      font-family: 'Times New Roman', serif;
    }
  
    p {
      color: rgb(1, 1, 1);
      font-family: Arial, sans-serif;
      margin-bottom: 5px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    headers {
      color: peru;
    }
  </style>