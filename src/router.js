import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Movies from './pages/Movies.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
import MovieDetail from './pages/MovieDetail.vue'

const routes = [
  { path: "/", name: "Home", component: Home},
  { path: "/movies", name: "Movies", component: Movies},
  { path: "/register", name: "Register", component: Register},
  { path: "/login", name: "Login", component: Login},
  { path: "/movies/movie/:id", name: "MovieDetail", component: MovieDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;