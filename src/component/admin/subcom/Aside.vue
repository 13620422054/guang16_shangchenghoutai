<template>
    <div class="aside">
       <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff">
      <el-submenu v-for="(item,index) in menu" :key="index" :index= "item.title">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item index="1-1" v-for="(subitem, subindex) in item.children" :key="subindex" >
            <router-link :to='subitem.path'>{{subitem.title}}</router-link>
          </el-menu-item>
      </el-submenu>
      
      
    </el-menu>
    </div>
</template>

<script>
    export default {
         data(){
           return{
             menu:[
               {
                 title :"商品管理",
                 children :[
                   {title :"内容管理", path: "/admin/goods/list"},
                   {title :"类别管理", path: "/admin/goods/detail/:id"},
                   {title :"评论管理", path: "/admin/goods/comment"}
                 ]
               }
             ]
           }
         }
    }
</script>

<style scoped lang="less">
    
</style>