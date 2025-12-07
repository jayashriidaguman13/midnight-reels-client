import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Movies from './pages/Movies.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;