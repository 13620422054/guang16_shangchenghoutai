<template>
    <div class='login'>
        <div class="box">
            <el-form :model="ruleForm2" :rules="rules2" status-icon ref="abc" label-width="100px" class="demo-ruleForm">
 
                 <!-- label用来设置表单提示文字, prop用来指定当前表单代表的字段名(可省略, 但是如果需要表单校验与重置功能, 必须写) -->
                <el-form-item label="账号" prop="uname">
                     <!-- v-model双向数据绑定, 需要绑定data里的数据, 将来要把这些数据提交给后端 -->
                     <el-input type="text" v-model="ruleForm2.uname" auto-complete="off"></el-input>
                 </el-form-item>
 
                 <el-form-item label="密码" prop="upwd">
                     <el-input type="password" v-model="ruleForm2.upwd" auto-complete="off"></el-input>
                 </el-form-item>
 
                 <el-form-item>
                     <el-button type="primary" @click="submitForm('abc')">登陆</el-button>
                     <el-button @click="resetForm('abc')">重置</el-button>
                 </el-form-item>
 
             </el-form>
        </div>
    </div>
</template>

<script>
   export default {
    data() {
      
      
      
      return {
        ruleForm2: {
          uname: '',
          upwd: ''
          
        },
        rules2: {
          uname: [
           { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          upwd: [
            { required: true, message: "请输入密码", trigger: "blur" }
          ]
          
        }
      };
    },
    methods: {
        login(){
            this.$http.post(this.$api.login,this.ruleForm2).then((res)=>{
                
              if(res.data.status==0){
                //   this.$alert(res.data.message)
                //保存用户名
                localStorage.setItem('uname',res.data.message.uname);
                // 跳转到后台页面
                // this.$router.push({name:'admin'});
                let nextPage= this.$router.query.next || 'admin';
                this.$router.push({path:nextPage})
              }else{
                   this.$alert(res.data.message)
              }
            })
        },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
             this.$alert("账号或密码不合格!");
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">

    .login{
        height: 100%;
        background-color: skyblue;
        .box {
            width : 500px;
            height: 500px;
            margin: 0 auto;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            border: 3px solid #fff;
            border-radius: 5px;
        }
    }
</style>