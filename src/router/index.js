import Vue from 'vue'
import Router from 'vue-router'
import People from '@/components/People'
import PeopleProfile from '@/components/PeopleProfile'
import Homeworld from '@/components/Homeworld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'people',
      component: People
    },
    {
      path: '/people/:url',
      name: 'peopleProfile',
      component: PeopleProfile
    },
    {
      path: '/homeworld/:url',
      name: 'homeworld',
      component: Homeworld
    }
  ]
})
