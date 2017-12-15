<template>
    <div class="login_page">
	  		<section class="form_contianer">
		  		<div class="manage_tip">
		  			<p>接口管理系统</p>
            <el-form :model="loginForm" :rules="rules"  status-icon ref="loginForm">
              <el-form-item  prop="username">
                 <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
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
export default {
  data () {
    return {
      loginForm : {
        username : '',
        password : ''
      },
      rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				}
    }
  },
  methods : {
    submitForm (formName){
      this.$refs[formName].validate( (valid) => {
        if(valid){
          //发送请求,登录
          alert('submit')
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
