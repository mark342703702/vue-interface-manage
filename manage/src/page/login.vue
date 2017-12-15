<template>
    <div class="login_page">
	  		<section class="form_contianer">
		  		<div class="manage_tip">
		  			<p>接口管理系统</p>
            <el-form :model="loginForm" :rules="rules"  status-icon ref="loginForm">
              <el-form-item  prop="QQ">
                 <el-input v-model="loginForm.QQ" placeholder="QQ"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                 <el-input v-model="loginForm.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-button type="success" class="submit_btn"  @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
		  		</div>
	  		</section>
  	</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm : {
        QQ : '',
        password : ''
      },
      rules: {
					QQ: [
			            { required: true, message: '请输入QQ', trigger: 'blur' },
			        ],
					password: [
						      { required: true, message: '请输入密码', trigger: 'blur' }
					],
				}
    }
  },
  methods : {
    async submitForm (formName){
      this.$refs[formName].validate( async (valid) => {
        if(valid){
            let result = await axios.post('/admin/login',{
                  QQ : this.loginForm.QQ,
                  password : this.loginForm.password
            })
        }else{
          //失败,返回错误信息
          console.log('error')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped type="text/css">
  .form_contianer{
    width: 320px;
    height: 240px;
    padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff; 
    margin: 0 auto;
  
     .submit_btn{
			width: 100%;
			font-size: 16px;
    }
    
    p{
      font-size: 30px;
      color : #324057;
      margin-bottom: 20px;
    }

  }

  .login_page{
    background-color: #324057;
    width: 100%;
    min-height: 800px;
    padding-top: 200px;
  }
</style>
