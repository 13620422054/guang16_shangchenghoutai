//路由配置
import Vue from 'vue'
import VueRouter from 'vue-router' //这是基于vue的一个路由插件

import Login from "../component/login/Login.vue"
// import Register from "../component/register/Register.vue"

//使用VueRouter插件
Vue.use(VueRouter)


import Admin from '../component/admin/Admin.vue'
import goodsList from '../component/admin/goods/list/List.vue'
import Deail from '../component/admin/goods/detail/Detail.vue'
import CommentList from '../component/admin/goods/comment/Comment.vue'


// admin的子路由=> 商品管理模块相关页面
const goods = [
    { name: 'goodsList', path: 'goods/list', component: goodsList },
    { name: 'goodsDetail', path: 'goods/detail/:id', component: Deail },
    { name: 'goodsDetail', path: 'goods/comment', component: CommentList }
];


//export default导出路由实例   new VueRouter创建路由实例
export default new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: "admin", path: '/admin', component: Admin, children: [...goods] }
    ]
})