<template>
  <div class="detail-page">
    <header class="detail-header">
      <div class="header-left">
        <button @click="$router.push('/movies')" class="back-btn">
          Back To Movies
        </button>
      </div>
    </header>

    <div class="detail-container">
      <div class="left-panel">
        <div class="movie-detail-card" v-if="movie">
          <h2 class="movie-title">{{ movie.title }}</h2>
          <p class="movie-meta">{{ movie.year }} • {{ movie.director }}</p>
          <p class="movie-genre">{{ movie.genre }}</p>
          <p class="movie-desc">{{ movie.description }}</p>
        </div>
      </div>

      <div class="right-panel">
        <div class="comment-header-area">
          <button class="add-comment-btn" @click="showModal = true">
            Add Comment
          </button>
        </div>

        <div class="comments-scroll">
          <CommentsCard
            v-for="comment in comments"
            :key="comment._id"
            :comment="comment"
            :currentUserId="currentUserId"
            @edit="handleEditComment"
            @delete="handleDeleteComment"
          />
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box">
        <h3>Add Comment</h3>
        <textarea
          v-model="newComment"
          placeholder="Write your comment..."
        ></textarea>

        <div class="modal-actions">
          <button class="post-btn" @click="submitComment">Post</button>
          <button class="cancel-btn" @click="showModal = false">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import CommentsCard from "../components/CommentsCard.vue";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export default {
  components: { CommentsCard },
  data() {
    return {
      movie: null,
      comments: [],
      showModal: false,
      newComment: "",
      currentUserId: "",
      editingCommentId: null
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      this.currentUserId = decoded.id;
    }

    await this.loadMovie();
    await this.loadComments();
  },
  methods: {
    async loadMovie() {
      try {
        const res = await api.get(`/movies/getMovie/${this.$route.params.id}`);
        this.movie = res.data;
      } catch (err) {
        console.error("Failed to load movie", err);
      }
    },
    async loadComments() {
      try {
        const res = await api.get(`/movies/getComments/${this.$route.params.id}`);
        this.comments = res.data.reverse();
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) return;

      try {
        if (this.editingCommentId) {
          const res = await api.put(
            `/movies/updateComment/${this.$route.params.id}/${this.editingCommentId}`,
            { comment: this.newComment }
          );

          const index = this.comments.findIndex(c => c._id === this.editingCommentId);
          if (index !== -1) this.comments[index] = res.data;

          this.editingCommentId = null;
        } else {
          const res = await api.post(
            `/movies/addComment/${this.$route.params.id}`,
            { comment: this.newComment }
          );
          this.comments.unshift(res.data);
        }

        this.newComment = "";
        this.showModal = false;
      } catch (err) {
        console.error("Failed to post comment", err);
      }
    },
    handleEditComment(comment) {
      this.showModal = true;
      this.newComment = comment.comment;
      this.editingCommentId = comment._id;
    },
    async handleDeleteComment(commentId) {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "This will permanently delete your comment.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0b1426',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        try {
          await api.delete(`/movies/deleteComment/${this.movie._id}/${commentId}`);
          this.comments = this.comments.filter(c => c._id !== commentId);

          Swal.fire({
            title: 'Deleted!',
            text: 'Your comment has been deleted.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (err) {
          console.error("Failed to delete comment", err);
          Swal.fire('Error', 'Failed to delete comment', 'error');
        }
      }
    }
  }
};
</script>

<style scoped>
.detail-page {
  background-color: #0b1426;
  min-height: 100vh;
  color: white;
  font-family: 'Oswald', 'Roboto', sans-serif;
}

.detail-header {
  height: 80px;
  padding: 10px 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.back-btn {
  padding: 8px 20px;
  font-size: 0.95rem;
  background: white;
  color: #0b1426;
  border: 2px solid #0b1426;
  border-radius: 25px;
  cursor: pointer;
}

.detail-container {
  display: flex;
  height: calc(100vh - 80px);
}

.left-panel {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-detail-card {
  background: white;
  color: #0b1426;
  padding: 35px;
  border-radius: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.movie-title { font-size: 2rem; margin-bottom: 10px; }
.movie-meta { font-size: 1rem; margin-bottom: 12px; }
.movie-genre { font-size: 0.95rem; font-weight: bold; margin-bottom: 15px; }
.movie-desc { font-size: 1rem; line-height: 1.5; }

.right-panel {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  padding: 20px 30px;
}

.comment-header-area {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  flex-shrink: 0;
  align-self: stretch;
}

.add-comment-btn {
  padding: 10px 25px;
  font-size: 1rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.comments-scroll {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-box {
  background: white;
  color: #0b1426;
  width: 90%;
  max-width: 400px;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.modal-box h3 { margin-bottom: 15px; }

.modal-box textarea {
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 0.95rem;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.post-btn,
.cancel-btn {
  padding: 8px 20px;
  font-size: 0.95rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}

.post-btn { background: #0b1426; color: white; }
.cancel-btn { background: #ccc; }

@media (max-width: 900px) {
  .detail-container { flex-direction: column; }
  .left-panel,
  .right-panel { width: 100%; height: auto; }
  .movie-detail-card { width: 90%; margin: 20px 0; }
}
</style>