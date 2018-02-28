<template>
    <!-- <div>
        <app-header></app-header>
        <app-aside></app-aside>
        <router-view></router-view>
    </div> -->
    <div class="admin">
        <el-container>
            <el-header>
                <!-- 公共头部 -->
                <app-header></app-header>
            </el-header>
                <!-- 公共左侧 -->
            <el-container class="admin-container">
                <el-aside width="200px">
                    <app-aside></app-aside>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from "./subcom/Header.vue"
    import Aside from "./subcom/Aside.vue"
    export default {

        //创建子组件
        components: {
            appHeader : Header,
            appAside : Aside
        }
    }
</script>
    
<style scoped lang='less'>
    .admin {
        height: 100%;
        color : #333;
         .el-header {
            line-height: 60px;
        }
        .el-container{
            height: 100%;
        }
    
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            line-height: 200px;
        }
        
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            line-height: 160px;
        }
    }
</style>