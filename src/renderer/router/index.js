import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: require('@/page/welcome').default
    },
    {
      path: '/second',
      name: 'second',
      component: require('@/page/second').default
    },
    {
      path: '/jsonfile',
      name: 'jsonfile',
      component: require('@/page/jsonfile').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
