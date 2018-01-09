<template>
    <div class="login_page">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8">
            <section class="form_contianer">
              <div class="manage_tip">
                <p>接口管理系统</p>
                <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
                  <el-form-item  prop="QQ">
                    <el-input v-model="loginForm.QQ" placeholder="QQ"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="shop">
                    <el-select v-model="loginForm.shop" placeholder="请选择店铺" value-key="shopId" class="select">
                      <el-option
                      v-for="item in ShopOptions"
                      :key="item.shopId"
                      :label="item.shop_name"
                      :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" class="submit_btn"  @click="submitForm('loginForm')">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
	  		    </section>
          </el-col>
        </el-row>
  	</div>
</template>

<script>
import axios from 'axios'
import { getShopData } from '@/api/shop'
import { mapState, mapMutations } from 'Vuex'
 
export default {
  data () {
    return {
      loginForm : {
        QQ : '',
        password : '',
        shop : ''
      },

      //店铺数据
      ShopOptions : [],

      rules: {
          QQ:
              [
			            { required: true, message: '请输入QQ', trigger: 'blur' },
			        ],
          password: 
              [
						      { required: true, message: '请输入密码', trigger: 'blur' }
              ],
          shop : 
              [
                  { required: true, message: '请选择店铺', trigger: 'blur' }
              ]
				}
    }
  },

  created(){
        this.initData()
  },

  computed : {
      ...mapState(['current_shop'])
  },
  
  methods : {

    ...mapMutations(['setCurrentShop']),

    async submitForm (formName){
      this.$refs[formName].validate( async (valid) => {
        if(valid){
            let result = await axios.post('/admin/login',{
                  QQ : this.loginForm.QQ,
                  password : this.loginForm.password
            })
            if(result.data.status == 0){
               //登录成功操作
              this.$message({
                 type : 'success',
                 message : result.data.message
               })
               this.setCurrentShop(this.loginForm.shop)
               this.$router.push('manage')
            }else{
              this.$message({
                type : 'error',
                message : result.data.message
              })
            }
        }else{
          //失败,返回错误信息
          this.$notify({
            type : 'error',
            message : '请输入所有信息',
            duration : 1500,
            showClose : false
          })
          return false
        }
      })
    },

    async initData(){
      try{
            let fields = {shopId : 1, shop_name : 1, _id : 0}
            let shopResult = await getShopData({},fields)
              if(shopResult.data.status === 0){
                  this.ShopOptions = shopResult.data.result
              }else{
                  throw new Error('获取店铺数据失败')
              }

          }catch(err){
            this.$message({
                type : 'error',
                message : '获取店铺数据失败'
            })
          }
     }

  }
}
</script>

<style lang="scss" scoped type="text/css">
  .form_contianer{

    padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff; 
    
  
     .submit_btn{
			width: 100%;
			font-size: 16px;
    }

    .select{
      width: 100%;
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
    height: 100%;
    min-height: 800px;
    padding-top: 200px;
  }

</style>
