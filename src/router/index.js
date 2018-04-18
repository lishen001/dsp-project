import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '../store/store'
Vue.use(VueRouter)
let router = new VueRouter({
  routes
})
const checkLoginStatus = () => {
  let tk = localStorage.getItem('token')
  if (tk) {
    store.commit('saveUser', localStorage.getItem('username'))
  }
  return !!tk
}
router.beforeEach((to, from, next) => {
  let isLogin = checkLoginStatus()
  // console.log(to)
  if (to.name === 'login') {
    next()
  } else {
    if (!isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  }
})

export default router
