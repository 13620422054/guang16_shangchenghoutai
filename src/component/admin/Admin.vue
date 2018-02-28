<template>
    <div>
        <app-header></app-header>
        <app-aside></app-aside>
        <router-view></router-view>
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

<style scoped>

</style>