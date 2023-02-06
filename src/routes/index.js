import { createRouter, createWebHashHistory } from "vue-router"
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './Notfound'

export default createRouter({
  // Hash or History
  // Hash: https://google.com/#/search
  history: createWebHashHistory(),
  // pages
  // https://google.com/
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:pathMatch(.*)', // 슬래시로 시작하는 모든 문자
      component: NotFound
    }
  ]
})