// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })


import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';

import CustomerCheckout from '@/components/pages/CustomerCheckout';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [{
      path: '*',
      redirect: 'login',
    },
    // {
    //     path: '/',
    //     name: 'HelloWorld',
    //     component: HelloWorld,
    //     // a meta field
    //     meta: { requiresAuth: true }
    // },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/admin',
      name: 'DashboardAdmin',
      component: Dashboard,
      // a meta field

      children: [{
          path: 'products',
          name: 'Products',
          component: Products,
          meta: {
            requiresAuth: true
          },
        },

        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: {
            requiresAuth: true
          },
        }, {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {
            requiresAuth: true
          },
        },
      ],
    },

    {
      path: '/',
      name: 'DashboardCustomer',
      component: Dashboard,
      children: [{
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    },

  ],
});