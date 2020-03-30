// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faCheck, faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faCheck, faPlus, faTrashAlt, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '/add',
    component: Add,
    name: 'add',
    meta: {
      title: 'Добавить список'
    }
  },
  {
    path: '/edit/:id',
    component: Edit,
    name: 'edit',
    meta: {
      title: 'Редактировать список'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
