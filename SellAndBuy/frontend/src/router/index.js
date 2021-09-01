import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import register from '@/components/register'
import login from '@/components/login'
import categories from '@/components/categories'
import products from '@/components/products'
import product_details from '@/components/product_details'
import cart from '@/components/cart'
import sell from '@/components/sell'
import myorders from '@/components/myorders'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/categories',
      name: 'categories',
      component: categories
    },
    {
      path: '/products',
      name: 'products',
      component: products
    },
    {
      path: '/product_details',
      name: 'product_details',
      component: product_details
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    
    {
      path: '/sell',
      name: 'sell',
      component: sell
    },
    {
      path: '/myorders',
      name: 'myorders',
      component: myorders
    },
  ]
})
