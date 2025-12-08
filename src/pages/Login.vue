<template>
  <div class="login-page">
    <header class="auth-header">
      <button @click="$router.push('/')" class="back-btn">Back To Home</button>
    </header>

    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="form.email" placeholder="Email" required />
        <input type="password" v-model="form.password" placeholder="Password" required />
        <button type="submit" class="submit-btn">Login</button>
      </form>
      <p class="register-link">
        Don't have an account?
        <span @click="$router.push('/register')">Register</span>
      </p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "Login",
  data() {
    return {
      form: { email: "", password: "" },
      error: ""
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post("/users/login", this.form);
        localStorage.setItem("token", response.data.access);
        this.$router.push("/movies");
      } catch (err) {
        this.error = err.response?.data?.message || "Login failed";
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  background-color: #0b1426;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Oswald', 'Roboto', sans-serif;
  color: white;
  padding-top: 60px;
}

.auth-header .back-btn {
  position: absolute;
  top: 10px;
  left: 20px;
  padding: 8px 20px;
  font-size: 0.95rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.login-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container h2 {
  font-size: 2.4rem;
  margin-bottom: 25px;
}

.login-container form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.login-container input {
  margin-bottom: 15px;
  padding: 12px 15px;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  outline: none;
}

.submit-btn {
  padding: 12px;
  font-size: 1rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-btn:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(255,255,255,0.3);
}

.register-link {
  margin-top: 15px;
  font-size: 0.95rem;
}

.register-link span {
  color: #ffffff;
  text-decoration: underline;
  cursor: pointer;
}

.error-msg {
  color: #ff4d4d;
  margin-top: 10px;
  text-align: center;
}
</style>