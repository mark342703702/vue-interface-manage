<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="addMemberHeader">添加职员</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form :model="addGirlForm" :rules="addGirlRules"  status-icon ref="GirlForm">
                    <el-form-item  prop="girl_name" label="职员姓名">
                        <el-input v-model="addGirlForm.girl_name" placeholder="职员姓名"></el-input>
                    </el-form-item>
                    <el-form-item  prop="phone" label="职员电话">
                        <el-input v-model="addGirlForm.phone" placeholder="职员电话"></el-input>
                    </el-form-item>
                    <el-form-item  prop="girlId" label="职员工号">
                        <el-input v-model="addGirlForm.girlId" placeholder="职员工号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属店铺">
                        <el-select v-model="addGirlForm.shop" placeholder="请选择店铺" value-key="shopId">
                            <el-option
                            v-for="item in ShopOptions"
                            :key="item.shopId"
                            :label="item.shop_name"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="submit_btn" @click="addMember('GirlForm')">添加职员</el-button>
                    </el-form-item> 
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import {addGirlData} from '@/api/admin'
import {getShopData} from '@/api/shop'
export default {
    data () {
        return {
            addGirlForm : {
                girl_name : '',
                phone : '',
                shop : '',
                girlId : ''
            },

            ShopOptions: [],

            addGirlRules : {
                girl_name:
                    [
			            { required: true, message: '请输入职员姓名', trigger: 'blur' },
			        ],
                phone: 
                    [
						{ required: true, message: '请输入职员电话', trigger: 'blur' }
                    ],
                girlId : 
                    [
                        { required: true, message: '请输入职员工号', trigger: 'blur' }
                    ]
                },
        }
    },

    created(){
        this.initData()
    },

    methods : {
        async addMember(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    const params = {
                        girl_name : this.addGirlForm.girl_name,
                        phone : this.addGirlForm.phone,
                        shop : this.addGirlForm.shop,
                        girlId : this.addGirlForm.girlId
                    }
                    
                    let result = await addGirlData(params)
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
        },

        async initData(){
            try{
                let fields = {
                    shopId : 1,
                    shop_name : 1,
                    _id : 0
                }
                let shopResult = await getShopData({},fields)
                if(shopResult.data.status === 0){
                    this.ShopOptions = shopResult.data.result
                }else{
                    throw new Error('获取店铺数据失败')
                }

            }catch(err){
                 this.$message({
                    type : 'error',
                    message : '获取数据失败'
                })
            }
        }
    }
}
</script>

<style lang="scss" type="text/css">
   
</style>
