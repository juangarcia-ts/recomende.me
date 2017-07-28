import Vue from 'vue'
import Router from 'vue-router'
import Discover from '@/components/Discover'
import Shuffle from '@/components/Shuffle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Shuffle
    },
    {
      path: '/filmes',
      name: 'Filmes - Home',
      component: Shuffle
    },
    {
      path: '/filmes/aleatorio',
      name: 'Filmes - Aleatório',
      component: Shuffle
    },
    {
      path: '/filmes/descoberta',
      name: 'Descoberta',
      component: Discover
    }
  ]
})
