<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="addMemberHeader">添加会员</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form :model="addMemberForm" :rules="addMemberRules"  status-icon ref="MemberForm">
                    <el-form-item  prop="member_name" label="会员姓名">
                        <el-input v-model="addMemberForm.member_name" placeholder="会员姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="会员电话">
                        <el-input v-model="addMemberForm.phone" placeholder="会员电话"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="submit_btn" @click="addMember('MemberForm')">添加会员</el-button>
                    </el-form-item> 
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import {addMemberData} from '@/api/member'
export default {
    data () {
        return {
            addMemberForm : {
                member_name : '',
                phone : '',
            },

            addMemberRules : {
                member_name:
                    [
			            { required: true, message: '请输入会员姓名', trigger: 'blur' },
			        ],
                phone: 
                    [
						{ required: true, message: '请输入会员电话', trigger: 'blur' }
					]
				}
        }
    },

    methods : {
        async addMember(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    const params = {
                        member_name : this.addMemberForm.member_name,
                        phone : this.addMemberForm.phone
                    }
                    let result = await addMemberData(params)
                    console.log(result)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
    .form_container{
        padding: 20px;

        .addMemberHeader{
            height: 30px;
            color:#cf4646;
            font-size: 18px;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .submit_btn{
            width: 100%;
        }
    }
</style>
