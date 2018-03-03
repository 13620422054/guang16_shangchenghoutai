<template>
    <div class="list">
        
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            
        </el-breadcrumb>
        <!-- 按钮组,带搜索 -->
        <div class="btns">
             <el-button plain size="mini" class="el-icon-plus">新增</el-button>
             <el-button plain size="mini" class="el-icon-check" @click='all'>全选</el-button>
             <el-button plain size="mini" class="el-icon-delete" @click="del">删除</el-button>

             <div class="btns-search">
                 <el-input placeholder="请输入商品名称"  prefix-icon="el-icon-search" size="mini" v-model="apiQuery.searchvalue" @blur="search">

                 </el-input>
             </div>
        </div>
        <!-- 表格 -->
        <div class="bigTable">
            <template>
                <!-- selection-change="change : 当多选框被点击的时候触发 -->
                <el-table ref="multipleTable" :data="tableData3" style="width: 100%" @selection-change="change">
                    <!-- type为selection,即为多选框 -->
                    <el-table-column type="selection" width="55"></el-table-column>

                    <!-- label用来设置文本名 -->
                    <el-table-column label="标题" width="300">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
                                <router-link :to="{path:`/admin/goods/detail/${scope.row.id}`}">{{ scope.row.title }}</router-link>
                                <div slot="content">
                                    <img :src="scope.row.imgurl" alt="" style="width:200px">
                                </div>
                            </el-tooltip>
                            
                        </template>
                    </el-table-column>

                    <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>

                    <el-table-column prop="stock_quantity" label="库存"></el-table-column>

                    <el-table-column prop="market_price" label="市场价"></el-table-column>
                    
                    <el-table-column prop="sell_price" label="销售价"></el-table-column>

                    <el-table-column prop="address" label="属性">
                        <template slot-scope="scope">
                            <span :class="['el-icon-picture-outline',scope.row.is_slide==1? 'active' :'']"></span>
                            <span :class="['el-icon-star-off',scope.row.is_hop==1? 'active' :'']"></span>
                            <span :class="['el-icon-upload2',scope.row.is_top==1? 'active' :'']"></span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="120" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <router-link style="color: #666;" :to="{path:`/admin/goods/detail/${scope.row.id}`}">修改</router-link>
                        </template>
                    </el-table-column>
                </el-table>
  
            </template>
        </div>

        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="apiQuery.pageIndex"
        :page-sizes="[2, 4, 6, 8]" :page-size="apiQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="apiQuery.total">
    </el-pagination>
    </div>
</template>

<script>
    export default {
    data() {
      return {
        //搜索功能
        apiQuery:{
            pageIndex: 1,
            pageSize: 10,
            searchvalue: '',
            total : ""
        },
        // 当多选框被点击的时候用数组把数据存储起来
        selectedGoodsList: [],
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
        //鼠标离开搜索框时触发
        search(){
            this.getGoodsData();
        },


        handleSizeChange(){

        },
        handleCurrentChange(){
            
        },

        // 监听多选框变化状态,selection参数可以拿到被点击的数据
        change(selection){
            this.selectedGoodsList = selection
        },

        del(){
            //提取
            let delIDS= this.selectedGoodsList.map(v=> v.id);
            this.$http.get(this.$api.gsDel + delIDS).then((res)=>{
                if(res.data.status==0){
                    this.getGoodsData();
                }
            })
        },
        all(){
            document.querySelector('.el-checkbox__original').click();
        },

        // 获取商品详情数据
        getGoodsData() {

            //用api把接口存储起来
            let api = `${this.$api.gsList}?pageIndex=${this.apiQuery.pageIndex}&pageSize=${this.apiQuery.pageSize}&searchvalue=${this.apiQuery.searchvalue}`
            this.$http.get (api).then((res)=>{
                // console.log(res);
                if(res.data.status==0){

                    //把请求回来的数据覆盖原来tableData3的数据,表格会自动刷新
                    this.tableData3=res.data.message;
                }
            })
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    created () {
        this.getGoodsData();
    }
  }
</script>

<style scoped lang= "less">
    .list{
        .btns{
            margin-top: 20px;
            margin-bottom: 20px;
            .btns-search{
                width: 300px;
                float: right;
            }
        }
        [class^=el-icon].active{
            color: #000;
            font-weight: 800;
        }
    }
</style>