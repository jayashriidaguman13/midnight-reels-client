<template>
  <div class="movie-card">
    <h3 class="movie-title">{{ movie.title }}</h3>
    <p class="movie-meta">{{ movie.year }} • {{ movie.director }}</p>
    <p class="movie-genre">{{ movie.genre }}</p>
    <p class="movie-desc">{{ movie.description }}</p>

    <button class="view-btn" @click="handleView">View Movie</button>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    handleView() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      } else {
        this.$router.push(`/movies/movie/${this.movie._id}`);
      }
    }
  }
};
</script>

<style scoped>
.movie-card {
  background: white;
  color: #0b1426;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.movie-meta {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 8px;
}

.movie-genre {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.movie-desc {
  font-size: 0.9rem;
  opacity: 0.85;
  margin-bottom: 15px;
}

.view-btn {
  padding: 10px 20px;
  font-size: 0.95rem;
  background: #0b1426;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>