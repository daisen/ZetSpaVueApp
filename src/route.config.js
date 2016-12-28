import VueRouter from 'vue-router'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import User from './components/office_user/User.vue'
import Office from './components/office_user/Office.vue'
import Area from './components/office_user/Area.vue'
import Role from './components/system/Role.vue'
import Menu from './components/system/Menu.vue'
import echarts from './components/logs/echarts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  {
    path: '/',
    component: Home,
    name: '机构用户',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      //{ path: '/main', component: Main },
      { path: '/user', component: User, name: '用户管理' },
      { path: '/office', component: Office, name: '机构管理' },
      { path: '/area', component: Area, name: '区域管理' },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '系统设置',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/menu', component: Menu, name: '菜单管理' },
      { path: '/role', component: Role, name: '角色管理' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '日志查询',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/log', component: echarts, name: '系统日志' }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

export default router