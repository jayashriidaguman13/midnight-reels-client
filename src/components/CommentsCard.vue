<template>
  <div class="comment-card">
    <div class="comment-header">
      <span class="username">
        {{ comment.userId?.username || "Anonymous" }}
      </span>
      <div v-if="isOwner" class="actions">
        <button @click="$emit('edit', comment)" class="edit-btn">Edit</button>
        <button @click="$emit('delete', comment._id)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>
    <p class="comment-text">{{ comment.comment }}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: { type: Object, required: true },
    currentUserId: { type: String, required: true }
  },
  computed: {
    isOwner() {
      const id = this.comment.userId?._id || this.comment.userId;
      return id === this.currentUserId;
    }
  }
};
</script>

<style scoped>
.comment-card {
  background: white;
  color: #0b1426;
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.25);
  text-align: left;
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.username { font-weight: bold; font-size: 1rem; }
.actions { display: flex; gap: 10px; }
.edit-btn,
.delete-btn {
  background: transparent;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  color: #0b1426;
}
.delete-btn { color: #b00020; }
.comment-text { font-size: 0.95rem; line-height: 1.4; }
</style>