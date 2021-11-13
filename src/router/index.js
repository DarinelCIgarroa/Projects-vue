import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/proyectos',
    name: 'Projects',
    // route level code-splitting
    // this generates a separate chunk (projects.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      requiresAuth: true
    },
    component: function () {
      return import(/* webpackChunkName: "projects" */ '../views/Projects/Projects.vue')
    }
  },
  {
    path: '/crear-proyectos',
    name: 'ProjectCreate',
    // route level code-splitting
    // this generates a separate chunk (created.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      requiresAuth: true
    },
    component: function () {
      return import(/* webpackChunkName: "created" */ '../views/Projects/Created.vue')
    }
  },
  {
    path: '/actualizar-proyectos/:id',
    name: 'UpdatedProject',
    // route level code-splitting
    // this generates a separate chunk (updated.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      requiresAuth: true
    },
    component: function () {
      return import(/* webpackChunkName: "updated" */ '../views/Projects/Update.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("user")) {
      next()
    } else {
      next({ name: "Login" })
    }
  } else {
    next()
  }
});

export default router
