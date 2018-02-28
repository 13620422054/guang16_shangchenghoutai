//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' //这是基于vue的一个路由插件

import Login from "../component/login/Login.vue"
// import Register from "../component/register/Register.vue"

//使用VueRouter插件
Vue.use(VueRouter)


import Admin from '../component/admin/Admin.vue'
import Shopcart from '../component/admin/shopcart/Shopcart.vue'

const shopcart = [
    { name: 'shopcart', path: 'shopcart', component: Shopcart },
];


//export default导出路由实例   new VueRouter创建路由实例
export default new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: "admin", path: '/admin', component: Admin, children: [...shopcart] }
    ]
})