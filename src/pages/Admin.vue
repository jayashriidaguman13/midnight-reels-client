<template>
  <div class="admin-page">
    <header class="admin-header">
      <h1>Admin Dashboard</h1>
    </header>

    <div class="admin-actions">
      <button class="add-btn" @click="openAddModal">Add Movie</button>
    </div>

    <div class="movies-table-container">
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
            <td class="actions">
              <button class="edit-btn" @click="openEditModal(movie)">Edit</button>
              <button class="delete-btn" @click="confirmDelete(movie._id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box">
        <h3>{{ editingMovie ? 'Edit Movie' : 'Add Movie' }}</h3>
        <input v-model="movieForm.title" placeholder="Title" />
        <input v-model="movieForm.year" placeholder="Year" type="number" />
        <input v-model="movieForm.director" placeholder="Director" />
        <input v-model="movieForm.genre" placeholder="Genre" />
        <textarea v-model="movieForm.description" placeholder="Description"></textarea>

        <div class="modal-actions">
          <button class="save-btn" @click="submitMovie">{{ editingMovie ? 'Save' : 'Add' }}</button>
          <button class="cancel-btn" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-box">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this movie?</p>
        <div class="modal-actions">
          <button class="delete-btn" @click="deleteMovie">Yes</button>
          <button class="cancel-btn" @click="showDeleteModal = false">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "AdminMovies",
  data() {
    return {
      movies: [],
      showModal: false,
      editingMovie: null,
      movieForm: { title: "", year: "", director: "", genre: "", description: "" },
      showDeleteModal: false,
      deleteMovieId: null
    };
  },
  async mounted() {
    await this.loadMovies();
  },
  methods: {
    async loadMovies() {
      try {
        const res = await api.get("/movies/getMovies");
        this.movies = res.data;
      } catch (err) {
        console.error("Failed to load movies", err);
      }
    },
    openAddModal() {
      this.editingMovie = null;
      this.movieForm = { title: "", year: "", director: "", genre: "", description: "" };
      this.showModal = true;
    },
    openEditModal(movie) {
      this.editingMovie = movie;
      this.movieForm = { ...movie };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async submitMovie() {
      try {
        if (this.editingMovie) {
          const res = await api.put(`/movies/updateMovie/${this.editingMovie._id}`, this.movieForm);
          const index = this.movies.findIndex(m => m._id === this.editingMovie._id);
          if (index !== -1) this.movies[index] = res.data;
        } else {
          const res = await api.post("/movies/addMovie", this.movieForm);
          this.movies.push(res.data);
        }
        this.closeModal();
      } catch (err) {
        console.error("Failed to save movie", err);
      }
    },
    confirmDelete(id) {
      this.deleteMovieId = id;
      this.showDeleteModal = true;
    },
    async deleteMovie() {
      try {
        await api.delete(`/movies/deleteMovie/${this.deleteMovieId}`);
        this.movies = this.movies.filter(m => m._id !== this.deleteMovieId);
        this.showDeleteModal = false;
      } catch (err) {
        console.error("Failed to delete movie", err);
      }
    }
  }
};
</script>

<style scoped>
.admin-page {
  background-color: #0b1426;
  min-height: 100vh;
  color: white;
  font-family: 'Oswald', 'Roboto', sans-serif;
  padding: 20px;
}

.admin-header {
  text-align: center;
  margin-bottom: 20px;
}

.add-btn {
  background: #1f2937;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.movies-table-container {
  overflow-x: auto;
}

.movies-table {
  width: 100%;
  border-collapse: collapse;
  background: #1f2937;
}

.movies-table th,
.movies-table td {
  padding: 12px 15px;
  border: 1px solid #374151;
}

.movies-table th {
  text-align: left;
  background: #111827;
}

.actions button {
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #3b82f6;
  color: white;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-box {
  background: #111827;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.modal-box input,
.modal-box textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
</style>