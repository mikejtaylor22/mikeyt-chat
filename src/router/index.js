import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'
import Technology from '@/components/Technology'
import Entertainment from '@/components/Entertainment'
import Nightlife from '@/components/Nightlife'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
       if(to.params.name){
         next()
       }else {
         next({name: 'Welcome'})
       }
      }
    },
    {
      path: '/technology',
      name: 'Technology',
      component: Technology,
      props: true
    },
    {
      path: '/entertainment',
      name: 'Entertainment',
      component: Entertainment,
      props: true
    },
    {
      path: '/nightlife',
      name: 'Nightlife',
      component: Nightlife,
      props: true
    },
  ]
})
