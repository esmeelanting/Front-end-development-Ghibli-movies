import { createRouter, createWebHashHistory } from 'vue-router'
import Movies from '../components/Movies.vue'
import Landingspage from '../components/Landingspage.vue'
import MovieDates from '../components/MovieDates.vue'

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: Landingspage
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies
  },
  {
    path: '/dates',
    name: 'dates',
    component: MovieDates
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
