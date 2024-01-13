<script>
    import MovieList from './MovieList.svelte';
    import { MovieStore } from './stores.js';
    let title = '';
    let click = 0;
    
    let genresNumbers = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

    const makeMovie = async (event) => {
      const res = await fetch('http://localhost:4001/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
  
      const data = await res.json();
      title = '';
      click = 1;
      console.log(`Client: ${JSON.stringify(data)}`);
  
      MovieStore.update((movies) => {
        return {data}
        });
    };

  </script>

  <h3>Please enter the number corresponding to the genre from the list below:</h3>
  <!-- display the array of number corresponding to each genre from genresNumbers -->
  {#each genresNumbers as genre}
    <spaced> {genre.name} : {genre.id} </spaced>

  {/each}

    <h3>Movie genre: {title}</h3>
    <input bind:value={title} />
    <button on:click={makeMovie}>Submit</button>

{#if click === 1}
    <MovieList />
{/if}

<style>
  
    h3 {
      color: #333;
      font-family: Arial, sans-serif;
    }
  
    input {
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 20px;
      width: 200px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    spaced {
        color: rgb(63, 120, 205);
        font-family: Arial, sans-serif;
        margin-right: 27px;
    }
  
    button {
      background-color: #4CAF50;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 30px;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>