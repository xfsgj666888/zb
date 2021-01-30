import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../components/Home'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: () => import('../components/content/AppIndex'), 
          children: [
            {
              path: "/index/content",
              name: "Content",
              component: () => import("../components/content/discontent/Content",)
            },
          ]
        },
      ]
    }
  ]
})
