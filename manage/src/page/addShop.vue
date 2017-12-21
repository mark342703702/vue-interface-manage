<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="addMemberHeader">添加店铺</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form :model="addShopForm" :rules="addShopRules"  status-icon ref="ShopForm">
                    <el-form-item  prop="shop_name" label="店铺名称">
                        <el-input v-model="addShopForm.shop_name" placeholder="店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="submit_btn" @click="addShop('ShopForm')">添加店铺</el-button>
                    </el-form-item> 
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import {addShopData} from '@/api/shop'
export default {
    data () {
        return {
            addShopForm : {
                shop_name : ''
                
            },

            addShopRules : {
                shop_name:
                    [
			            { required: true, message: '请输入店铺名称', trigger: 'blur' },
			        ]
				}
        }
    },

    methods : {
        async addShop(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {

                    const params = {
                        shop_name : this.addShopForm.shop_name
                    }

                    let result = await addShopData(params)
                    
                    if(result.data.status === 0){
                        this.$message({
                            type : 'success',
                            message : result.data.message
                        })
                        this.$refs[formName].resetFields()
                    }else{
                        this.$message({
                            type : 'error',
                            message : result.data.message
                        })
                    }
                    
                } else {
                    this.$notify({
                        type : 'error',
                        message : '请输入完整信息',
                        duration : 1500,
                        showClose : false
                    })
                    return false;
                }
            });
        }
    }
}
</script>