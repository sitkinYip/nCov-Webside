import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: ()=> import('@/views/Home.vue'),
    children:[{
      path:'/china',
      name:'China',
      component: ()=> import('@/views/homchild/country.vue')
    },
    {
      path:'/province',
      name:'Province',
      component: ()=> import('@/views/homchild/province.vue')
    },
    {
      path:'/news',
      name:'News',
      component: ()=> import('@/views/homchild/news.vue')
    },{
      path:'/',
      name:'World',
      component: ()=> import('@/views/homchild/world.vue')
    },{
      path:'/other',
      name:'Other',
      component: ()=> import('@/views/homchild/other.vue')
    }],

  },
  {
    path:'*',
    redirect:{
      name:'World'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
