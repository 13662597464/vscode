import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Main',
      component: () => import('@/../views/Main.vue'),
      children: [{
          path: '/',
          name: 'Home',
          component: () => import('@/../views/Home'),
        },
        // {
        //   path: '/Work/WorkManage',
        //   name: 'UserManage',
        //   component: () => import('@/../views/Work/WorkManage'),
        // },
        // {
        //   path: '/Work/Todo',
        //   name: 'Todo',
        //   component: () => import('@/../views/Work/Todo'),
        // },
        // {
        //   path: '/SysSet/UserManage',
        //   name: 'UserManage',
        //   component: () => import('@/../views/SysSet/UserManage'),
        // }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/../views/Login')
    }
  ]
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}