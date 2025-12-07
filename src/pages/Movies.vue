<template>
  <div class="movies-page">
    <header class="movies-header">
	  <div class="header-left">
	    <button @click="$router.push('/')" class="back-btn">Back To Home</button>
	  </div>
	  <div class="header-center">
	    <img src="/images/logo.png" alt="Midnight Reels Logo" class="logo" />
	  </div>
	  <div class="header-right">
	    <button @click="$router.push('/login')" class="nav-btn">Login</button>
	    <button @click="$router.push('/register')" class="nav-btn">Register</button>
	  </div>
	</header>

    <section class="movies-section">
      <h2>Now Showing</h2>
      <div class="movies-grid">
        <movie-card v-for="movie in movies" :key="movie._id" :movie="movie" />
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import api from "../api.js";

export default {
  name: "Movies",
  components: {
    MovieCard
  },
  data() {
    return {
      movies: []
    };
  },
  async mounted() {
    await this.loadMovies();
  },
  methods: {
    async loadMovies() {
      try {
        const response = await api.get("/movies");
        this.movies = response.data;
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    }
  }
};
</script>

<style scoped>
.movies-page {
  background-color: #0b1426;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Oswald', 'Roboto', sans-serif;
}

.movies-header {
  background-image: url("/images/movies-bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  position: relative;
  height: 35vh;
  padding: 10px 20px;
  box-sizing: border-box;
}

.header-left,
.header-center,
.header-right {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.header-left { justify-content: flex-start; }
.header-center { justify-content: center; align-items: center; }
.header-right { justify-content: flex-end; }

.header-left .back-btn,
.header-right .nav-btn {
  padding: 8px 20px;
  font-size: 0.95rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: 2px solid #0b1426;
}

.header-right .nav-btn {
	margin: 5px;
	margin-top: -1px;
}

.header-center .logo {
  height: 150px;
  margin-top: 0.5rem;
  margin-left: 2.5rem;
  justify-content: center;
}

.movies-section {
  flex: 1; 
  padding: 10px 20px;

  text-align: center;
  overflow-y: auto;
}

.movies-section h2 {
  font-size: 2.8rem;
  margin: 10px 1rem 2px 2rem;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .header-left, .header-right { flex: 1; }
  .header-center .logo { height: 50px; }
  .movies-section h2 { font-size: 2rem; }
}

@media (max-width: 480px) {
  .header-left .back-btn,
  .header-right .nav-btn { padding: 6px 12px; font-size: 0.85rem; }
  .header-center .logo { height: 40px; }
  .movies-section h2 { font-size: 1.6rem; }
}
</style>