<template>
  <div class="movie-card">
    <h3>{{ movie.title }}</h3>
    <p class="movie-year-genre">{{ movie.year }} | {{ movie.genre }}</p>
    <p class="movie-director">Directed by {{ movie.director }}</p>
    <p class="movie-description">{{ movie.description }}</p>
    <button class="view-btn" @click="handleViewMovie">View Movie</button>
  </div>
</template>

<script>
import { getToken } from "../auth.js";

export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleViewMovie() {
      const token = getToken();
      if (token) {
        this.$router.push(`/movie/${this.movie._id}`);
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style scoped>
.movie-card {
  background: white;
  color: #0b1426;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-card h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.movie-year-genre {
  font-size: 0.95rem;
  margin-bottom: 8px;
  opacity: 0.8;
}

.movie-director {
  font-style: italic;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.movie-description {
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.view-btn {
  padding: 10px 25px;
  font-size: 0.95rem;
  background-color: #0b1426;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  align-self: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

</style>