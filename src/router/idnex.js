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
let router = new VueRouter({
    routes: [
        { name: 'login', path: '/login', component: Login },
        { name: "admin", path: '/admin', component: Admin, children: [...goods] }
    ]
})
router.beforeEach((to, from, next) => {
    // 现在是js文件,不是组件,不能直接使用this.$http.
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then((res) => {
        // 让登录状态默认为未登录
        let islogin = false;

        if (res.data.code == "logined") {
            islogin = true;
        }
        // 如果是访问登录页面
        if (to.name == 'login') {
            // 判断是否登录
            //如果登录了.自动跳转到后面页面
            if (islogin) {
                next({ name: 'admin' })
            } else {
                // 未登录,允许访问
                next();
            }
        }

        //如果访问登录页面以外的后台页面
        if (to.name != 'login') {
            //判断是否访问
            if (!islogin) {
                //如果未登录
                next({ name: 'login' })
            } else {
                next();
            }
        }
    })
});
export default router;