<template>
  <div class="fillcontain">
    <div class="table_container">
        <el-table :data="tableData" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="余额">
                        <span>{{ props.row.account }}</span>
                    </el-form-item>
                    <el-form-item label="电话">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item label="积分 ID">
                        <span>{{ props.row.points }}</span>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="memberId" label="会员id"></el-table-column>
            <el-table-column prop="member_name" label="会员姓名"></el-table-column>
        </el-table>
    </div>
  </div>
</template>
<script>
import {getAllMemberData} from '@/api/member'
export default {
    data (){
        return {
            tableData : []
        }
    },

    created(){
        this.initData()
    },

    methods : {
        async initData(){
            try{
                const memberResult = await getAllMemberData()
                if(memberResult.data.status === 0){
                    this.tableData = memberResult.data.result
                }else{
                    throw new Error('获取数据失败')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">

</style>
