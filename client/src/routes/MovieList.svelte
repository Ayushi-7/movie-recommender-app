<script>
  import { onMount } from 'svelte';
  import { MovieStore, MovieDetailStore } from './stores.js';
  import MovieTitle from './MovieTitle.svelte';
  // a variable to store the movies
  let movies = []; 

  onMount(async () => {
    // when the component is mounted, fetch call is made to the query service
    const res = await fetch('http://localhost:4002/movies');
    const data = await res.json();
    // data is set in the store
    MovieStore.set(data);
  });

  // when the store is updated, the movies variable is updated
  MovieStore.subscribe((_movies) => {
    if (_movies === undefined) {
      return;
    }
    else if(_movies.data !== undefined) {
      movies = _movies.data;
      console.log(`MovieList: ${JSON.stringify(movies)}`);
    }
    else{
      movies = _movies;
      console.log(`MovieList: ${JSON.stringify(movies)}`);
    }
  });

  // This function updates the store with an object so that svelte can 
  // recognize that the detail button has been clicked
   function detail(title){
    let state = { detailBool: 1, titleForDetail: title };
    MovieDetailStore.set(state);
    }

</script>

<h3>Movie List</h3>

<ul>
  {#each movies as movie}
    <li>
      <q>{movie.title}</q>
      <br>
      {movie.overview}
      <br>
      <button on:click={detail(movie.title)}>Details</button>
    </li>
  {/each}
</ul>

<!-- This checks the store to see whether the detail button has been clicked -->
{#if $MovieDetailStore.detailBool}
  <!-- If it has, then the MovieTitle component is rendered -->
    <MovieTitle movie={$MovieDetailStore.titleForDetail}/>
{/if}

<style>
  h1 {
    color: #444;
    font-family: 'Helvetica Neue', sans-serif;
  }

  h3 {
      color: #333;
      font-family: Arial, sans-serif;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    background-color: #f9f9f9;
    margin-bottom: 10px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  q {
    font-size: large;
    color: blue;
  }

  button {
    background-color: #008CBA;
    color: white;
    padding: 10px 15px;
    margin: 5px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #007ba7;
  }
</style>


  <!-- const res = await fetch('http://localhost:4004/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

  console.log("checking what is happening in detail bool");
  console.log($MovieDetailStore.detailBool);
  console.log($MovieDetailStore.titleForDetail); -->