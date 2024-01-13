<script>
  import MovieList from './MovieList.svelte';
  import {MovieStore} from './stores.js';
  let genre = '';
  function handleClick() {
      genre = document.getElementById('genre').value;
      console.log(genre);
  }
  function clear() {
      MovieStore.set([]);
  }
</script>

<div class="container">
  <h1>Movie genre:</h1>
  <input type="text" id="genre" name="genre" placeholder="Enter genre">
  <button on:click={handleClick}>Submit</button>
  <button on:click={clear}>Clear</button>
  <hr />
  <h1>Movies</h1>
  {#if (genre != '')} 
    <MovieList {genre} />
  {/if}

</div>
