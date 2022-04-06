<script>
export default {

  name: "Movies",
  components: {},
  data() {
    return {
      movies: [],
      favorites: [],
      localFavorites: [],
      selectedMovie: Proxy,
      previewImage: ""
    }
  },
  async created() {
    // Get the data from the local storage
    const date = this.$route.params.date;
    const favorites = this.$route.params.favorites;

    // Calls the api to get all the films
    const response = await fetch("https://ghibliapi.herokuapp.com/films");

    if (favorites === 'false' || favorites === undefined) {
      // Check whether the date is passed through the router
      if (date === undefined) {
        this.movies = await response.json();
      } else {
        // If not, then get all the movies with the same release date
        const data = await response.json();

        // Loops trough all the films
        for (let i = 0; i < data.length; i++) {
          // Checks if the release date of the film is the dame as the date in the router (film date)
          if (data[i].release_date === date) {
            this.movies.push(data[i]);
          }
        }
      }
      // Set the local favorites from the data in the local storage
      this.localFavorites = JSON.parse(localStorage.getItem("favorites") || '[]');
    } else {
      // Retrieve all the movies from the local storage
      this.favorites = JSON.parse(localStorage.getItem("favorites") || '[]');
      this.localFavorites = this.favorites;
    }
  },
  methods: {
    /**
     * Selects a movie after clicking on them, also changes the image (preview)
     * @param movie The selected movie
     */
    selectMovie(movie) {
      this.selectedMovie = movie;
      this.previewImage = this.selectedMovie.image;
    },
    /**
     * This method adds a movie to the local storage (favorites)
     * @param movie The selected movie
     */
    addToFavorites(movie) {
      // Get the favorites from the localstorage
      this.favorites = JSON.parse(localStorage.getItem("favorites") || '[]');

      // Add the movie to the favorites array
      this.favorites.push(movie);

      // Update / set the favorites to the Localdate again and update the local favorites
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      this.localFavorites.push(movie);
    },
    /**
     * This method removes a movie from the local storage (favorites)
     * @param movie The selected movie
     */
    removeFromFavorites(movie) {
      // Get the favorites from the localstorage
      this.favorites = JSON.parse(localStorage.getItem("favorites") || '[]')

      // Remove the movie from the favorites array
      this.favorites.splice(this.checkImageStar(movie), 1);

      // Update / set the favorites to the Localdate again and update the local favorites
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      this.localFavorites.splice(this.checkImageStar(movie), 1);
    },
    /**
     * This method checks whether the selected movie is in the localstorage data or not.
     * @param movie The selected movie.
     * @returns the number of the index in the local favorites list.
     */
    checkImageStar(movie) {
      // Loops through the local favorites filled by local storage data
      for (let i = 0; i < this.localFavorites.length; i++) {
        // Check if the id is the same as the selected movie id
        if (this.localFavorites[i].id === movie.id) {
          return i;
        }
      }
      return -1;
    }
  }
}
</script>

<template>
  <div class="main-container">
    <div class="container">
      <!-- Movie item container -->
      <div class=item-container v-for="movie in (movies.length > 0 ? movies : favorites)"
           :key="movie.id" v-on:click="selectMovie(movie)">
        <h1>Title: {{ movie.title }} | Director: {{ movie.director }}</h1>
      </div>
    </div>
    <div class="preview" v-if="previewImage !== ''">
      <!-- Image + description -->
      <div class="top-content-container">
        <h1 class="rating">{{ selectedMovie.rt_score }}</h1>
        <img class="preview-image" :src="previewImage" alt="Preview Image">

        <!-- When a movie is NOT in the local storage -->
        <img v-if="checkImageStar(selectedMovie) === -1" class="star-image" src="../assets/star_unfilled.png"
             alt="Star" v-on:click="addToFavorites(selectedMovie)">
        <!-- When a movie IS in the local storage -->
        <img v-else class="star-image" src="../assets/star_filled.png"
             alt="Star" v-on:click="removeFromFavorites(selectedMovie)">
      </div>
      <h1 class="data-text-description">{{ selectedMovie.description}}</h1>

      <!-- Data text container -->
      <div class="data-container">
        <h1 class="data-text">ID: </h1>
        <h1 class="data-text-secondary">{{selectedMovie.id}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Title:</h1>
        <h1 class="data-text-secondary">{{selectedMovie.title}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Director:</h1>
        <h1 class="data-text-secondary">{{selectedMovie.director}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Release date:</h1>
        <h1 class="data-text-secondary">{{selectedMovie.release_date}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Length (minutes):</h1>
        <h1 class="data-text-secondary">{{selectedMovie.running_time}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Original title:</h1>
        <h1 class="data-text-secondary">{{selectedMovie.original_title_romanised}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Score rating:</h1>
        <h1 class="data-text-secondary">{{selectedMovie.rt_score}}</h1>
      </div>
      <div class="data-container">
        <h1 class="data-text">Producer(s):</h1>
        <h1 class="data-text-secondary">{{selectedMovie.producer}}</h1>
      </div>
    </div>
    <div v-else class="preview">
      <h1 v-if="movies.length > 0 || favorites.length > 0" class="select-preview-text">Select a movie!</h1>
      <h1 v-else class="select-preview-text">No Favorites</h1>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  margin-top: 10px;
  display: flex;
  gap: 50px;
  flex-direction: row;
}
.container {
  overflow: scroll;
  min-width: 50%;
  max-height: 90%;
  overflow-x: hidden;
}
.item-container {
  width: 100%;
  height: 65px;
  background: #FFFFFF;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.item-container h1 {
  font-size: 1rem;
  font-family: Cabin, sans-serif;
  padding: 12px;
  font-weight: 100;
  align-content: center;
}

.item-container:hover {
  cursor: pointer;
  background-color: #eef6f5;
}

.top-content-container {
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.preview {
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  min-width: 45%;
  display: flex;
  flex-direction: column;
  margin-right: 45px;
  max-height: 90%;
  gap: 10px;
}

.preview-image {
  object-fit: contain;
  height: 300px;
  margin: 30px auto;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}

.star-image {
  object-fit: contain;
  height: 50px;
  margin: 30px;
}

.star-image:hover {
  cursor: pointer;
}

.rating {
  font-family: Cabin, sans-serif;
  margin: 30px;
  color: gray;
}

.data-text {
  font-family: Cabin, sans-serif;
  font-size: 1.1rem;
  margin: 0;
  margin-left: 10px;
}
.data-text-description {
  font-family: Cabin, sans-serif;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 100;
  margin: 10px;
}
.data-text-secondary {
  font-family: Cabin, sans-serif;
  font-size: 1.1rem;
  color: gray;
  font-weight: 100;
  margin: 0;
}

.data-container {
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.select-preview-text {
  font-family: Cabin, sans-serif;
  text-align: center;
}

@media all and (max-width: 850px) {
  .main-container {
    display: flex;
    flex-direction: column;
  }
}

</style>
