<template>
  <div class="movies-page">
    <header class="movies-header" v-if="!isAdmin">
      <div class="header-left">
        <button @click="$router.push('/')" class="back-btn">Back To Home</button>
      </div>
      <div class="header-center">
        <img src="/images/logo.png" alt="Midnight Reels Logo" class="logo" />
      </div>
      <div class="header-right">
        <button v-if="!isLoggedIn" @click="$router.push('/login')" class="nav-btn">Login</button>
        <button v-if="!isLoggedIn" @click="$router.push('/register')" class="nav-btn">Register</button>
        <button v-if="isLoggedIn" @click="logout" class="nav-btn">Logout</button>
      </div>
    </header>

    <section v-if="isAdmin" class="admin-section">
      <h2>Admin Dashboard</h2>
      <button class="add-movie-btn" @click="showAddModal = true">Add Movie</button>

      <table class="movies-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Director</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie._id">
            <td>{{ movie.title }}</td>
            <td>{{ movie.year }}</td>
            <td>{{ movie.director }}</td>
            <td>{{ movie.genre }}</td>
            <td>
              <button @click="editMovie(movie)">Edit</button>
              <button @click="confirmDeleteMovie(movie._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-else class="movies-section">
      <h2>Now Showing</h2>
      <div class="movies-grid">
        <movie-card v-for="movie in movies" :key="movie._id" :movie="movie" />
      </div>
    </section>

    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-box">
        <h3>{{ editingMovie ? 'Edit Movie' : 'Add Movie' }}</h3>
        <input v-model="movieForm.title" placeholder="Title" />
        <input v-model="movieForm.year" placeholder="Year" type="number" />
        <input v-model="movieForm.director" placeholder="Director" />
        <input v-model="movieForm.genre" placeholder="Genre" />
        <textarea v-model="movieForm.description" placeholder="Description"></textarea>
        <div class="modal-actions">
          <button @click="submitMovie">{{ editingMovie ? 'Update' : 'Add' }}</button>
          <button @click="cancelModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import api from "../api.js";
import { jwtDecode } from "jwt-decode";

export default {
  name: "Movies",
  components: { MovieCard },
  data() {
    return {
      movies: [],
      isLoggedIn: false,
      isAdmin: false,
      showAddModal: false,
      editingMovie: null,
      movieForm: {
        title: "",
        year: "",
        director: "",
        genre: "",
        description: ""
      }
    };
  },
  async mounted() {
    this.checkAuth();
    await this.loadMovies();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token;
      if (token) {
        const decoded = jwtDecode(token);
        this.isAdmin = decoded.isAdmin;
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    },
    async loadMovies() {
      try {
        const res = await api.get("/movies/getMovies");
        this.movies = res.data;
      } catch (err) {
        console.error("Failed to load movies", err);
      }
    },
    editMovie(movie) {
      this.editingMovie = movie;
      this.movieForm = { ...movie };
      this.showAddModal = true;
    },
    cancelModal() {
      this.showAddModal = false;
      this.editingMovie = null;
      this.movieForm = { title: "", year: "", director: "", genre: "", description: "" };
    },
    async submitMovie() {
      try {
        if (this.editingMovie) {
          await api.put(`/movies/updateMovie/${this.editingMovie._id}`, this.movieForm);
        } else {
          await api.post("/movies/addMovie", this.movieForm);
        }
        await this.loadMovies();
        this.cancelModal();
      } catch (err) {
        console.error("Failed to add/update movie", err);
      }
    },
    async confirmDeleteMovie(movieId) {
      if (!confirm("Are you sure you want to delete this movie?")) return;
      try {
        await api.delete(`/movies/deleteMovie/${movieId}`);
        this.movies = this.movies.filter(m => m._id !== movieId);
      } catch (err) {
        console.error("Failed to delete movie", err);
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
  font-family: 'Oswald', 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
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

.header-right .nav-btn { margin: 5px; margin-top: -1px; }
.header-center .logo { height: 150px; margin-top: 0.5rem; margin-left: 2.5rem; }

.movies-section { flex: 1; padding: 10px 20px; text-align: center; overflow-y: auto; }
.movies-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; margin: 0 1rem; }
.movies-section h2 { font-size: 2.8rem; margin: 10px 1rem 30px 2rem; }

.admin-section {
  padding: 20px;
  text-align: center;
}
.movies-table { width: 90%; margin: 0 auto; border-collapse: collapse; }
.movies-table th, .movies-table td { border: 1px solid #fff; padding: 10px; }
.movies-table th { background-color: #1b2340; }
.add-movie-btn { margin-bottom: 15px; padding: 10px 20px; background: #fff; color: #0b1426; border: none; border-radius: 5px; cursor: pointer; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999;
}
.modal-box { background: #fff; color: #0b1426; padding: 20px; border-radius: 10px; width: 400px; max-width: 90%; }
.modal-box input, .modal-box textarea { width: 100%; margin-bottom: 10px; padding: 8px; border-radius: 5px; border: 1px solid #ccc; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
.modal-actions button { padding: 8px 15px; border-radius: 5px; border: none; cursor: pointer; }
</style>