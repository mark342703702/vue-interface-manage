<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="Header">添加管理员</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form :model="addAdminForm" :rules="addAdminRules"  status-icon ref="AdminForm">
                    <el-form-item  prop="admin_name" label="管理员姓名">
                        <el-input v-model="addAdminForm.admin_name" placeholder="管理员姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="管理员密码">
                        <el-input v-model="addAdminForm.password" placeholder="管理员密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="QQ" label="QQ">
                        <el-input v-model="addAdminForm.QQ" placeholder="QQ"></el-input>
                    </el-form-item>   
                    <el-form-item>
                        <el-button type="success" class="submit_btn" @click="addAdmin('AdminForm')">添加管理员</el-button>
                    </el-form-item> 
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import {addAdminData} from '@/api/admin'
export default {
    data () {
        return {
            addAdminForm : {
                admin_name : '',
                password : '',
                QQ : ''
            },

            addAdminRules : {
                admin_name:
                    [
			            { required: true, message: '请输入管理员姓名', trigger: 'blur' },
			        ],
                password: 
                    [
						{ required: true, message: '请输入管理员密码', trigger: 'blur' }
                    ],
                QQ :
                    [
                         {required: true, message: '请输入管理员QQ', trigger: 'blur'}
                    ]
				}
        }
    },

    methods : {
        async addAdmin(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    const params = {
                        admin_name : this.addAdminForm.admin_name,
                        password : this.addAdminForm.password,
                        QQ : this.addAdminForm.QQ
                    }
                    let result = await addAdminData(params)
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

<style lang="scss" type="text/css">
    @import '../../style/common';
</style>
