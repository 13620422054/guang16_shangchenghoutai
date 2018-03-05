<template>
    <div class="detail">
         <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goodsList' }">商品列表</el-breadcrumb-item>            
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>            
        </el-breadcrumb>

        <!-- 表单 -->
        <el-form ref="form" :model="form" label-width="80px" class="detail_form" label-position="left">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择">
                <el-option :label="item.title" :value="item.category_id" v-for="item in category" :key="item.category_id" ></el-option>
                <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            
            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hop" active-text="推荐"></el-switch>
            </el-form-item>

            <el-form-item label="上传封面">
                <!-- <el-input v-model="form.a">form.imgList</el-input> -->
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="uploadImg"> 
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile" :file-list="form.fileList"  :on-success="uploadFile"> 
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>

            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>
            
            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>

            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>

            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="详细内容">
                <!-- <el-input v-html="form.content"></el-input> -->
                <quill-editor v-model="form.content"></quill-editor>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 表单数据
                form: {},
                // 页面一上来要从url里面拿到被编辑的商品ID
                id: this.$route.params.id,
                category: []
            }
        },
        methods: {
            getGoods(){
                this.$http.get(this.$api.gsDetail+this.id).then((res)=>{
                    if(res.data.status==0){
                        this.form= res.data.message;

                        //为了让分类列表正确显示.  把商品category_id的数据改为num类型
                        this.form.category_id = +this.form.category_id;

                    }
                })
            },
            getCategory(){
                this.$http.get(this.$api.ctList + 'goods').then((res)=>{
                    if(res.data.status==0){
                        this.category = res.data.message;
                    }
                })
            },

            //上传图片
            uploadImg(data){
                console.log(data);
                this.form.imgList =[data];

            },

            // 上传附件
            uploadFile(data){
                this.form.fileList.push(data);
                // console.log(123);
            },
            onSubmit() {
                this.$http.post(this.$api.gsEdit+this.id,this.form).then(res=>{
                    if(res.data.status==0){
                        this.$alert("数据修改成功")
                    }
                })
            } 
        },  
        created () {
            this.getGoods();
            this.getCategory(); 
        }
    }
</script>

<style scoped lang="less">
    .detail{
        &_form{
            margin-top: 20px;
            width: 700px;
        }
    }
</style>