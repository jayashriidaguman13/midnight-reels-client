<template>
  <div class="home-page">
    <header class="navbar">
      <div class="navbar-buttons">
        <button class="nav-btn" v-if="!isLoggedIn" @click="$router.push('/login')">Login</button>
        <button class="nav-btn"  v-if="!isLoggedIn" @click="$router.push('/register')">Register</button>
        <button class="nav-btn"  v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </header>

    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <img src="/images/logo.png" alt="Midnight Reels Logo" class="logo" />
        <h1>Midnight Reels</h1>
        <p>
          Where stories come alive after dark. Discover, explore, and dive into cinematic legends.
        </p>
        <button @click="$router.push('/movies')" class="view-btn">View Movies</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem("token");
      this.isLoggedIn = !!token;
    },
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto:wght@300;400&display=swap');

.navbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 0 30px;
  z-index: 5;
}

.navbar-buttons .nav-btn {
  margin-left: 10px;
  padding: 8px 20px;
  font-size: 0.95rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: 2px solid #0b1426;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 5px;
  margin-top: -1px;
}

.home-page {
  background-color: #0b1426;
  color: white;
  font-family: 'Oswald', 'Roboto', sans-serif;
  background-image: url("/images/bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.logo {
  width: 250px;
  margin-bottom: 20px;
}

.hero h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 5rem;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-shadow: 15px 10px 2px rgba(0, 0, 0, 0.9);
  -webkit-text-stroke: 1.5px #000000;
}

.hero p {
  font-family: 'Roboto', sans-serif;
  max-width: 600px;
  font-size: 1.5rem;
  opacity: 0.9;
  text-shadow: 15px 5px 2px rgba(0, 0, 0, 0.9);
  -webkit-text-stroke:0.5px #ffffff;
}

.view-btn {
  margin-top: 15px;
  padding: 12px 35px;
  font-size: 1rem;
  background: white;
  color: #0b1426;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.4rem; }
  .hero p { font-size: 1rem; }
  .logo { width: 180px; }
}

@media (max-width: 480px) {
  .hero h1 { font-size: 2rem; }
  .hero p { font-size: 0.95rem; }
  .logo { width: 150px; }
  .navbar { padding: 0 15px; }
  .navbar-buttons .nav-btn { padding: 6px 15px; font-size: 0.85rem; }
}
</style>