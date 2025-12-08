<template>
  <div class="register-page">
    <header class="auth-header">
      <button @click="$router.push('/')" class="back-btn">Back To Home</button>
    </header>

    <div class="register-container">
      <h2>Create Account</h2>
      <form @submit.prevent="registerUser">
        <input
          type="text"
          v-model="form.username"
          placeholder="Username"
          required
        />
        <input
          type="email"
          v-model="form.email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          v-model="form.password"
          placeholder="Password"
          required
        />
        <button type="submit" class="submit-btn">Register</button>
      </form>
      <p class="login-link">
        Already have an account?
        <span @click="$router.push('/login')">Login</span>
      </p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import api from "../api.js";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
      },
      error: ""
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await api.post("/users/register", this.form);
        localStorage.setItem("token", response.data.token);
        this.$router.push("/login");
      } catch (err) {
        this.error = err.response?.data?.message || "Registration failed";
      }
    }
  }
};
</script>

<style scoped>
.register-page {
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

.register-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-container h2 {
  font-size: 2.4rem;
  margin-bottom: 25px;
}

.register-container form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.register-container input {
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

.login-link {
  margin-top: 15px;
  font-size: 0.95rem;
}

.login-link span {
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